require("dotenv").config();
const cookieParser = require("cookie-parser");
const UserModel = require("../models/usermodels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateOtp = require("./../util/otpGeneration");

const registerUser = async (req, res) => {
  const newUser = new UserModel(req.body);
  newUser.password = await bcrypt.hash(req.body.password, 10);
  try {
    let response = await newUser.save();
    response.password = undefined;

    const otpResponse = await generateOtp(newUser.email);
    const signedEmail = jwt.sign({email:newUser.email}, process.env.emailDecodeSecret, {
      expiresIn: process.env.unverifiedEmailExpiry,
    });
    return res.status(201).json({
      message: "User Registration Successful, OTP sent to email",
      signedEmail,
    });
  } catch (err) {
    if (err.code == 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "An error occurred", err });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.otpvalidated) {
      return res.status(401).json({ message: "User Email  not verified! " });
    }

    const tokenObj = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    const accessToken = jwt.sign(tokenObj, process.env.SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });

    const refreshToken = jwt.sign(tokenObj, process.env.SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });

    if (req.body.rememberMe) {
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true, // Ensure this is true in production with HTTPS
        sameSite: "strict",
        maxAge: req.body.rememberMe ? 7 * 24 * 60 * 60 * 1000 : undefined, // 7 days if "Remember Me" is checked
      });
    }

    return res.status(200).json({ accessToken, refreshToken, user: tokenObj });
  } catch (err) {
    return res.status(500).json({ message: "An error occurred", err });
  }
};

const getUsersData = async (req, res) => {
  try {
    const users = await UserModel.find({}, { password: 0 });
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports = { registerUser, loginUser, getUsersData };
