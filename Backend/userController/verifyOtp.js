const mongoose = require("mongoose");
const otpModel = require("./../models/otpModel");
const userModel = require("./../models/usermodels");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
require("dotenv").config();

const verifyOtp = async (req, res, next) => {
  const decodedEmail = JWT.verify(
    req.body.email,
    process.env.emailDecodeSecret
  );
  console.log(decodedEmail);

  try {
    const ifuserExists = await userModel.findOne({ email: decodedEmail.email });
    if (!ifuserExists)
      return res.status(401).json({
        message: "User is not registred Please Register and try again",
      });

    const ifOtpExists = await otpModel.findOne({ email: decodedEmail.email });
    if (!ifOtpExists)
      return res
        .status(401)
        .json({ message: "Otp expired please Request for Otp Again" });

    const isOtpMatched = await bcrypt.compare(
      req.body.otp.toString(),
      ifOtpExists.otp
    );
    if (!isOtpMatched) return res.status(401).json({ message: "Invalid OTP" });

    console.log("OTP matched");
    // ifuserExists.otpvalidated = true;

    const updateUserStatus = await userModel.updateOne(
      { email: decodedEmail.email },
      { $set: { otpvalidated: true } }
    );
    if (updateUserStatus.modifiedCount > 0)
      return res
        .status(201)
        .json({ message: "User email Validated Sucessfully " });
    else {
      return res.status(401).json({ message: "Failled to Update User status" });
    }

    console.log("User Status Changed");
  } catch (err) {
    console.log(err);
  }
};
module.exports = verifyOtp;
