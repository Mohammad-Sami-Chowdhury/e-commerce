const express = require("express");
const {
  createProductController,
  getAllProductController,
  getProductsByCategoryController,
  getProductsBySubCategoryController,
  updateProductController,
  deleteProductController,
} = require("../../controller/productController");
const multer = require("multer");
const route = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});
const upload = multer({ storage: storage })

route.post(
  "/createproduct",
  upload.single("productImg"),
  createProductController
);
route.get("/getallproduct", getAllProductController);
route.get("/getcategoryproduct/:id", getProductsByCategoryController);
route.get("/getsubcategoryproduct/:id", getProductsBySubCategoryController);
route.patch("/updateproduct/:id", updateProductController);
route.delete("/deleteproduct/:id", deleteProductController);

module.exports = route;
