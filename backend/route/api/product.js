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

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./upload");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname +
//         "-" +
//         uniqueSuffix +
//         `.${file.originalname.split(".")[1]}`
//     );
//   },
// });

// const upload = multer({ storage: storage });

const route = express.Router();

// route.post("/createproduct", upload.single("image"), createProductController);
route.post("/createproduct", createProductController);
route.get("/getallproduct", getAllProductController);
route.get("/getcategoryproduct/:id", getProductsByCategoryController);
route.get("/getsubcategoryproduct/:id", getProductsBySubCategoryController);
route.patch("/updateproduct/:id", updateProductController);
route.delete("/deleteproduct/:id", deleteProductController);

module.exports = route;
