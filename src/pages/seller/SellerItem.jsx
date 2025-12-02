import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import SellerSidebar from "../../components/SellerSidebar";
import { BASE_URL } from "../../lib/axios";

const SellerItemsPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${BASE_URL}marketplace/items/mine/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch items.");
    } finally {
      setLoading(false);
    }
  };

  const toggleItemStatus = async (itemId, currentStatus) => {
    try {
      await axios.patch(
        `${BASE_URL}marketplace/items/${itemId}/`,
        { is_active: !currentStatus },
        { headers: { Authorization: `Token ${token}` } }
      );
      toast.success("Item status updated");
      fetchItems();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update item status");
    }
  };

  const deleteItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`${BASE_URL}marketplace/items/${itemId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      toast.success("Item deleted successfully");
      fetchItems();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete item");
    }
  };

  const editItem = (itemId) => {
    navigate(`/seller/items/edit/${itemId}`);
  };

  useEffect(() => {
    if (!token) navigate("/login/seller");
    fetchItems();
  }, []);

  if (loading)
    return (
      <p className="p-6 text-center text-gray-700 dark:text-gray-300">
        Loading items...
      </p>
    );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SellerSidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          My Items
        </h1>

        {items.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            You have no items listed yet.
          </p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Price: Ksh {item.price} | Stock: {item.stock || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Status:{" "}
                    <span className="font-medium">
                      {item.is_active ? "Active" : "Inactive"}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleItemStatus(item.id, item.is_active)}
                    className="text-orange-600 dark:text-orange-400"
                    title="Toggle Active/Inactive"
                  >
                    {item.is_active ? (
                      <ToggleRight size={24} />
                    ) : (
                      <ToggleLeft size={24} />
                    )}
                  </button>
                  <button
                    onClick={() => editItem(item.id)}
                    className="text-blue-600 dark:text-blue-400"
                    title="Edit Item"
                  >
                    <Edit2 size={24} />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-600 dark:text-red-400"
                    title="Delete Item"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SellerItemsPage;
