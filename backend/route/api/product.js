const express = require("express");
const {
  createProductController,
  getAllProductController,
  getProductsByCategoryController,
  getProductsBySubCategoryController,
  updateProductController,
  deleteProductController,
} = require("../../controller/productController");
const route = express.Router();

route.post("/createproduct", createProductController);
route.get("/getallproduct", getAllProductController);
route.get("/getcategoryproduct/:id", getProductsByCategoryController);
route.get("/getsubcategoryproduct/:id", getProductsBySubCategoryController);
route.patch("/updateproduct/:id", updateProductController);
route.delete("/deleteproduct/:id", deleteProductController);

module.exports = route;
