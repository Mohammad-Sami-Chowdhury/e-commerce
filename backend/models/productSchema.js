const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number, // Changed from String to Number
    required: true,
  },
  discount: {
    type: Number, // Changed from String to Number
    default: 0,
  },
  image: { // Renamed from productImg to match frontend's field
    type: String,
    default: "placeholder.jpg",
  },
  ram: {
    type: String,
  },
  storage: {
    type: String,
  },
  stock: {
    type: Number, // Changed from String to Number
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
  },
});

module.exports = mongoose.model("Product", productSchema);