// src/pages/SellerDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Package,
  DollarSign,
  BadgeCheck,
  Smartphone,
  MapPin,
  Trash2,
  Edit3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import HorizontalAdsStrip from "../../components/HorizontalAdsStrip";
import Layout from "../../components/Layout";
import { BASE_URL } from "../../lib/axios";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Token ${token}` };

      // Fetch user
      const userRes = await axios.get(`${BASE_URL}marketplace/sellers/me/`, {
        headers,
      });

      // Fetch items
      const itemsRes = await axios.get(`${BASE_URL}marketplace/items/mine/`, {
        headers,
      });

      setUser(userRes.data);
      setItems(itemsRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard data.");
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`${BASE_URL}marketplace/items/${itemId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      toast.success("Item deleted successfully");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete item");
    }
  };

  const handleEdit = (itemId) => {
    navigate(`/dashboard/seller/items/edit/${itemId}`);
  };

  useEffect(() => {
    if (!token) navigate("/login/seller");
    fetchData();
  }, []);

  return (
    <Layout userType="seller">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Welcome,{" "}
          <span className="font-semibold text-orange-600 dark:text-orange-400">
            {user?.name || "Seller"}
          </span>
        </p>
      </header>

      <section className="mt-8 mb-6">
        <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
          Sponsored Ads / Promotions
        </h3>
        <HorizontalAdsStrip />
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <DashboardCard
          title="Total Items Listed"
          value={items.length}
          icon={<Package />}
          color="orange"
        />
        <DashboardCard
          title="Phone Number"
          value={user?.phone_number || "N/A"}
          icon={<Smartphone />}
          color="orange"
        />
        <DashboardCard
          title="Seller Badge"
          value={user?.is_verified ? "Verified" : "Unverified"}
          icon={<BadgeCheck />}
          color="orange"
        />
        <DashboardCard
          title="Earnings"
          value="Coming soon"
          icon={<DollarSign />}
          color="orange"
        />
        <DashboardCard
          title="Location"
          value={user?.location || "Not set"}
          icon={<MapPin />}
          color="orange"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Your Items
        </h2>
        {items.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            No items listed yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Price: Ksh {item.price}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-blue-600 dark:text-blue-400 flex items-center gap-1"
                  >
                    <Edit3 size={18} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 dark:text-red-400 flex items-center gap-1"
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

const DashboardCard = ({ title, value, icon, color }) => {
  const bgColor = {
    orange: "bg-orange-100 dark:bg-orange-900",
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

export default SellerDashboard;
