const express = require("express");
const route = express.Router();
const apiRoute = require("./api");
const baseURL = process.env.BASE_URL;

route.use(baseURL, apiRoute);

module.exports = route;
