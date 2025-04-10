const express = require("express");
const {categoryControler, getAllCategoryController, getSingleCategoryController} = require("../../controller/categoryController");
const route = express.Router();

route.post("/createcategory", categoryControler)
route.get("/getallcategory", getAllCategoryController)
route.get("/getsinglecategory/:id", getSingleCategoryController)
module.exports = route;