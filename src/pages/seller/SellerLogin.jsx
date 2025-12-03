import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Phone, HardHat, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios, { BASE_URL } from "../../lib/axios";

const SellerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ phone_number: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.phone_number)) {
      return toast.error("Phone number must be exactly 10 digits.");
    }

    try {
      setLoading(true);

      // 🔐 Login using Axios
      const res = await axios.post(
        `${BASE_URL}accounts/login/`,
        {
          phone_number: formData.phone_number,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user_type", "seller");

      // 👤 Fetch seller profile
      const profileRes = await axios.get(`${BASE_URL}accounts/sellers/me/`, {
        headers: { Authorization: `Token ${token}` },
      });

      const profile = profileRes.data;
      const isIncomplete = !profile.location;

      toast.success("Login successful! Redirecting...");

      setTimeout(() => {
        if (isIncomplete) {
          navigate("/profile/update/seller");
        } else {
          navigate("/dashboard/seller");
        }
      }, 1000);
    } catch (err) {
      const message =
        err?.response?.data?.error ??
        Object.values(err?.response?.data || {})[0] ??
        err?.message ??
        "Login failed";
      toast.error(Array.isArray(message) ? message[0] : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 w-full">
        <div className="hidden md:flex items-center justify-center relative">
          <img
            src="/images/seller2.png"
            alt="Seller working"
            className="rounded-2xl shadow-2xl w-full h-auto max-h-[600px] object-cover"
          />
          <div className="absolute bottom-6 left-28 bg-orange-700/90 text-white px-4 py-2 rounded-lg shadow-md">
            <p className="text-sm md:text-base font-semibold">
              Welcome back, Seller!
            </p>
          </div>
        </div>

        <div className="w-full bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-6">
          <div className="flex justify-center">
            <div className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 p-3 rounded-full shadow-sm">
              <HardHat size={32} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-orange-700 dark:text-orange-400 text-center">
            Seller Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              icon={<Phone />}
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
            />
            <Input
              icon={<Lock />}
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              endIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-orange-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-lg font-medium text-white transition ${
                loading ? "bg-orange-400" : "bg-orange-600 hover:bg-orange-700"
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
              to="/register/seller"
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              Register
            </Link>
          </p>
          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
            Forgot Password?{" "}
            <Link
              to="/reset-password/seller"
              className="text-orange-600 hover:underline dark:text-orange-400"
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
}) => (
  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
    <span className="text-orange-600">{icon}</span>
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

export default SellerLogin;
