const mongoose = require("mongoose");
const { Schema } = mongoose;
const subCategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});
module.exports = mongoose.model("SubCategory", subCategorySchema);
