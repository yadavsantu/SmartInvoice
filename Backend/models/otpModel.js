const mongoose = require("mongoose");

const mailSender = require("./../util/mailSender");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

async function sendVerificationMail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1> Please Confirm Your OTP</h1>
            <p>Here is Your OTP code ${otp}</p>`
    );

    console.log("Email Sent successfully");
  } catch (error) {
    console.log("Error Occoured While sending Email", error);
  }
}

otpSchema.pre("save", async function (next) {
  console.log("New document is Saved to database");
  if (this.isNew) await sendVerificationMail(this.email, this.otp);

  next();
});
module.exports("OTP", otpSchema);
