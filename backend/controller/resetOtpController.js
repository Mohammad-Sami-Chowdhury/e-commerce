const userSchema = require("../models/userSchema");
const crypto = require("crypto");
const emailVerification = require("../helpers/emailVerification");

async function resetOtpController(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = new Date(Date.now() + 600000);

    user.otp = otp;
    user.otpExpires = otpExpires;

    await user.save();

    emailVerification(user.email, otp);

    res.json({
      message: "OTP reset successful!",
      otpExpires: otpExpires,
    });
  } catch (error) {
    console.error("Error during OTP reset:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = resetOtpController;
