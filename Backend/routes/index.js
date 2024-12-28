const express = require("express");
const { validateUser, validatelogin } = require("../util/validateuser");
const {
  registerUser,
  loginUser,
  getUsersData,
} = require("../userController/index");
const generateInvoice = require("./../util/validateDashBoardInputs");
const generateTenplate = require("./../userController/generate");
const refreshToken = require("../userController/refresh-token");
const validateToken = require("../util/validateToken");
const routes = express.Router();
routes.post("/register", validateUser, registerUser);
routes.post("/login", validatelogin, loginUser);
routes.post("/refresh", refreshToken);
routes.get("/users", validateToken, getUsersData);

routes.post("/generate", generateInvoice, generateTenplate);

module.exports = routes;
