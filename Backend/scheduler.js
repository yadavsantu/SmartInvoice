const schedule = require("node-schedule");
const InvoiceModel = require("./models/InvoiceModel");

async function updateInvoices() {
  try {
    const invoices = await InvoiceModel.find({
      dueDate: { $lte: new Date() },
      status: "Unpaid",
    });

    await Promise.all(
      invoices.map((invoice) => {
        invoice.status = "Overdue";
        return invoice.save();
      })
    );
  } catch (error) {
    console.error("Error Updating invoices", error);
  }
}

updateInvoices();

schedule.scheduleJob("0 0 * * *",updateInvoices);
