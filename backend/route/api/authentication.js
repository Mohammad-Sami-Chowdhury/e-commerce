const express = require("express");
const {registrationController} = require("../../controller/registrationController");
const otpController = require("../../controller/otpController");
const {
  loginController,
  dashboard,
  logout,
} = require("../../controller/loginController");
const resetOtpController = require("../../controller/resetOtpController");
const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");
const route = express.Router();

route.post("/registration", registrationController);
route.post("/otpverification", otpController);
route.post("/login", loginController);
route.post("/logout", logout);
route.post("/otp-reset", resetOtpController);
// route.get ("/dashboard", authMiddleware, dashboard)
route.get(
  "/admin-dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  dashboard
);
route.get("/user-dashboard", authMiddleware, roleMiddleware("user"), dashboard);

module.exports = route;
