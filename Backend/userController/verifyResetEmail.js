const { default: mongoose } = require("mongoose");
const userModel = require("./../models/usermodels");
const otpGeneration = require("./../util/otpGeneration");

const verifyResetEmail = async (req, res) => {
  const email = req.body.email;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await userModel.findOne({ email }).session(session);

    if (!user) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ message: "User not found. Please Register" });
    }

    if (!user.otpvalidated) {
      console.log("!otpvalidated");
      await session.abortTransaction();
      return res.status(400).json({
        message: "User email not verified. Please verify your email first.",
      });
    }

    const otpResponse = await otpGeneration(email, session);
    if (!otpResponse) {
      console.log("!otpresponse");
      await session.abortTransaction();
      return res.status(400).json({ message: "Failed to send OTP" });
    }

    await session.commitTransaction();
    return res
      .status(200)
      .json({ message: "Email sent. Please check your inbox." });
  } catch (error) {
    console.log(error.code);
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    if (error.code === 251) {
      return res
        .status(409)
        .json({ message: "OTP already sent. Please check your inbox." });
    }

    console.error("Error in verifyResetEmail:", error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    session.endSession(); // Always end the session
  }
};

module.exports = verifyResetEmail;
