const express = require("express");
const {
  categoryControler,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
  deleteCategory,
} = require("../../controller/categoryController");
const {
  deleteProductController,
  updateProductController,
} = require("../../controller/productController");
const route = express.Router();

route.post("/createcategory", categoryControler);
route.get("/getallcategory", getAllCategoryController);
route.get("/getsinglecategory/:id", getSingleCategoryController);
route.get("/deleteproduct/:id", deleteProductController);
route.get("/updateproduct/:id", updateProductController);
route.patch("/updatecategory/:id", updateCategoryController);
route.delete("/deletecategory/:id", deleteCategory);
module.exports = route;
