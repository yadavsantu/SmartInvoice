const express = require("express");
const { validateUser, validatelogin } = require("../util/validateuser");
const {
  registerUser,
  loginUser,
  getUsersData,
} = require("../userController/index");
const refreshToken = require("../userController/refresh-token");
const validateToken = require("../util/validateToken");
const otpGenerator = require("./../util/otpGeneration");
const sendMail = require("../util/mailSender");
const verifyOtp = require("../userController/verifyOtp");
const emailVerification = require("./../userController/verifyResetEmail");
const resetPassword = require("./../userController/resetPassword");
const validateInputs = require("./../util/validateInputs");
const uploadFile = require("../Helper/uploadFile");
const saveInvoice = require("./../userController/insertInvoice");
const loadInvoice = require("./../userController/loadInvoices");
const updateInvoiceHelper = require("../util/InvoiceHelper");
const updateInvoice = require("../userController/updateInvoiceStatus");
const downloadInvoice = require('../userController/DownloadInvoice')


const routes = express.Router();
routes.post("/register", validateUser, registerUser);
routes.post("/login", validatelogin, loginUser);
routes.post("/refresh", refreshToken);
routes.post("/verifyOtp", verifyOtp);
routes.post("/verifyEmail", emailVerification);
routes.post("/ResetPassword", resetPassword);
routes.post("/sendInvoice", uploadFile, validateInputs, saveInvoice);

routes.get("/download/:invoiceId",updateInvoiceHelper, downloadInvoice);

routes.get("/loadInvoice", loadInvoice);
routes.get("/users", validateToken, getUsersData);

routes.put(
  "/updateInvoice/:invoiceId",
  validateToken,
  updateInvoiceHelper,
  updateInvoice
);

module.exports = routes;
