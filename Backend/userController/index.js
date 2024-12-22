const userModel = require("../models/usermodels");
const UserModel = require("../models/usermodels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const userModel = new UserModel(req.body);

  userModel.password = await bcrypt.hash(req.body.password, 10);
  try {
    const response = await userModel.save();
    response.password = undefined;
    return res
      .status(201)
      .json({ message: "User Registration Successful", data: response });
  } catch (err) {
    if (err.code == 11000) {
      return res.status(409).json({ message: "Email Already exist" });
    }
    return res.status(500).json({ message: "Error occurred", err });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Invalid UserName or Password" });
    }
    const isPasswordequal = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordequal) {
      return res.status(401).json({ message: "Invalid UserName or Password" });
    }

    const tokenObj = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };
    const jwtToken = jwt.sign(tokenObj, process.env.SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({ jwtToken, tokenObj });
  } catch (err) {
    return res.status(500).json({ message: "error", err });
  }
};

const getUsersData = async (req, res) => {
  try {
    const user = await userModel.find({}, { password: 0 });
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ message: "Error", error });
  }
};

module.exports = { registerUser, loginUser, getUsersData };
