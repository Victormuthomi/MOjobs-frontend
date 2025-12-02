// src/pages/seller/AddItem.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tag,
  Text,
  Map,
  Loader2,
  DollarSign,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import SellerSidebar from "../../components/SellerSidebar";
import axios, { BASE_URL } from "../../lib/axios.js"; // Use axios instead of Capacitor HTTP

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dl9gg14cz/upload";
const CLOUDINARY_UPLOAD_PRESET = "MOjobs";
const SEND_MONEY = "07 102 102 58";

const CATEGORY_CHOICES = [
  { value: "clothes", label: "Clothes" },
  { value: "electronics", label: "Electronics" },
  { value: "furniture", label: "Furniture" },
  { value: "services", label: "Services" },
  { value: "tools", label: "Tools" },
  { value: "agriculture", label: "Agriculture" },
  { value: "food", label: "Food & Beverages" },
  { value: "books", label: "Books & Stationery" },
  { value: "other", label: "Other" },
];

const AddItem = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    image: null,
    mpesa_ref: "",
    id: null,
    fee: 0,
    fee_type: "",
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: details, 2: payment

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setForm({ ...form, image: files[0] });
    else setForm({ ...form, [name]: value });
  };

  // Upload image to Cloudinary
  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(CLOUDINARY_URL, { method: "POST", body: data });
    const result = await res.json();
    if (!res.ok)
      throw new Error(result.error?.message || "Image upload failed");
    return result.secure_url;
  };

  // Step 1: Save item details
  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.title ||
      !form.price ||
      !form.location ||
      !form.image ||
      !form.category
    ) {
      toast.error("Please fill in all required fields and upload an image.");
      return;
    }

    try {
      setLoading(true);
      const imageUrl = await uploadImage(form.image);

      const res = await axios.post(
        `${BASE_URL}marketplace/items/create/`,
        { ...form, image_url: imageUrl },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { id, fee, fee_type } = res.data;
      setForm({ ...form, id, fee, fee_type });

      if (fee === 0) {
        toast.success("Item saved! This item is free and active.");
        navigate("/dashboard/seller/items");
      } else {
        toast.success(
          `Item saved! Fee: Ksh ${fee} (${fee_type}). Enter MPESA ref to activate.`
        );
        setStep(2);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save item details.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit MPESA ref to activate
  const handleMpesaSubmit = async (e) => {
    e.preventDefault();
    if (!form.mpesa_ref) {
      toast.error("MPESA reference is required to activate item.");
      return;
    }

    try {
      setLoading(true);
      await axios.patch(
        `${BASE_URL}marketplace/items/${form.id}/`,
        { mpesa_ref: form.mpesa_ref },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Item activated successfully!");
      navigate("/dashboard/seller/items");
    } catch (err) {
      console.error(err);
      toast.error("Failed to activate item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      <SellerSidebar />
      <main className="flex-1 p-6 sm:p-10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="hidden md:flex justify-center">
            <img
              src="/images/seller.png"
              alt="Add Item"
              className="rounded-2xl shadow-xl max-h-[500px] object-cover"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full">
            <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6 text-center">
              {step === 1 ? "Add Item Details" : "Activate Item"}
            </h2>

            {step === 1 ? (
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <Input
                  icon={<Tag size={18} />}
                  name="title"
                  placeholder="Item Name"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
                <Input
                  icon={<Text size={18} />}
                  name="description"
                  placeholder="Item Description"
                  value={form.description}
                  onChange={handleChange}
                  textarea
                />
                <Select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  options={CATEGORY_CHOICES}
                />
                <Input
                  icon={<DollarSign size={18} />}
                  name="price"
                  placeholder="Price (Ksh)"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
                <Input
                  icon={<Map size={18} />}
                  name="location"
                  placeholder="Location"
                  value={form.location}
                  onChange={handleChange}
                  required
                />

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <ImageIcon size={18} className="text-green-600" /> Upload
                    Item Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-800 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg text-lg font-medium text-white transition ${
                    loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {loading ? (
                    <span className="flex justify-center items-center gap-2">
                      <Loader2 className="animate-spin" size={18} /> Saving...
                    </span>
                  ) : (
                    "Save Item Details"
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleMpesaSubmit} className="space-y-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Enter your MPESA reference to activate your item.
                </p>
                {form.fee > 0 && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Fee:{" "}
                    <span className="font-bold text-green-700 dark:text-green-400">
                      {form.fee} Ksh
                    </span>{" "}
                    {form.fee_type === "first item 5%" &&
                      "(5% off on first item above 5000)"}
                  </p>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Paybill:{" "}
                  <span className="font-bold text-green-700 dark:text-green-400">
                    {SEND_MONEY}
                  </span>
                </p>
                <Input
                  icon={<DollarSign size={18} />}
                  name="mpesa_ref"
                  placeholder="MPESA Reference"
                  value={form.mpesa_ref}
                  onChange={handleChange}
                  required
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
                      <Loader2 className="animate-spin" size={18} />{" "}
                      Activating...
                    </span>
                  ) : (
                    "Activate Item"
                  )}
                </button>
              </form>
            )}
          </div>
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
  required = false,
}) => (
  <div className="flex items-start gap-3 bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg">
    <span className="text-green-600 pt-1">{icon}</span>
    {textarea ? (
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
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
        required={required}
        className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
      />
    )}
  </div>
);

const Select = ({ name, value, onChange, options }) => (
  <div className="flex flex-col gap-2">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      <Tag size={18} className="text-green-600" /> Category{" "}
      <span className="text-red-500">*</span>
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
    >
      <option value="">Select Category</option>
      {options.map((c) => (
        <option key={c.value} value={c.value}>
          {c.label}
        </option>
      ))}
    </select>
  </div>
);

export default AddItem;
