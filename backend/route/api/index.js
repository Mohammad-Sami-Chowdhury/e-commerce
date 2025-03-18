const express = require("express");
const route = express.Router();
const authRoute = require("./authentication");

route.use("/authentication", authRoute);

module.exports = route;
