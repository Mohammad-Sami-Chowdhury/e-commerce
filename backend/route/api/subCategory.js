const express = require("express");
const {
  subCategoryController,
  updateSubCategoryController,
  deleteSubCategoryController,
  getAllSubCategoryController,
  getSingleSubCategoryController,
} = require("../../controller/subCategoryController");

const route = express.Router();

route.post("/createsubcategory", subCategoryController);
route.get("/getallsubcategory", getAllSubCategoryController);
route.get("/getsinglesubcategory/:id", getSingleSubCategoryController);
route.patch("/updatesubcategory/:id", updateSubCategoryController);
route.delete("/deletesubcategory/:id", deleteSubCategoryController);
module.exports = route;
