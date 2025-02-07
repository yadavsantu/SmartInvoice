const mongoose = require("mongoose");
const invoiceModel = require("./../models/InvoiceModel");

const insertInvoice = async (req, res) => {
  try {
    console.log("Inside Insert Invoice", req.body);
    const newInvoice = new invoiceModel(req.body);
    const saveInvoice = await newInvoice.save();

    return res.status(200).json({ message: "Invoice Saved in Database " });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Error Saving Invoice to database " });
  }
};

module.exports = insertInvoice;
