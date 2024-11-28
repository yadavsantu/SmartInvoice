const express = require("express");
const validateUser = require("../util/validateuser")
const { registerUser, loginUser } = require("../userController/index");
const routes = express.Router();
routes.post("/register", validateUser, registerUser);
routes.post("/login", loginUser);

module.exports = routes;
