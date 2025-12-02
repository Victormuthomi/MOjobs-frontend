import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HardHat, Check, Phone, MapPin, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import SellerSidebar from "../../components/SellerSidebar";
import axios, { BASE_URL } from "../../lib/axios"; // <-- Use axios

const SellerProfileUpdate = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    location: "",
    is_verified: false,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}accounts/sellers/me/`, {
          headers: { Authorization: `Token ${token}` },
        });

        setFormData({
          name: res.data.name || "",
          phone_number: res.data.phone_number || "",
          location: res.data.location || "",
          is_verified: res.data.is_verified || false,
        });
      } catch {
        toast.error("Failed to load profile.");
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${BASE_URL}accounts/sellers/me/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Profile updated successfully!");
      navigate("/dashboard/seller");
    } catch {
      toast.error("Update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SellerSidebar />

      <main className="flex-1 p-6 flex justify-center items-center">
        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12">
          <div className="hidden md:flex items-center justify-center relative">
            <img
              src="/images/seller-update.png"
              alt="Seller update"
              className="rounded-2xl shadow-2xl w-full h-auto max-h-[600px] object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-orange-700/90 text-white px-4 py-2 rounded-lg shadow-md">
              <p className="text-sm md:text-base font-semibold">
                Update your profile to get more clients!
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
              Update Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                icon={<Check />}
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                icon={<Phone />}
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
              />
              <Input
                icon={<MapPin />}
                name="location"
                placeholder="Location (e.g. Nairobi)"
                value={formData.location}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-lg font-medium text-white transition ${
                  loading
                    ? "bg-orange-400"
                    : "bg-orange-600 hover:bg-orange-700"
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
      </main>
    </div>
  );
};

// Input Component
const Input = ({ icon, name, placeholder, value, onChange }) => (
  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
    <span className="text-orange-600 dark:text-orange-300">{icon}</span>
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

export default SellerProfileUpdate;
