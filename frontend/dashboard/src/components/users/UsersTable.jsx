import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Edit, Trash2 } from "lucide-react";
import axios from "axios";

const UsersTable = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [editingUser, setEditingUser] = useState(null); // State for editing user
  const [newRole, setNewRole] = useState(""); // State for new role

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/users/getallusers"
        );

        console.log("Full API Response:", data);

        const receivedData = data.data || data;

        if (!Array.isArray(receivedData)) {
          throw new Error("Invalid data format received from server");
        }
        const usersArray = receivedData.map((user) => ({
          _id: user._id,
          name: user.firstName || "No Name",
          email: user.email || "No Email",
          role: user.role || "user",
          status: user.status || "active",
        }));

        setUsers(usersArray);
        setFilteredUsers(usersArray);
      } catch (err) {
        console.error("Error details:", err);
        setError(err.message || "Failed to fetch users");
        if (!err.response) {
          setError("Network error - Please check your internet connection");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      )
    );
  };

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/users/deleteuser/${userId}`
      );
      setUsers(users.filter((user) => user._id !== userId));
      setFilteredUsers(filteredUsers.filter((user) => user._id !== userId));
      alert("User deleted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  // Handle edit user role
  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewRole(user.role); // Initialize with the current role
  };

  // Save updated role
  const handleSaveRole = async () => {
    try {
      await axios.patch("http://localhost:5000/api/v1/users/updateuserrole", {
        userId: editingUser._id,
        role: newRole,
      });

      const updatedUsers = users.map((user) =>
        user._id === editingUser._id ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setEditingUser(null);
      alert("User role updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update user role");
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
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Users</h2>

        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex gap-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
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

      {/* Edit Role Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-100">
                Edit Role for {editingUser.name}
              </h3>
              <button
                onClick={() => setEditingUser(null)}
                className="text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Role
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 text-gray-300 hover:text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRole}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default UsersTable;
