const otpGenerator = require("otp-generator");
const otpModel = require("../models/otpModel");
const mailSender = require("./../util/mailSender");
const bcrypt = require("bcryptjs");

const storeOtp = async (Email) => {
  try {
    // Generate OTP (6 digits without alphabets or special characters)
    const Otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Hash the OTP for secure storage
    const hashedOtp = await bcrypt.hash(Otp, 10);

    // Store the hashed OTP in the database
    const newOtp = new otpModel({
      email: Email,
      otp: hashedOtp,
    });
    await newOtp.save();
    console.log("OTP generation successful",Otp);
    response =await mailSender(Email, Otp); 
    return { message: "OTP generated and sent to email" };
  } catch (error) {
    console.error("An error occurred while generating or storing OTP", error);
    throw new Error("OTP generation failed");
  }
};

module.exports = storeOtp;
