import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Registration = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/authentication/registration",
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        }
      );
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success(res.data.message || "Registration successful!");
        localStorage.setItem("pendingEmail", form.email);
        setTimeout(() => {
          navigate("/otpverification");
        }, 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <motion.div
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-md border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Create Your Account
        </h2>
        <div className="space-y-5">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              First Name
            </label>
            <input
              className="w-full bg-[#4B5563] border-none px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              Last Name
            </label>
            <input
              className="w-full bg-[#4B5563] border-none px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              Email Address
            </label>
            <input
              className="w-full bg-[#4B5563] border-none px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full bg-[#4B5563] border-none px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white pr-10"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              Confirm Password
            </label>
            <input
              className="w-full bg-[#4B5563] border-none px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 shadow-lg"
        >
          Register
        </button>
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </form>
    </motion.div>
  );
};

export default Registration;
