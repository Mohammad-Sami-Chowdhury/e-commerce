const { get } = require("mongoose");
const emailValidation = require("../helpers/emailValidation");
const emailVerification = require("../helpers/emailVerification");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

async function registrationController(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName) {
      return res.json({ error: "First name is required" });
    }
    if (!lastName) {
      return res.json({ error: "Last name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!emailValidation(email)) {
      return res.json({ error: "Email is not valid" });
    }
    if (!password) {
      return res.json({ error: "Password is required" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.json({ error: "Email already exists" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = new Date(Date.now() + 600000);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await user.save();

    emailVerification(email, otp);

    res.json({
      message: "Registration Successful!",
      status: "Success",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllUsersController(req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateUserRoleController(req, res) {
  try {
    const { userId, role } = req.body;

    if (!userId || !role) {
      return res.status(400).json({ error: "User ID and role are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = role;
    await user.save();

    res.json({ message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteUserController(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getSingleUserController(req, res) {
  try {
    const { userId } = req.params;
    console.log(userId);

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  registrationController,
  getAllUsersController,
  updateUserRoleController,
  deleteUserController,
  getSingleUserController,
};
