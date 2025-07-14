import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HardHat,
  BadgeCheck,
  Shield,
  Phone,
  ClipboardList,
  Loader2,
} from "lucide-react";
import axios from "../../lib/axios";
import toast from "react-hot-toast";
import ClientSidebar from "../../components/ClientSidebar";

const ClientProfileUpdate = () => {
  const [formData, setFormData] = useState({
    name: "",
    id_number: "",
    phone_number: "",
    role_note: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/accounts/clients/me/", {
          headers: { Authorization: `Token ${token}` },
        });

        setFormData({
          name: res.data.name || "",
          id_number: res.data.id_number || "",
          phone_number: res.data.phone_number || "",
          role_note: res.data.client_profile?.role_note || "",
        });
      } catch {
        toast.error("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        "/accounts/clients/me/",
        {
          name: formData.name,
          id_number: formData.id_number,
          phone_number: formData.phone_number,
          client_profile: {
            role_note: formData.role_note,
          },
        },
        { headers: { Authorization: `Token ${token}` } },
      );
      toast.success("Profile updated successfully!");
      navigate("/dashboard/client");
    } catch {
      toast.error("Update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sidebar */}
      <ClientSidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 w-full">
          {/* Left image */}
          <div className="hidden md:flex items-center justify-center relative">
            <img
              src="/images/client4.png"
              alt="Client update"
              className="rounded-2xl shadow-2xl w-full h-auto max-h-[600px] object-cover"
            />
            <div className="absolute bottom-6 left-28 bg-green-700/90 text-white px-4 py-2 rounded-lg shadow-md">
              <p className="text-sm md:text-base font-semibold">
                Keep your profile updated!
              </p>
            </div>
          </div>

          {/* Right form */}
          <div className="w-full bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 space-y-6">
            <div className="flex justify-center">
              <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 p-3 rounded-full shadow-sm">
                <HardHat size={32} />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 text-center">
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
                icon={<Phone />}
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
              />
              <Input
                icon={<ClipboardList />}
                name="role_note"
                placeholder="Role Note (e.g. Contractor, Business Owner)"
                value={formData.role_note}
                onChange={handleChange}
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
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

// Reusable Input component
const Input = ({ icon, name, placeholder, value, onChange }) => (
  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
    <span className="text-green-600">{icon}</span>
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

export default ClientProfileUpdate;
