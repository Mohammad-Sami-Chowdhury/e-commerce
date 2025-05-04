import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Plus, Edit } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const CategoryPage = () => {
  // State for categories and subcategories
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals and editing states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSubCategory, setEditingSubCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

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

  // Add or update category
  const handleAddOrUpdateCategory = async (category) => {
    try {
      if (category._id) {
        // Update category
        const { data } = await axios.patch(
          `http://localhost:5000/api/v1/category/updatecategory/${category._id}`,
          category
        );
        setCategories((prev) =>
          prev.map((cat) =>
            cat._id === category._id ? data.data || data : cat
          )
        );
        toast.success("Category updated successfully!");
      } else {
        // Add category
        const { data } = await axios.post(
          "http://localhost:5000/api/v1/category/createcategory",
          category
        );
        setCategories([...categories, data.data || data]);
      }
      setShowCategoryModal(false);
      setEditingCategory(null);
      toast.success("Category created successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save category");
      toast.error("There was a problem!");
    }
  };

  // Add or update subcategory
  const handleAddOrUpdateSubCategory = async (subCategory) => {
    try {
      if (subCategory._id) {
        // Update subcategory
        const { data } = await axios.patch(
          `http://localhost:5000/api/v1/subcategory/updatesubcategory/${subCategory._id}`,
          subCategory
        );
        setSubCategories((prev) =>
          prev.map((sub) =>
            sub._id === subCategory._id ? data.data || data : sub
          )
        );
        toast.success("Subcategory updated successfully!");
      } else {
        // Add subcategory
        const { data } = await axios.post(
          "http://localhost:5000/api/v1/subcategory/createsubcategory",
          subCategory
        );
        setSubCategories([...subCategories, data.data || data]);
      }
      setShowSubCategoryModal(false);
      setEditingSubCategory(null);
      toast.success("Subcategory updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save subcategory");
      toast.error("There was a problem!");
    }
  };

  // Delete category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/category/deletecategory/${categoryId}`
      );
      setCategories(categories.filter((cat) => cat._id !== categoryId));
      toast.success("Category deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete category");
      toast.error("There was a problem!");
    }
  };

  // Delete subcategory
  const handleDeleteSubCategory = async (subCategoryId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/subcategory/deletesubcategory/${subCategoryId}`
      );
      setSubCategories(
        subCategories.filter((sub) => sub._id !== subCategoryId)
      );
      toast.success("Subcategory deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete subcategory");
      toast.error("There was a problem!");
    }
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
    <div className="p-6 bg-gray-900 text-gray-100 rounded-lg">
      <Toaster />
      {/* Categories Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Categories</h2>
          <button
            onClick={() => {
              setEditingCategory(null);
              setShowCategoryModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>

        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {category.description || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingCategory(category);
                          setShowCategoryModal(true);
                        }}
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Subcategories Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Subcategories</h2>
          <button
            onClick={() => {
              setEditingSubCategory(null);
              setShowSubCategoryModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} />
            Add Subcategory
          </button>
        </div>

        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Parent Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {subCategories.map((subCategory) => (
                  <tr key={subCategory._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {subCategory.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {subCategory.description || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {typeof subCategory.category === "object"
                        ? subCategory.category.name
                        : categories.find(
                            (category) => category._id === subCategory.category
                          )?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingSubCategory(subCategory);
                          setShowSubCategoryModal(true);
                        }}
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteSubCategory(subCategory._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-100">
                {editingCategory ? "Edit Category" : "Add Category"}
              </h3>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name*
                </label>
                <input
                  type="text"
                  value={editingCategory?.name || ""}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={editingCategory?.description || ""}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="px-4 py-2 text-gray-300 hover:text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddOrUpdateCategory(editingCategory)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
                disabled={!editingCategory?.name}
              >
                {editingCategory ? "Update Category" : "Create Category"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Subcategory Modal */}
      {showSubCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-100">
                {editingSubCategory ? "Edit Subcategory" : "Add Subcategory"}
              </h3>
              <button
                onClick={() => setShowSubCategoryModal(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name*
                </label>
                <input
                  type="text"
                  value={editingSubCategory?.name || ""}
                  onChange={(e) =>
                    setEditingSubCategory({
                      ...editingSubCategory,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={editingSubCategory?.description || ""}
                  onChange={(e) =>
                    setEditingSubCategory({
                      ...editingSubCategory,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Parent Category*
                </label>
                <select
                  value={editingSubCategory?.category || ""}
                  onChange={(e) =>
                    setEditingSubCategory({
                      ...editingSubCategory,
                      category: e.target.value,
                    })
                  }
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowSubCategoryModal(false)}
                className="px-4 py-2 text-gray-300 hover:text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddOrUpdateSubCategory(editingSubCategory)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
                disabled={
                  !editingSubCategory?.name || !editingSubCategory?.category
                }
              >
                {editingSubCategory
                  ? "Update Subcategory"
                  : "Create Subcategory"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
