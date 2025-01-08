const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  try {
    const { email } = req.body;
    const { Otp } = req;

    if (!email || !Otp) {
      return res.status(400).json({ message: "Email or OTP is missing" });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'moriah.gusikowski@ethereal.email',
          pass: 'V6KqH1tjuv9H1qfuJt'
      }
  });
    const mailOptions = {
      from: '"Smart Invoice - Sandesh Prasai" <no-reply@smartinvoice.com>',
      to: email,
      subject: "Please Verify Your Email",
      text: `Your OTP is ${Otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Mail Sent Successfully");
    return res
      .status(200)
      .json({ message: "OTP sent successfully to your email" });
  } catch (error) {
    console.error("Error Sending Mail:", error);
    return res
      .status(500)
      .json({ message: "Failed to send OTP. Please try again later." });
  }
};

module.exports = sendMail;
