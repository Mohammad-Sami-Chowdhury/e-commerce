const userSchema = require("../models/userSchema");

async function otpController(req, res) {
  const { email, otp } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    return res.status(404).json({
      error: "User is not found",
    });
  }
  if (user.isVerified) {
    return res.json({
      messege: "User is verified",
    });
  }
  if (user.otp === otp && user.otpExpires > Date.now()) {
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.json({
      messege: "User is verified",
    });
  }
  return res.json({
    error: "Otp is not valid or expired",
  });
}
module.exports = otpController;
