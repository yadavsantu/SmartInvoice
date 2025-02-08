const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const invoiceModel = require("./../models/InvoiceModel");
const userModel = require("./../models/usermodels");

const insertInvoice = async (req, res) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.status(400).json({ error: "Please Login First" });
  }



  try {
    const token = accessToken.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET);

    const foundUser = await userModel.findOne({ email: user.email });

    if (!foundUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const newInvoice = new invoiceModel({...req.body , userId: foundUser._id });
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
