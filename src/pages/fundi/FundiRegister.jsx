import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  Phone,
  HardHat,
  Loader2,
  BadgeCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/axios";

const FundiRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    idNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters.");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      return toast.error("Phone number must be exactly 10 digits.");
    }

    if (!formData.idNumber.trim()) {
      return toast.error("ID number is required.");
    }

    const payload = {
      name: formData.fullName,
      phone_number: formData.phone,
      id_number: formData.idNumber,
      password: formData.password,
      role: "fundi",
    };

    try {
      setLoading(true);
      await api.post("/accounts/register/", payload);
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login/fundi"), 1500);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        Object.values(err.response?.data || {})[0] ||
        "Registration failed";
      toast.error(Array.isArray(message) ? message[0] : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 w-full">
        <div className="hidden md:flex items-center justify-center relative">
          <img
            src="/images/fundi2.png"
            alt="Fundi at work"
            className="rounded-2xl shadow-2xl w-full h-auto max-h-[600px] object-cover"
          />
          <div className="absolute bottom-0 left-20 bg-blue-700/90 text-white px-4 py-2 rounded-lg shadow-md">
            <p className="text-sm md:text-base font-semibold">
              Skilled. Reliable. Ready to Work.
            </p>
          </div>
        </div>

        <div className="w-full bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-6">
          <div className="flex justify-center">
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-3 rounded-full shadow-sm">
              <HardHat size={32} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 text-center">
            Register as a Fundi
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              icon={<User />}
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <Input
              icon={<Phone />}
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              icon={<BadgeCheck />}
              name="idNumber"
              placeholder="National ID Number"
              value={formData.idNumber}
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
                  className="text-blue-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
            <Input
              icon={<Lock />}
              name="confirmPassword"
              placeholder="Confirm Password"
              type={showConfirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              endIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="text-blue-600"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-lg font-medium text-white transition ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <span className="flex justify-center items-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  Registering...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login/fundi"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

// Reusable input component
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
    <span className="text-blue-600">{icon}</span>
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

export default FundiRegister;
