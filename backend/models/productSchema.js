const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: String,
    // required: true,
  },
  discount: {
    type: String,
    // required: true,
  },
  // productImg: {
  //   type: String,
  // },
  ram: {
    type: String,
  },
  storage: {
    type: String,
  },
  color: {
    type: String,
  },
  stock: {
    type: String,
    // required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    // required: true,
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    // required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
