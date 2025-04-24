const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  subCategory: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
