const InvoiceModel = require("../models/InvoiceModel");

const updateInvoiceStatus = async (req, res) => {
  const {invoiceId} = req.params;

  try {
    const invoice = await InvoiceModel.findById(invoiceId);

    if (!invoice) return res.status(404).json({ message: "Invoice Not found" });

    if (invoice.status == "Paid")
      return res.status(400).json({ message: "Invoice already paid" });

    invoice.status = "Paid";
    await invoice.save();

    return res.status(200).json({ message: "Invoice updated Sucessfully" });
  } catch (error) {
    console.error("Error updating invoice:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateInvoiceStatus;
