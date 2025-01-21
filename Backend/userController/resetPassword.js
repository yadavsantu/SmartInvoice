const otpModel = require("./../models/otpModel");
const userModel = require("./../models/usermodels");
const bcrypt = require("bcryptjs");

const resetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const { password, otp } = req.body;
    console.log(req.body);

    if (!email || !password || !otp) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const otpVerify = await otpModel.findOne({ email });
    if (!otpVerify) {
      return res
        .status(404)
        .json({ message: "OTP not found for the provided email" });
    }

    const otpResponse = await bcrypt.compare(otp.toString(), otpVerify.otp);
    if (!otpResponse) {
      return res
        .status(400)
        .json({ message: "Invalid OTP, please enter the correct OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const changePassword = await userModel.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    if (changePassword.modifiedCount > 0) {
      const deleteOtp = await otpModel.deleteOne({ email });
      return res.status(200).json({ message: "Password changed successfully" });
    } else {
      return res.status(400).json({ message: "Failed to update password" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = resetPassword;
