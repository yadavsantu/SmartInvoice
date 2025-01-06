const otpGenerator = require("otp-generator");
const otp = require("./../models/otpModel");
const user = require("./../models/usermodels");

let otp = otpGenerator.generate(6, {
  upperCaseAlphabets: false,
  lowerCaseAlphabets: false,
  specialChars: false,
});
    