import React, { useEffect, useState } from "react";
import { CheckCircle, Shield, XCircle, Phone, Star, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "../../lib/axios";
import toast from "react-hot-toast";
import FundiSidebar from "../../components/FundiSidebar"; // ✅ import sidebar

const FundiDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const res = await axios.get("/accounts/fundis/me/", {
        headers: { Authorization: `Token ${token}` },
      });
      setProfile(res.data);
      setUserData({
        name: res.data.name || "Fundi",
        is_active: res.data.is_active,
        subscription_end: res.data.subscription_end,
      });
    } catch (err) {
      toast.error("Could not load dashboard. Please try again.");
    }
  };

  useEffect(() => {
    if (!token) navigate("/fundi/login");
    fetchData();
  }, []);

  const handleToggle = async () => {
    const newValue = !profile?.is_available;
    setProfile((prev) => ({ ...prev, is_available: newValue }));

    try {
      await axios.put(
        "/accounts/fundis/me/",
        { is_available: newValue },
        { headers: { Authorization: `Token ${token}` } },
      );
      toast.success(
        `You are now marked as ${newValue ? "available" : "not available"}`,
      );
    } catch (err) {
      setProfile((prev) => ({ ...prev, is_available: !newValue }));
      toast.error("Failed to update availability");
    }
  };

  const isProfileIncomplete = !profile?.skills || !profile?.location;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* ✅ Reusable Sidebar */}
      <FundiSidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Welcome,{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {userData?.name}
            </span>
          </p>
        </header>

        {/* Ads Banner */}
        <div className="mt-8 mb-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-l-4 border-blue-500 px-6 py-4 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold">Coming Soon: Business Ads</h3>
          <p className="text-sm mt-1">
            This section will showcase ads from clients such as hardware stores
            and service providers near you.
          </p>
        </div>

        {/* Subscription Info */}
        <div className="mb-6">
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
              userData?.is_active
                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
            }`}
          >
            Subscription: {userData?.is_active ? "Active" : "Inactive"}
          </span>
          {userData?.subscription_end && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {new Date(userData.subscription_end) > new Date()
                ? "Expires on: "
                : "Expired on: "}
              <strong className="text-gray-900 dark:text-white">
                {new Date(userData.subscription_end).toLocaleDateString(
                  "en-KE",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                )}
              </strong>
            </p>
          )}
        </div>

        {/* Incomplete Profile Alert */}
        {isProfileIncomplete && (
          <div className="bg-yellow-100 dark:bg-yellow-800 border-l-4 border-yellow-500 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-3 text-yellow-700 dark:text-yellow-200">
              <XCircle />
              <p>
                Please complete your profile (add <strong>skills</strong> and{" "}
                <strong>location</strong>) to appear on the fundis page.
              </p>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Your Skills"
            value={profile?.skills || "N/A"}
            icon={<CheckCircle />}
            color="blue"
          />
          <DashboardCard
            title="Location"
            value={profile?.location || "N/A"}
            icon={<Shield />}
            color="green"
          />
          <DashboardCard
            title="Phone Number"
            value={profile?.phone_number || "N/A"}
            icon={<Phone />}
            color="indigo"
          />
          <DashboardCard
            title="Contact Visibility"
            value={profile?.show_contact ? "Visible" : "Hidden"}
            icon={<User />}
            color="indigo"
          />
          <DashboardCard
            title="Rate Note"
            value={profile?.rate_note || "No rate added yet."}
            icon={<Star />}
            color="green"
          />
          <DashboardCard
            title="Are you available for work?"
            icon={<CheckCircle />}
            color="blue"
            value={
              <div className="flex items-center gap-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={profile?.is_available || false}
                    onChange={handleToggle}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-green-500 transition duration-300"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-full transition duration-300"></div>
                </label>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {profile?.is_available ? "Yes, I am!" : "No, I’m not"}
                </span>
              </div>
            }
          />
        </div>
      </main>
    </div>
  );
};

const DashboardCard = ({ title, value, icon, color }) => {
  const bgColor = {
    blue: "bg-blue-100 dark:bg-blue-900",
    green: "bg-green-100 dark:bg-green-900",
    indigo: "bg-indigo-100 dark:bg-indigo-900",
  }[color];

  return (
    <div className={`p-6 rounded-xl shadow ${bgColor}`}>
      <div className="flex items-center gap-3 mb-3 text-xl font-semibold text-gray-800 dark:text-white">
        {icon}
        <span>{title}</span>
      </div>
      <div className="text-gray-700 dark:text-gray-300 text-lg">{value}</div>
    </div>
  );
};

export default FundiDashboard;
