const express = require("express");
const subCategoryController = require("../../controller/subCategoryController");

const route = express.Router();

route.post("/createsubcategory", subCategoryController);
module.exports = route;
