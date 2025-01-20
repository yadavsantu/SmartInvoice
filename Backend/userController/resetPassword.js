const userModel = require("./../models/usermodels");
const otoModel = require("./../models/usermodels");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const resetPassword = async (req, res) => {
  const email = req.body.email;

  if (req.body.password != req.body.repeat_password) {
    return res.status(400).json({ message: " Both Password Don't Match" });
  }

  const password = req.body.password;

  const otpVerify = await otoModel.findOne({ email: email });
 
  const otpResponse = await bcrypt.compare(req.body.otp, otpVerify.otp);

  if (!otpResponse)
    return res
      .status(400)
      .json({ message: " Invalid OTP Please enter correct OTP" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const changePassword = await userModel.updateOne(
    { email: email },
    { $set: { password: hashedPassword } }
  );

  if (changePassword.modifiedCount > 0) {
    return res.status(200).json({ message: "Password Changed Successfully" });
  }

  return res.status(400).json({ message: "Faiiled to update Password" });
};

module.exports = resetPassword;
