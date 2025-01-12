const mongoose = require("mongoose");
const otpModel = require("./../models/otpModel");
const userModel = require("./../models/usermodels");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
require("dotenv").config();

const verifyOtp = async (req, res, next) => {
  const session = await otpModel.startSession();
  session.startTransaction();

  let decodedEmail;
try {
  decodedEmail = JWT.verify(req.body.encodedEmail, process.env.emailDecodeSecret);
} catch (error) {
  return res.status(401).json({ message: "Invalid or expired token" });
}

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

    const updateUserStatus = await userModel.updateOne(
      { email: decodedEmail.email },
      { $set: { otpvalidated: true } },
      {session}
    );


    if (updateUserStatus.modifiedCount > 0) {
      await otpModel.deleteOne({ email: decodedEmail.email }, {session});
      console.log("Otp Deleted")
      await session.commitTransaction();
      session.endSession();
      return res
        .status(201)
        .json({ message: "User email Validated Sucessfully " });
    } else {
      return res.status(401).json({ message: "Failled to Update User status" });
    }
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    console.log(err);
  }
};
module.exports = verifyOtp;
