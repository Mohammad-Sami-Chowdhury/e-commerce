const categorySchema = require("../models/categorySchema");
const subCategorySchema = require("../models/subCategorySchema");

async function subCategoryController(req, res) {
  try {
    const { name, description, category } = req.body;

    // Find the parent category by its ID
    const parentCategory = await categorySchema.findById(category);
    if (!parentCategory) {
      return res.status(404).json({
        message: "Parent category not found",
        status: "Error",
      });
    }

    // Create the subcategory
    const subCategory = new subCategorySchema({
      name,
      description,
      category: parentCategory._id, // Link the subcategory to the parent category
    });

    const savedSubCategory = await subCategory.save();

    // Add the subcategory to the parent category's subCategory array
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

async function updateSubCategoryController(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedSubCategory = await subCategorySchema.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedSubCategory) {
      return res.status(404).json({
        message: "SubCategory not found",
        status: "Error",
      });
    }

    res.status(200).json({
      message: "SubCategory updated successfully",
      status: "Success",
      data: updatedSubCategory,
    });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    res.status(500).json({
      message: "Internal server error",
      status: "Error",
    });
  }
}

async function deleteSubCategoryController(req, res) {
  try {
    const { id } = req.params;
    const subCategoryDelete = await subCategorySchema.findById(id);
    if (!subCategoryDelete) {
      return res.status(404).json({
        message: "SubCategory not found",
        status: "Error",
      });
    }
    const parentCategoryId = subCategoryDelete.category;
    await subCategorySchema.findByIdAndDelete(id);
    await categorySchema.findByIdAndUpdate(
      parentCategoryId,
      { $pull: { subCategory: id } },
      { new: true }
    );
    res.status(200).json({
      message: "SubCategory deleted successfully",
      status: "Success",
    });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    res.status(500).json({
      message: "Internal server error",
      status: "Error",
    });
  }
}

async function getAllSubCategoryController(req, res) {
  try {
    const allSubCategories = await subCategorySchema
      .find({})
      .populate("category");
    res.status(200).json({
      message: "All subcategories fetched successfully",
      status: "Success",
      data: allSubCategories,
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({
      message: "Internal server error",
      status: "Error",
    });
  }
}

async function getSingleSubCategoryController(req, res) {
  try {
    const { id } = req.params;
    const subCategory = await subCategorySchema
      .findById(id)
      .populate("category");
    if (!subCategory) {
      return res.status(404).json({
        message: "SubCategory not found",
        status: "Error",
      });
    }
    res.status(200).json({
      message: "SubCategory fetched successfully",
      status: "Success",
      data: subCategory,
    });
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    res.status(500).json({
      message: "Internal server error",
      status: "Error",
    });
  }
}

module.exports = {
  subCategoryController,
  updateSubCategoryController,
  deleteSubCategoryController,
  getAllSubCategoryController,
  getSingleSubCategoryController,
};
