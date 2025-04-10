const categorySchema = require("../models/categorySchema");

async function categoryControler(req, res) {
  const { name, description } = req.body;
  const existingCategory = await categorySchema.findOne({ name });

  if (existingCategory) {
    return res.status(400).json({
      message: "Category already exists",
      status: "Error",
    });
  }
  const category = new categorySchema({
    name,
    description,
  });
  category.save();
  res.status(200).json({
    message: "Category created successfully",
    status: "Success",
    data: category,
  });
}

async function getAllCategoryController(req, res) {
  try {
    const allCategory = await categorySchema.find({});
    res.status(200).json({
      message: "All categories fetched successfully",
      status: "Success",
      data: allCategory,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      message: "Internal server error",
      status: "Error",
    });
  }
}

async function getSingleCategoryController(req, res) {
  const { id } = req.params;
  const getSingleCategory = await categorySchema.findOne({ _id: id });
  res.status(200).json({
    message: "Category fetched successfully",
    status: "Success",
    data: getSingleCategory,
  });
}
module.exports = { categoryControler, getAllCategoryController, getSingleCategoryController };
