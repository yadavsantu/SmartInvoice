const { default: mongoose } = require("mongoose");
const userModel = require("./../models/usermodels");
const otpGeneration = require("./../util/otpGeneration");

const verifyResetEmail = async (req, res) => {
  const email = req.body.email;
  const session = await userModel.startSession();
  session.startTransaction();
  try {
    let response = await userModel.findOne({ email }).session(session);

    if (!response) return res.status(400).json({ message: "User Not found " });

    if (!response.otpvalidated)
      return res.status(400).json({
        message: "User email not verified please verify your email first",
      });

    console.log("Email Found");
    response = await otpGeneration(email, session);
    if (!response)
      return res.status(400).json({ message: "Failled to send OTP " });

    session.commitTransaction();
    session.endSession();
    return res
      .status(200)
      .json({ message: "Email Sent Please Check your Inbox" });
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    console.log(error);
  }
};

module.exports = verifyResetEmail;
