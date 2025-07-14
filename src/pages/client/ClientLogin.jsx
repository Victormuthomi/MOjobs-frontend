import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Phone, Users, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/axios";

const ClientLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.phone)) {
      return toast.error("Phone number must be exactly 10 digits.");
    }

    try {
      setLoading(true);
      const res = await api.post("/accounts/clients/login/", {
        phone_number: formData.phone,
        password: formData.password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user_type", "client");

      toast.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard/client"), 1500);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        Object.values(err.response?.data || {})[0] ||
        "Login failed";
      toast.error(Array.isArray(message) ? message[0] : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 w-full">
        <div className="hidden md:flex items-center justify-center relative">
          <img
            src="/images/client2.png"
            alt="Client"
            className="rounded-2xl shadow-2xl w-full h-auto max-h-[600px] object-cover"
          />
          <div className="absolute bottom-0 left-28 bg-green-700/90 text-white px-4 py-2 rounded-lg shadow-md">
            <p className="text-sm md:text-base font-semibold">
              Welcome back, Client!
            </p>
          </div>
        </div>

        <div className="w-full bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-6">
          <div className="flex justify-center">
            <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 p-3 rounded-full shadow-sm">
              <Users size={32} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 text-center">
            Client Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              icon={<Phone />}
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              theme="green"
            />
            <Input
              icon={<Lock />}
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              theme="green"
              endIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-green-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-lg font-medium text-white transition ${
                loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? (
                <span className="flex justify-center items-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
            Don’t have an account?{" "}
            <Link
              to="/register/client"
              className="text-green-600 hover:underline dark:text-green-400"
            >
              Register
            </Link>
          </p>

          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
            Forgot Password?{" "}
            <Link
              to="/reset-password/client"
              className="text-green-600 hover:underline dark:text-green-400"
            >
              Reset
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

const Input = ({
  icon,
  endIcon,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  theme = "green",
}) => {
  const themeColor = theme === "green" ? "text-green-600" : "text-blue-600";
  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
      <span className={themeColor}>{icon}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
      />
      {endIcon}
    </div>
  );
};

export default ClientLogin;
