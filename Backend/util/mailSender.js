const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (email, otp) => {
  try {
    if (!email || !otp) {
      throw new Error("Email or OTP is missing");
    }

    const transporter = nodemailer.createTransport({
      host: process.env.emailHost,
      port: 587,
      auth: {
        user: process.env.emailUser,
        pass: process.env.emailPassword,
      },
      connectionTimeout: 5000,
    });

    const mailOptions = {
      from: '"Smart Invoice - Sandesh Prasai" <no-reply@smartinvoice.com>',
      to: email,
      subject: "Please Verify Your Email",
      text: "If you have not registered for our services, please ignore this mail.",
      html: `<p>If you have not registered for our services, please ignore this mail.</p><p>Your OTP is <strong>${otp}</strong></p>`,
    };

    let response = await transporter.sendMail(mailOptions);
    console.log("Mail Sent:", response);
    response.success = true;
    return response;

  } catch (error) {
    console.error("Error Sending Mail:", error.message);
    throw new Error("Failed to send Mail");
  }
};

module.exports = sendMail;
