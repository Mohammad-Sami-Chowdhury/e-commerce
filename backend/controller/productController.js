const productSchema = require("../models/productSchema");
const categorySchema = require("../models/categorySchema");
const subCategorySchema = require("../models/subCategorySchema");
const { get } = require("mongoose");
const uploadResult = require("../middleware/cloudinary");

async function createProductController(req, res) {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      categoryName,
      subCategoryName,
    } = req.body;
    const fileName = req.file.path;
    const imgUrl = await uploadResult(fileName);

    const existingProduct = await productSchema.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({
        message: "Product already exists",
        status: "Error",
      });
    }
    const category = await categorySchema.findOne({ name: categoryName });
    const subCategory = await subCategorySchema.findOne({
      name: subCategoryName,
    });

    if (!category || !subCategory) {
      return res.status(404).json({
        message: "Category or SubCategory not found",
        status: "Error",
      });
    }
    const product = new productSchema({
      name,
      description,
      price,
      discountPrice,
      productImg: imgUrl.secure_url,
      category: category._id,
      subCategory: subCategory._id,
    });
    const savedProduct = await product.save();

    await categorySchema.findByIdAndUpdate(category._id, {
      $push: { products: savedProduct._id },
    });
    await subCategorySchema.findByIdAndUpdate(subCategory._id, {
      $push: { products: savedProduct._id },
    });
    res.status(201).json({
      message: "Product created and linked successfully",
      status: "Success",
      data: {
        product: savedProduct,
        category: category.name,
        subCategory: subCategory.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      status: "Error",
      error: error.message,
    });
  }
}

async function getAllProductController(req, res) {
  try {
    const allProducts = await productSchema
      .find({})
      .populate("category")
      .populate("subCategory");
    res.status(200).json({
      message: "All products fetched successfully",
      status: "Success",
      data: allProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Internal server error",
      status: "Error",
    });
  }
}

async function getSingleProductController(req, res) {
  const { id } = req.params;
  const getSingleProduct = await productSchema.findOne({ _id: id });
  res.status(200).json({
    message: "Product fetched successfully",
    status: "Success",
    data: getSingleProduct,
  });
}

async function updateProductController(req, res) {
  const { id } = req.params;
  const { name, description, price, discountPrice, productImg } = req.body;
  const updatedProduct = await productSchema.findByIdAndUpdate(
    id,
    { name, description, price, discountPrice, productImg },
    { new: true }
  );
  res.status(200).json({
    message: "Product updated successfully",
    status: "Success",
    data: updatedProduct,
  });
}

async function deleteProductController(req, res) {
  const { id } = req.params;

  try {
    const product = await productSchema.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        status: "Error",
      });
    }
    const categoryId = product.category;
    const subCategoryId = product.subCategory;
    await productSchema.findByIdAndDelete(id);
    await categorySchema.findByIdAndUpdate(categoryId, {
      $pull: { products: id },
      new: true,
    });
    await subCategorySchema.findByIdAndUpdate(subCategoryId, {
      $pull: { products: id },
      new: true,
    });

    res.status(200).json({
      message: "Product deleted and references removed successfully",
      status: "Success",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      message: "Failed to delete product",
      status: "Error",
      error: error.message,
    });
  }
}

async function getProductsByCategoryController(req, res) {
  const { id } = req.params;
  const categoryProducts = await productSchema.findOne({ category: id });
  res.status(200).json({
    message: "Products fetched successfully",
    status: "Success",
    data: categoryProducts,
  });
}

async function getProductsBySubCategoryController(req, res) {
  const { id } = req.params;
  const subCategoryProducts = await productSchema.findOne({ subCategory: id });
  res.status(200).json({
    message: "Products fetched successfully",
    status: "Success",
    data: subCategoryProducts,
  });
}

module.exports = {
  createProductController,
  getAllProductController,
  getProductsByCategoryController,
  getProductsBySubCategoryController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
};
