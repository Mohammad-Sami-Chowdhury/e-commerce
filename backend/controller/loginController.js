const bcrypt = require("bcrypt");
const userSchema = require("../models/userSchema");

async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User is not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ error: "User is not verified" });
    }

    res.json({
      message: "Login Successful!",
      status: "Success",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = loginController;
