require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const invoiceModel = require("./../models/InvoiceModel");
const userModel = require("./../models/usermodels");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const sendInvoiceEmail = async (toEmail, filePath) => {
  if (!toEmail) {
    throw new Error("Recipient email is missing");
  }

  console.log("Sending email to:", toEmail); // Debugging log

  const transporter = nodemailer.createTransport({
    host: process.env.emailHost,
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.emailUser,
      pass: process.env.emailPassword,
    },
  });

  const mailOptions = {
    from: process.env.emailUser,
    to: toEmail, // Ensure this is not undefined
    subject: "Your Invoice",
    text: "Please find your invoice attached.",
    attachments: [{ filename: "invoice.pdf", path: filePath }],
  };

  return transporter.sendMail(mailOptions);
};

const insertInvoice = async (req, res) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.status(400).json({ error: "Please Login First" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const token = accessToken.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET);
    const foundUser = await userModel.findOne({ email: user.email });

    if (!foundUser) {
      throw new Error("User not found");
    }

    if (!req.file) {
      throw new Error("Invoice PDF is required");
    }

    const pdfPath = path.join("uploads", req.file.filename);

    const clientEmail = req.body.email; // Fetch client email
    if (!clientEmail) {
      throw new Error("Client email is required");
    }

    const newInvoice = new invoiceModel({
      ...req.body,
      userId: foundUser._id,
      pdf: pdfPath,
    });

    const savedInvoice = await newInvoice.save({ session });

    await sendInvoiceEmail(clientEmail, pdfPath);

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: "Invoice Saved and Sent Successfully", filePath: pdfPath });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    
    console.error(error);
    return res.status(400).json({ message: "Error Processing Invoice", error: error.message });
  }
};

module.exports = insertInvoice;
