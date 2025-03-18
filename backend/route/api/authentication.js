const express = require("express");
const registrationController = require("../../controller/registrationController");
const otpController = require("../../controller/otpController");
const loginController = require("../../controller/loginController");
const resetOtpController = require("../../controller/resetOtpController");
const route = express.Router();

route.post("/registration", registrationController);
route.post("/otpverification", otpController);
route.post("/login", loginController);
route.post("/otp-reset", resetOtpController);

module.exports = route;
