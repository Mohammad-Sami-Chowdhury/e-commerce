const bcrypt = require("bcrypt");
const userSchema = require("../models/userSchema");
const jwt = require("jsonwebtoken");

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    const token = jwt.sign(user.toObject(), process.env.JWT_SECRET);
    if (!user) {
      return res.status(400).json({ error: "User is not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.isAuth = true;
      req.session.user = {
        id: user.id,
        name: user.firstName,
        email: user.email,
        role: user.role,
      };
    }
    if (!isMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ error: "User is not verified" });
    }

    res.json({
      message: "Login Successful!",
      status: "Success",
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

function logout(req, res) {
  req.session.destroy(function (err) {
    if (err) {
      res.status(500).json({ error: "Something is error" });
    } else {
      res.status(200).json({ message: "Logout successful" });
    }
  });
}

function dashboard(req, res) {
  if (!req.session.isAuth) {
    return res.json({ error: "Unauthorized" });
  }
  if (req.session.user.role === "admin") {
    return res.json({
      message: `Welcome to the admin dashboard: ${req.session.user.name}`,
    });
  } else {
    return res.json({
      message: `Welcome to the user dashboard: ${req.session.user.name}`,
    });
  }
}

module.exports = { loginController, dashboard, logout };
