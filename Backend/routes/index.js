const express = require("express");
const { validateUser, validatelogin } = require("../util/validateuser");
const { registerUser, loginUser,getUsersData } = require("../userController/index");
const validateToken = require("../util/validateToken");
const routes = express.Router();


routes.post("/register", validateUser, registerUser);
routes.post("/login", validatelogin, loginUser);
routes.get("/users", validateToken, getUsersData);
    
module.exports = routes;
