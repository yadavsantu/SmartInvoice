const UserModel = require("../models/usermodels");
const bcrypt = require("bcrypt");

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

const loginUser = (req, res) => {
  res.send("Login success");
};

module.exports = { registerUser, loginUser };
