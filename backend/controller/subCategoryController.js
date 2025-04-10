const categorySchema = require("../models/categorySchema");
const subCategorySchema = require("../models/subCategorySchema");

async function subCategoryController(req, res) {
  try {
    const { name, description, category } = req.body;

    const parentCategory = await categorySchema.findOne({ name: category });
    if (!parentCategory) {
      return res.status(404).json({
        message: "Parent category not found",
        status: "Error",
      });
    }

    const subCategory = new subCategorySchema({
      name,
      description,
      category: parentCategory._id,
    });

    const savedSubCategory = await subCategory.save();

    parentCategory.subCategory.push(savedSubCategory._id);
    await parentCategory.save();

    res.status(200).json({
      message: "SubCategory created successfully",
      status: "Success",
      data: savedSubCategory,
    });
  } catch (error) {
    console.error("Error creating subcategory:", error);
    res.status(500).json({
      message: "Internal server error",
      status: "Error",
    });
  }
}

module.exports = subCategoryController;
