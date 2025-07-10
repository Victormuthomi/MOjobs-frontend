import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HardHat,
  Check,
  Shield,
  MapPin,
  ClipboardList,
  BadgeCheck,
  Loader2,
} from "lucide-react";
import axios from "../../lib/axios";
import toast from "react-hot-toast";

const FundiProfileUpdate = () => {
  const [formData, setFormData] = useState({
    name: "",
    id_number: "",
    skills: "",
    location: "",
    is_available: false,
    show_contact: false,
    rate_note: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/accounts/fundis/me/", {
          headers: { Authorization: `Token ${token}` },
        });

        setFormData({
          name: res.data.name || "",
          id_number: res.data.id_number || "",
          skills: res.data.skills || "",
          location: res.data.location || "",
          is_available: res.data.is_available || false,
          show_contact: res.data.show_contact || false,
          rate_note: res.data.rate_note || "",
        });
      } catch {
        toast.error("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        "/accounts/fundis/me/",
        { ...formData },
        { headers: { Authorization: `Token ${token}` } },
      );
      toast.success("Profile updated successfully!");
      navigate("/dashboard/fundi");
    } catch {
      toast.error("Update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 w-full">
        {/* Left image */}
        <div className="hidden md:flex items-center justify-center relative">
          <img
            src="/images/fundi4.png"
            alt="Fundi update"
            className="rounded-2xl shadow-2xl w-full h-auto max-h-[600px] object-cover"
          />
          <div className="absolute bottom-6 left-28 bg-blue-700/90 text-white px-4 py-2 rounded-lg shadow-md">
            <p className="text-sm md:text-base font-semibold">
              Update your profile to get more clients!
            </p>
          </div>
        </div>

        {/* Right form */}
        <div className="w-full bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-6">
          <div className="flex justify-center">
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 p-3 rounded-full shadow-sm">
              <HardHat size={32} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 text-center">
            Update Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              icon={<BadgeCheck />}
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              icon={<Shield />}
              name="id_number"
              placeholder="ID Number"
              value={formData.id_number}
              onChange={handleChange}
            />
            <Input
              icon={<ClipboardList />}
              name="skills"
              placeholder="Skills (e.g. Masonry, Plumbing)"
              value={formData.skills}
              onChange={handleChange}
            />
            <Input
              icon={<MapPin />}
              name="location"
              placeholder="Location (e.g. Nairobi)"
              value={formData.location}
              onChange={handleChange}
            />
            <Input
              icon={<Check />}
              name="rate_note"
              placeholder="Rate Note (e.g. Ksh 1500/day)"
              value={formData.rate_note}
              onChange={handleChange}
            />

            <Checkbox
              label="Available for Work"
              name="is_available"
              checked={formData.is_available}
              onChange={handleChange}
            />
            <Checkbox
              label="Show My Contact"
              name="show_contact"
              checked={formData.show_contact}
              onChange={handleChange}
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
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Reusable Input component
const Input = ({ icon, name, placeholder, value, onChange }) => (
  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
    <span className="text-blue-600">{icon}</span>
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      required
      value={value}
      onChange={onChange}
      className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
    />
  </div>
);

// Reusable Checkbox
const Checkbox = ({ label, name, checked, onChange }) => (
  <label className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 dark:bg-gray-700"
    />
    {label}
  </label>
);

export default FundiProfileUpdate;
