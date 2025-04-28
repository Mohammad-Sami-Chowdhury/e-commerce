const express = require("express");
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../../controller/userController");
const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");

const route = express.Router();

// Route to get all users (admin access only)
route.get("/getallusers", authMiddleware, roleMiddleware("admin"), getAllUsers);

// Route to update user role (admin access only)
route.put("/updateuserrole", authMiddleware, roleMiddleware("admin"), updateUserRole);

// Route to delete a user (admin access only)
route.delete("/deleteuser/:userId", authMiddleware, roleMiddleware("admin"), deleteUser);

module.exports = route;