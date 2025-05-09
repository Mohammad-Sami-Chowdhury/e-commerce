import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";

const CreateProduct = () => {
  const [allCategory, setAllcategory] = useState([]);
  const [allSubCategory, setAllSubcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/category/getallcategory")
      .then((res) => {
        setAllcategory(res.data.data || []); // Ensure it's an array
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });

    axios
      .get("http://localhost:5000/api/v1/subcategory/getallsubcategory")
      .then((res) => {
        // Debug the response
        setAllSubcategory(res.data.data || []); // Ensure it's an array
      })
      .catch((err) => {
        console.error("Error fetching subcategories:", err);
      });
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const categoryId = allCategory.find(
      (category) => category.name == selectedCategory
    );
    const subCategoryId = allSubCategory.find(
      (subcategory) => subcategory.name == selectedSubCategory
    );

    const formData = new FormData();

    formData.append("name", e.target.name.value);
    formData.append("description", e.target.description.value);
    formData.append("price", e.target.price.value);
    formData.append("discount", e.target.discount.value);
    formData.append("ram", e.target.ram.value);
    formData.append("storage", e.target.storage.value);
    formData.append("color", e.target.color.value);
    formData.append("stock", e.target.stock.value);
    formData.append("category", categoryId._id);
    formData.append("subCategory", subCategoryId._id);
    console.log(categoryId._id, subCategoryId._id);
    console.log(formData.append("name", e.target.name.value));
    
    // if (e.target.image.files[0]) {
    //   formData.append("image", e.target.image.files[0]);
    // }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/product/createproduct",
        console.log(formData), 
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
      console.log(res.data.message);
    } catch (error) {
      console.log(error.response?.data?.error || "An error occurred");
    }
  };
  return (
    <div className="w-full flex items-center justify-center overflow-y-scroll">
      <motion.div
        className=" backdrop-blur-md  rounded-xl p-8 w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Product
        </h2>
        <form onSubmit={handleCreateProduct} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
              rows="3"
            />
          </div>

          {/* Price and Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Discount Price
              </label>
              <input
                type="number"
                name="discount"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter discount price"
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter stock quantity"
            />
          </div>

          {/* RAM and Storage and color */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Ram
            </label>
            <input
              type="number"
              name="ram"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter ram quantity"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="storage"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter storage quantity"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="color"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter storage quantity"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Select a category</option>
              {Array.isArray(allCategory) &&
                allCategory.map((category, index) => (
                  <option value={category.name} key={index}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          {/* SubCategory Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              SubCategory
            </label>
            <select
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              name="subCategory"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Select a subcategory</option>
              {Array.isArray(allSubCategory) &&
                allSubCategory.map((Subcategory, index) => (
                  <option value={Subcategory.name} key={index}>
                    {Subcategory.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Image Upload */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Product Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Product
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateProduct;
