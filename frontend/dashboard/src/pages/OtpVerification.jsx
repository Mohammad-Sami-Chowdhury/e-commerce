import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get email from localStorage (set this after registration)
  const email = localStorage.getItem("pendingEmail") || "";

  const handleChange = (e) => {
    setOtp(e.target.value.replace(/\D/, ""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/authentication/otpverification",
        {
          otp,
          email, // send email with OTP
        }
      );
      if (res.data.error) {
        setError(res.data.error);
      } else {
        setMessage(res.data.message || "OTP verified successfully!");
      }
    } catch (err) {
      setError(err.response?.data?.error || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-md border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          OTP Verification
        </h2>
        {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
        {message && (
          <div className="mb-4 text-green-400 text-center">{message}</div>
        )}
        <div className="space-y-5">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              Enter the OTP sent to your email
            </label>
            <input
              className="w-full bg-[#4B5563] border-none px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white tracking-widest text-center text-lg"
              type="text"
              name="otp"
              maxLength={6}
              value={otp}
              onChange={handleChange}
              required
              autoFocus
              autoComplete="one-time-code"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading || otp.length < 4}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 shadow-lg disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </motion.div>
  );
};

export default OtpVerification;
