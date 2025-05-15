import { motion } from "framer-motion";
import { Edit, Search, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductsTable = () => {
  // State
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Category states
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    productImg: "",
    category: "",
    subCategory: "",
    color: "",
    ram: "",
    storage: "",
    stock: "",
  });

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch products
        const productsRes = await axios.get(
          "http://localhost:5000/api/v1/product/getallproduct"
        );
        setProducts(productsRes.data.data || productsRes.data || []);
        setFilteredProducts(productsRes.data.data || productsRes.data || []);

        // Fetch categories
        const categoriesRes = await axios.get(
          "http://localhost:5000/api/v1/category/getallcategory"
        );
        setCategories(categoriesRes.data.data || categoriesRes.data || []);

        // Fetch subcategories
        const subCategoriesRes = await axios.get(
          "http://localhost:5000/api/v1/subcategory/getallsubcategory"
        );
        setSubCategories(
          subCategoriesRes.data.data || subCategoriesRes.data || []
        );
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredProducts(
      products.filter(
        (product) =>
          product.name?.toLowerCase().includes(term) ||
          (typeof product.category === "object"
            ? product.category.name?.toLowerCase().includes(term)
            : product.category?.toLowerCase().includes(term))
      )
    );
  };

  // Form input change
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "productImg" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          productImg: reader.result, // Set the preview URL
        }));
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // When category changes, filter subcategories
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        category: categoryId,
        subCategory: "", // Reset subcategory when category changes
      });
    } else {
      setFormData({
        ...formData,
        category: categoryId,
        subCategory: "", // Reset subcategory when category changes
      });
    }
  };

  // Update product
  const handleUpdateProduct = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/product/updateproduct/${editingProduct._id}`,
        {
          ...editingProduct,
          price: Number(editingProduct.price),
          discountPrice: Number(editingProduct.discountPrice),
          stock: Number(editingProduct.stock),
        }
      );

      // Refresh data
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/product/getallproduct"
      );
      setProducts(data.data || data);
      setFilteredProducts(data.data || data);

      setEditingProduct(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product");
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/product/delete/${productId}`
      );

      // Refresh data
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/product/getallproduct"
      );
      setProducts(data.data || data);
      setFilteredProducts(data.data || data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
    }
  };

  // Render product image
  const renderProductImage = (imageUrl) => {
    if (!imageUrl) {
      return (
        <div className="size-10 rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-xs text-gray-400">No Image</span>
        </div>
      );
    }

    return (
      <img
        src={imageUrl}
        alt="Product"
        className="size-10 rounded-full object-cover"
      />
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-800 bg-opacity-50 text-red-200 p-4 rounded-lg">
        <h3 className="font-bold">Error</h3>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-3 py-1 bg-red-700 rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Product Table */}
      <motion.div
        className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">Product List</h2>

          {/* Search and Add */}
          <div className="flex items-center gap-2">
            {!isMobile || isSearchExpanded ? (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                {isMobile && (
                  <button
                    onClick={() => setIsSearchExpanded(false)}
                    className="absolute right-3 top-2.5 text-gray-400"
                  >
                    ✕
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsSearchExpanded(true)}
                className="p-2 rounded-full hover:bg-gray-700"
              >
                <Search size={20} className="text-gray-400" />
              </button>
            )}

            <Link
              to="/create-product"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg md:rounded-full md:px-4 md:flex md:items-center md:gap-2"
            >
              <Plus size={18} />
              <span className="hidden md:inline">Add Product</span>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                    {renderProductImage(product.image)}
                    <div>
                      <div>{product.name || "No Name"}</div>
                      <div className="text-gray-400 text-xs">
                        {product.category && typeof product.category === "object"
                          ? product.category.name
                          : product.category || "No Category"}
                        {product.subCategory &&
                          ` / ${
                            typeof product.subCategory === "object"
                              ? product.subCategory.name
                              : product.subCategory || "No Subcategory"
                          }`}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${product.price?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${product.discountPrice?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.stock || "0"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="text-indigo-400 hover:text-indigo-300 mr-2"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-100">
                Edit Product
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Product Information */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={editingProduct.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description*
                </label>
                <textarea
                  name="description"
                  value={editingProduct.description}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Price*
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={editingProduct.price}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Discount Price
                  </label>
                  <input
                    type="number"
                    name="discountPrice"
                    value={editingProduct.discountPrice}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Category Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-300">
                      Category*
                    </label>
                  </div>
                  <select
                    name="category"
                    value={
                      typeof editingProduct.category === "object"
                        ? editingProduct.category._id
                        : editingProduct.category
                    }
                    onChange={handleCategoryChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-300">
                      Subcategory
                    </label>
                  </div>
                  <select
                    name="subCategory"
                    value={
                      typeof editingProduct.subCategory === "object"
                        ? editingProduct.subCategory._id
                        : editingProduct.subCategory
                    }
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!editingProduct.category}
                  >
                    <option value="">Select Subcategory</option>
                    {subCategories
                      .filter(
                        (sub) =>
                          sub.category === editingProduct.category ||
                          (typeof sub.category === "object" &&
                            sub.category._id === editingProduct.category) ||
                          (typeof editingProduct.category === "object" &&
                            sub.category === editingProduct.category._id)
                      )
                      .map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={editingProduct.color}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    RAM
                  </label>
                  <input
                    type="text"
                    name="ram"
                    value={editingProduct.ram}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Storage
                  </label>
                  <input
                    type="text"
                    name="storage"
                    value={editingProduct.storage}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Stock*
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={editingProduct.stock}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Plus className="text-gray-400 mb-2" size={24} />
                    <p className="text-sm text-gray-400">
                      {formData.productImg ? "Change image" : "Upload image"}
                    </p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
                {editingProduct.productImg && (
                  <div className="relative mb-4">
                    <img
                      src={editingProduct.productImg}
                      alt="Preview"
                      className="size-16 object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/64";
                      }}
                    />
                    <button
                      onClick={() =>
                        setEditingProduct((prevEditingProduct) => ({
                          ...prevEditingProduct,
                          productImg: "",
                        }))
                      }
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full size-5 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  name="productImg"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 text-gray-300 hover:text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProduct}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
                disabled={
                  !editingProduct.name ||
                  !editingProduct.description ||
                  !editingProduct.price ||
                  !editingProduct.stock ||
                  !editingProduct.category
                }
              >
                Update Product
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
