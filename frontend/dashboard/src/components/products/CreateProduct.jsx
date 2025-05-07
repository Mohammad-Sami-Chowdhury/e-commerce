import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";

const CreateProduct = () => {
  const [allCategory, setAllcategory] = useState([]);
  const [allSubCategory, setAllSubcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/category/getallcategory")
      .then((res) => {
        console.log("Category Response:", res.data.data);
        const categories = res.data.data;
        setAllcategory(categories);
        // Set the first category as selected if available
        if (categories.length > 0) {
          setSelectedCategory(categories[0].name);
        }
      });

    axios
      .get("http://localhost:5000/api/v1/subCategory/getallsubcategory")
      .then((res) => {
        console.log("SubCategory Response:", res.data.data);
        const subCategories = res.data.data;
        setAllSubcategory(subCategories);
        // Set the first subcategory as selected if available
        if (subCategories.length > 0) {
          setSelectedSubCategory(subCategories[0].name);
        }
      });
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const category = allCategory.find(
      (category) => category.name === selectedCategory
    );
    const subCategory = allSubCategory.find(
      (subcategory) => subcategory.name === selectedSubCategory
    );

    // Check if category or subcategory is not found
    if (!category || !subCategory) {
      console.error("Category or SubCategory not found");
      return;
    }

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("description", e.target.description.value);
    formData.append("price", e.target.price.value);
    formData.append("color", e.target.color.value);
    formData.append("stock", e.target.stock.value);
    formData.append("ram", e.target.ram.value);
    formData.append("storage", e.target.storage.value);
    formData.append("discountPrice", e.target.discountPrice.value);
    formData.append("category", category._id);
    formData.append("subCategory", subCategory._id);

    if (e.target.image.files[0]) {
      formData.append("image", e.target.image.files[0]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/product/createproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data.message);
    } catch (error) {
      console.log(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <motion.div
      className="bg-gray-800 w-full bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-5xl font-bold text-center mb-10">Create Product</h2>

      <form onSubmit={handleCreateProduct}>
        <label className="text-2xl font-bold text-blue-gray-600 mb-3 block">
          Product Name
        </label>
        <input
          maxLength={16}
          name="name"
          placeholder="Product Name"
          className="bg-gray-700 w-[500px] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="text-2xl font-bold text-blue-gray-600 mb-3 block">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Description"
          className="bg-gray-700 w-[500px] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <label className="text-2xl font-bold text-blue-gray-600 mb-3 block">
          Price
        </label>
        <input
          maxLength={16}
          name="price"
          placeholder="Price"
          className="bg-gray-700 w-[500px] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="text-2xl font-bold text-blue-gray-600 mb-3 block">
          Color
        </label>
        <input
          maxLength={16}
          name="color"
          placeholder="Color"
          className="bg-gray-700 w-[500px] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="text-2xl font-bold text-blue-gray-600 mb-3 block">
          Stock
        </label>
        <input
          maxLength={16}
          name="stock"
          placeholder="stock"
          className="bg-gray-700 w-[500px] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="text-2xl font-bold text-blue-gray-600 mb-3 block">
          Ram
        </label>
        <input
          maxLength={16}
          name="ram"
          placeholder="Ram"
          className="bg-gray-700 w-[500px] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="text-2xl font-bold text-blue-gray-600 mb-3 block">
          Storage
        </label>
        <input
          maxLength={16}
          name="storage"
          placeholder="Storage"
          className="bg-gray-700 w-[500px] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="text-2xl font-bold text-blue-gray-600 mb-3 block">
          Image
        </label>
        <input
          maxLength={16}
          name="image"
          type="file"
          accept="image/*"
          className="bg-gray-700 w-[500px] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="text-2xl font-bold text-blue-gray-600 mb-3 block">
          Discount
        </label>
        <input
          maxLength={16}
          name="discountPrice"
          placeholder="Discount"
          className="bg-gray-700 w-[500px] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="text-2xl font-bold text-blue-gray-600 mb-3 block">
          Category
        </label>
        <select
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-gray-700 w-[500px] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Array.isArray(allCategory) && allCategory.length > 0 ? (
            allCategory.map((category, index) => (
              <option value={category.name} key={index}>
                {category.name}
              </option>
            ))
          ) : (
            <option disabled>No categories found</option>
          )}
        </select>

        <label className="text-2xl font-bold text-blue-gray-600 mb-3 block">
          SubCategory
        </label>
        <select
          name="subcategory"
          value={selectedSubCategory}
          onChange={(e) => setSelectedSubCategory(e.target.value)}
          className="bg-gray-700 w-[500px] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Array.isArray(allSubCategory) && allSubCategory.length > 0 ? (
            allSubCategory.map((subcategory, index) => (
              <option value={subcategory.name} key={index}>
                {subcategory.name}
              </option>
            ))
          ) : (
            <option disabled>No subcategories found</option>
          )}
        </select>

        <button
          type="submit"
          className="mt-5 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProduct;
