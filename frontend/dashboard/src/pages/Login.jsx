import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/authentication/login",
        form,
        {
          withCredentials: true,
        }
      );
      if (res.data.error) {
        setError(res.data.error);
      } else {
        console.log(res.data);
        localStorage.setItem("authToken", res.data.token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
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
          Login to Your Account
        </h2>
        {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
        <div className="space-y-5">
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
                placeholder="Enter your password"
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
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 shadow-lg disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <a href="/registration" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </form>
    </motion.div>
  );
};

export default Login;
