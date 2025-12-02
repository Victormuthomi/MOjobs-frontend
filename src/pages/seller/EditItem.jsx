import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios, { BASE_URL } from "../../lib/axios"; // <-- Use axios

import {
  Tag,
  Text,
  DollarSign,
  Smartphone,
  Loader2,
  HardHat,
  CreditCard,
} from "lucide-react";
import SellerSidebar from "../../components/SellerSidebar";

const categories = ["Other", "Electronics", "Tools", "Fashion", "Books"];

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Other",
    price: "",
    contact_call: "",
    mpesa_ref: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchItem = async () => {
    try {
      const res = await axios.get(`${BASE_URL}marketplace/items/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });

      const { title, description, category, price, contact_call, mpesa_ref } =
        res.data;
      setForm({ title, description, category, price, contact_call, mpesa_ref });
    } catch (err) {
      toast.error("Failed to fetch item details");
      navigate("/dashboard/seller/items");
    }
  };

  useEffect(() => {
    if (!token) navigate("/login/seller");
    fetchItem();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(`${BASE_URL}marketplace/items/${id}/`, form, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Item updated successfully!");
      navigate("/dashboard/seller/items");
    } catch (err) {
      toast.error("Failed to update item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <SellerSidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-10">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-6 sm:p-10">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 p-3 rounded-full shadow-md mb-3">
              <HardHat size={36} />
            </div>
            <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 text-center">
              Edit Item
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
              Update your item listing to attract more buyers
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Input
              icon={<Tag />}
              name="title"
              placeholder="Item Name"
              value={form.title}
              onChange={handleChange}
            />
            <Select
              icon={<Tag />}
              name="category"
              value={form.category}
              onChange={handleChange}
              options={categories}
            />
            <Input
              icon={<Text />}
              name="description"
              placeholder="Item Description"
              value={form.description}
              onChange={handleChange}
              textarea
              className="md:col-span-2"
            />
            <Input
              icon={<DollarSign />}
              name="price"
              placeholder="Price (Ksh)"
              value={form.price}
              onChange={handleChange}
            />
            <Input
              icon={<Smartphone />}
              name="contact_call"
              placeholder="Phone Number"
              value={form.contact_call}
              onChange={handleChange}
            />
            <Input
              icon={<CreditCard />}
              name="mpesa_ref"
              placeholder="MPESA Reference (optional)"
              value={form.mpesa_ref}
              onChange={handleChange}
            />
            <div className="md:col-span-2">
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
                    Updating...
                  </span>
                ) : (
                  "Update Item"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

const Input = ({
  icon,
  name,
  placeholder,
  value,
  onChange,
  textarea = false,
  className = "",
}) => (
  <div
    className={`flex items-start gap-3 bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg ${className}`}
  >
    <span className="text-green-600 mt-1">{icon}</span>
    {textarea ? (
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full bg-transparent outline-none text-gray-800 dark:text-white resize-none"
      />
    ) : (
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
      />
    )}
  </div>
);

const Select = ({ icon, name, value, onChange, options }) => (
  <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg">
    <span className="text-green-600">{icon}</span>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default EditItem;
