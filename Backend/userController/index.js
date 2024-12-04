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
    return res.status(500).json({ message: "Error occurred", err });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json.message({ message: "Invalid UserName or Password" });
    }
    const isPasswordequal = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordequal) {
      return res
        .status(401)
        .json.message({ message: "Invalid UserName or Password" });
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
    return res.status(500).json.message({ message: "error", err });
  }
};

module.exports = { registerUser, loginUser };
