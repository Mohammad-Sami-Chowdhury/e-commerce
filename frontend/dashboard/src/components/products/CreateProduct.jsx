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
    category: "",
    subCategory: "",
    image: "",
  });
  const handleChange = (e) => {
    console.log(e.target.files);
    if (e.target.name == "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({
        ...form,
        [e.target.name]: [e.target.value],
      });
    }
  };

  // const handleCreateProduct = async () => {
  //   try {
  //     const formData = new FormData();
  //     Object.entries(form).forEach(([key, value]) => {
  //       console.log(key, value);
  //       console.log(formData, "dbvdbdgv");

  //       if (key == "image") {
  //         formData.append("image", value);
  //       } else {
  //         formData.append(key, value);
  //       }
  //     });
  //     console.log(form, "this is form");
  //     console.log(formData, "this is formData");

  //     const response = await axios.post(
  //       "http://localhost:5000/api/v1/product/createproduct",
  //       form,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log(response, "this is response");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // for options

  const handleCreateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price.toString()); // Convert to string if needed
      formData.append("discount", form.discount.toString());
      formData.append("stock", form.stock.toString());
      formData.append("ram", form.ram);
      formData.append("storage", form.storage);
      formData.append("category", form.category); // Send category ID
      formData.append("subCategory", form.subCategory || ""); // Optional
      if (form.image) {
        formData.append("image", form.image); // Append the File object
      }

      const response = await axios.post(
        "http://localhost:5000/api/v1/product/createproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

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
      className="bg-gray-800 w-full bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
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
              className="w-full bg-gray-800 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
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
              className="w-full bg-gray-800 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="">Select Category</option>
              {categories.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
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
              className="w-full bg-gray-800 h-24 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
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
              className="w-full bg-gray-800 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="">Select Subcategory</option>
              {subCategoryies.map((subcategory) => {
                return (
                  <option key={subcategory._id} value={subcategory._id}>
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
              className="w-full bg-gray-800 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
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
              className="w-full bg-gray-800 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
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
              className="w-full bg-gray-800 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
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
              className="w-full bg-gray-800 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          {/* Product Image */}
          <div>
            <label className="block font-semibold mb-1">Product's Image</label>
            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18M3 12h18"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
              </div>
              <input
                id="image"
                type="file"
                name="image"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {form.image && (
              <div className="mt-2">
                <p className="text-sm text-gray-400">Selected File: {form.image.name}</p>
              </div>
            )}
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
              className="w-full bg-gray-800 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
        </form>

        {/* Submit Button */}
        <div onClick={handleCreateProduct} className="mt-8">
          <button
            type="submit"
            className="w-full md:w-auto bg-gray-800 text-white px-6 py-3 rounded-md transition duration-300 cursor-pointer"
          >
            CREATE PRODUCT
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateProduct;
