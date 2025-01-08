const otpGenerator = require("otp-generator");
const otpModel = require("./../models/otpModel");
const user = require("./../models/usermodels");
const bcrypt = require("bcryptjs");
const userModel = require("./../models/usermodels");

const Otp = otpGenerator.generate(6, {
  upperCaseAlphabets: false,
  lowerCaseAlphabets: false,
  specialChars: false,
});

const storeOtp = async (req, res, next) => {
  let response = "";
  try {
    const hashedOtp = await bcrypt.hash(Otp, 10);
    const newOtp = new otpModel({
      email: req.body.email,
      otp: hashedOtp,
    });
    response = await newOtp.save();
    console.log("Otp generation SucessFull ");
    // return res.status(201).json({ message: "Your Otp is:", Otp });
    req.Otp = Otp;
    req.email = req.body.email;
    next();
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(401)
        .json({ message: "Email Already Sent Please Check Your Mail" });
    console.log("An error occoured while generating or storing OTP", error);
  }
};
module.exports = storeOtp;
