const express = require("express");
const { validateUser, validatelogin } = require("../util/validateuser");
const { registerUser, loginUser } = require("../userController/index");
const routes = express.Router();
routes.post("/register", validateUser, registerUser);
routes.post("/login", validatelogin,loginUser);

module.exports = routes;
