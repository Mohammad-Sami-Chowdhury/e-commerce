import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";

const CreateProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    ram: "",
    storage: "",
    color: "",
    category: "",
    subCategory: "",
    image: null,
  });
  const handleChange = (e) => {
    console.log(e.target.files);
    // if (e.target.name == "image") {
    //   setForm({ ...form, image: e.target.files[0] });
    // } else {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // }
  };

  const handleCreateProduct = async () => {
    console.log(form);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        console.log(key, value);
        console.log(formData);

        // if (key == "image") {
        //   formData.append("image", value);
        // } else {
        formData.append(key, value);
        // }
      });
      console.log(form);
      console.log(formData);

      const response = await axios.post(
        "http://localhost:5000/api/v1/product/createproduct",
        formData,
        form
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // for options
  const [categories, setCategories] = useState([]);
  const [subCategoryies, setSubCategoryies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/category/getallcategory")
      .then((res) => setCategories(res.data.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/subcategory/getallsubcategory")
      .then((res) => setSubCategoryies(res.data.data));
  }, []);
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Create Product</h2>
        <p className="text-gray-500 mb-6">
          Nice to meet you! Enter your details to register.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block font-semibold mb-1">
              Product's Name <span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Product's Name"
              className="w-full bg-black border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          {/* Product Category */}
          <div>
            <label className="block font-semibold mb-1">
              Product's Category <span className="text-red-500">*</span>
            </label>
            <select
              value={form.category}
              name="category"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-black border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="">Select Category</option>
              {categories.map((category) => {
                console.log("Subcategory Name:", category); // Log the subcategory name
                return (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Product Description */}
          <div>
            <label className="block font-semibold mb-1">
              Product's Description <span className="text-red-500">*</span>
            </label>
            <textarea
              onChange={handleChange}
              name="description"
              placeholder="Product's Description"
              className="w-full bg-black h-24 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            ></textarea>
          </div>

          {/* Product Subcategory */}
          <div>
            <label className="block font-semibold mb-1">
              Product's Subcategory
            </label>
            <select
              value={form.subCategory}
              name="subCategory"
              onChange={(e) =>
                setForm({ ...form, subCategory: e.target.value })
              }
              className="w-full bg-black border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="">Select Subcategory</option>
              {subCategoryies.map((subcategory) => {
                console.log("Subcategory Name:", subcategory.name); // Log the subcategory name
                return (
                  <option key={subcategory.name} value={subcategory.name}>
                    {subcategory.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Product Discount */}
          <div>
            <label className="block font-semibold mb-1">
              Product's Discount
            </label>
            <input
              onChange={handleChange}
              name="discount"
              type="text"
              placeholder="Product's Discount"
              className="w-full bg-black border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          {/* Product Ram */}
          <div>
            <label className="block font-semibold mb-1">Product's Ram</label>
            <input
              onChange={handleChange}
              name="ram"
              type="text"
              placeholder="Product's ram"
              className="w-full bg-black border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          {/* Product storage */}
          <div>
            <label className="block font-semibold mb-1">
              Product's storage
            </label>
            <input
              onChange={handleChange}
              name="storage"
              type="text"
              placeholder="Product's Discount"
              className="w-full bg-black border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          {/* Product Stock */}
          <div>
            <label className="block font-semibold mb-1">Product's Stock</label>
            <input
              onChange={handleChange}
              name="stock"
              type="text"
              placeholder="Product's Discount"
              className="w-full bg-black border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          {/* Product Image */}
          <div>
            <label className="block font-semibold mb-1">Product's Image</label>
            <input
              onChange={handleChange}
              type="file"
              name="image"
              className="w-full bg-black border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          {/* Product Price */}
          <div>
            <label className="block font-semibold mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleChange}
              name="price"
              type="text"
              placeholder="Product's Price"
              className="w-full bg-black border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          {/* Product Discount */}
          <div>
            <label className="block font-semibold mb-1">Product's Color</label>
            <input
              onChange={handleChange}
              name="color"
              type="text"
              placeholder="Product's color"
              className="w-full border bg-black border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
        </form>

        {/* Submit Button */}
        <div onClick={handleCreateProduct} className="mt-8">
          <button
            type="submit"
            className="w-full md:w-auto bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300 cursor-pointer"
          >
            CREATE PRODUCT
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateProduct;
