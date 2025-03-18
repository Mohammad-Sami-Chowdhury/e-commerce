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

module.exports = registrationController;
