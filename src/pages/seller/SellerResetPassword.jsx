import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Phone, BadgeCheck, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Http } from "@capacitor-community/http"; // Updated plugin
import { BASE_URL } from "../../lib/axios"; // Use your backend BASE_URL

const SellerResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone_number: "",
    id_number: "",
    new_password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.phone_number)) {
      return toast.error("Phone number must be exactly 10 digits.");
    }

    if (formData.new_password !== formData.confirm_password) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      await Http.request({
        method: "POST",
        url: `${BASE_URL}accounts/reset-password/`,
        headers: { "Content-Type": "application/json" },
        data: {
          phone_number: formData.phone_number,
          id_number: formData.id_number,
          new_password: formData.new_password,
        },
      });

      toast.success("Password reset successful! You can now log in.");
      setTimeout(() => navigate("/login/seller"), 1500);
    } catch (err) {
      const message = err?.message || "Reset failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 w-full">
        {/* Image */}
        <div className="hidden md:flex items-center justify-center relative">
          <img
            src="/images/seller-reset.png"
            alt="Seller working"
            className="rounded-2xl shadow-2xl w-full h-auto max-h-[600px] object-cover"
          />
          <div className="absolute bottom-6 left-24 bg-orange-700/90 text-white px-4 py-2 rounded-lg shadow-md">
            <p className="text-sm md:text-base font-semibold">
              Forgot your password?
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="w-full bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-6">
          <div className="flex justify-center">
            <div className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 p-3 rounded-full shadow-sm">
              <BadgeCheck size={32} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-orange-700 dark:text-orange-400 text-center">
            Reset Seller Password
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
              icon={<BadgeCheck />}
              name="id_number"
              placeholder="ID Number"
              value={formData.id_number}
              onChange={handleChange}
            />
            <Input
              icon={<Lock />}
              name="new_password"
              placeholder="New Password"
              type={showPassword ? "text" : "password"}
              value={formData.new_password}
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
            <Input
              icon={<Lock />}
              name="confirm_password"
              placeholder="Confirm New Password"
              type={showPassword ? "text" : "password"}
              value={formData.confirm_password}
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
                  Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
            Remember your password?{" "}
            <Link
              to="/login/seller"
              className="text-orange-600 hover:underline dark:text-orange-400"
            >
              Go to login
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

export default SellerResetPassword;
