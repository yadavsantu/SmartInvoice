const nodemailer = require("nodemailer");
require("dotenv").config();
const sendMail = async (email,otp) => {
  try {
    
    if (!email || !otp) {
      return res.status(400).json({ message: "Email or OTP is missing" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.emailHost,
      port: 587,
      auth: {
        user: process.env.emailUser,
        pass: process.env.emailPassword,
      },
    });
    const mailOptions = {
      from: '"Smart Invoice - Sandesh Prasai" <no-reply@smartinvoice.com>',
      to: email,
      subject: "Please Verify Your Email",
      text: `Your OTP is ${otp}`,
    };

    const response  = await transporter.sendMail(mailOptions);
    console.log(response);
  } catch (error) {
    console.error("Error Sending Mail:", error);
    throw new error("Failled to send Mail")
  }
};

module.exports = sendMail;
