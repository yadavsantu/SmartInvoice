const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const Invoice = require("../models/InvoiceModel");

const downloadInvoice = async (req, res) => {
  console.log('hello');
  try {
   
    const { invoiceId } = req.params; 
    console.log("Fetching invoice with ID:", invoiceId);

    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      console.error("Invoice not found:", invoiceId);
      return res.status(404).json({ message: "Invoice not found" });
    }

    const filePath = path.resolve(__dirname, "..", invoice.pdf);
    console.log("Computed file path:", filePath);

    if (!fs.existsSync(filePath)) {
      console.error("File not found at path:", filePath);
      return res.status(404).json({ message: "File not found" });
    }

    res.download(filePath, `invoice-${invoice.invoiceNumber}.pdf`, (err) => {
      if (err) {
        console.error("Error during download:", err);
        res.status(500).json({ message: "Error downloading file" });
      }
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = downloadInvoice;
