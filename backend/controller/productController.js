const productSchema = require("../models/productSchema");
const categorySchema = require("../models/categorySchema");
const subCategorySchema = require("../models/subCategorySchema");
const uploadResult = require("../middleware/cloudinary");
const createProductController = async (req, res) => {
  try {
    // Access form data from req.body and req.file
    const {
      name,
      description,
      price,
      discount,
      stock,
      ram,
      storage,
      category,
      subCategory,
    } = req.body;


    const fileName = req.file.path;
    const imgUrl = await uploadResult(fileName);

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: "Missing required fields (name, description, price, category)",
        status: "Error",
      });
    }

    // Create the product
    const product = new productSchema({
      name,
      description,
      price: Number(price),
      discount: Number(discount),
      stock: Number(stock),
      ram,
      storage,
      category, // Ensure this is a valid category ID
      subCategory: subCategory || null,
      image: imgUrl.secure_url || null, // Use the URL from Cloudinary or local path
    });

    const savedProduct = await product.save();

    // Update category and subcategory
    await categorySchema.findByIdAndUpdate(category, {
      $push: { products: savedProduct._id },
    });

    if (subCategory) {
      await subCategorySchema.findByIdAndUpdate(subCategory, {
        $push: { products: savedProduct._id },
      });
    }

    res.status(201).json({
      message: "Product created!",
      status: "Success",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      status: "Error",
      error: error.message,
    });
  }
};

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
  const { name, description, price, discount, productImg, ram, storage, color, stock } = req.body;
  const updatedProduct = await productSchema.findByIdAndUpdate(
    id,
    { name, description, price, discount, productImg },
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
