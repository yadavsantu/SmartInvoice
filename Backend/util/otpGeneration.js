const otpGenerator = require("otp-generator");
const otpModel = require("../models/otpModel");
const mailSender = require("./../util/mailSender");
const bcrypt = require("bcryptjs");


const storeOtp = async (Email, session) => {
  try {
    const Otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const hashedOtp = await bcrypt.hash(Otp, 10);

    const newOtp = new otpModel({
      email: Email,
      otp: hashedOtp,
    });

    await newOtp.save({ session });
    console.log("OTP generation successful", Otp);

    const response = await mailSender(Email, Otp);
    console.log("Mail Response:", response);

    if (!response.success) {
      throw new Error("Failed To Send OTP to the Email");
    }

    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error in storeOtp:", error.message);
    return { success: false, message: error.message }; 
  }
};
module.exports = storeOtp;

