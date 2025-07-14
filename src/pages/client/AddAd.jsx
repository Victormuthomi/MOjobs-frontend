import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Image as ImageIcon,
  Text,
  Link as LinkIcon,
  Loader2,
  Heading,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/axios";
import ClientSidebar from "../../components/ClientSidebar";

const AddAd = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.link) formData.append("link", form.link);
    formData.append("image", form.image);

    try {
      setLoading(true);
      const res = await api.post("/ads/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Ad created! Proceed to payment.");
      navigate(`/dashboard/client/ads/pay/${res.data.id}`);
    } catch (err) {
      toast.error("Failed to create ad.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      <ClientSidebar />

      <main className="flex-1 p-6 sm:p-10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          {/* Left Image */}
          <div className="hidden md:flex justify-center">
            <img
              src="/images/client4.png"
              alt="Post Ad"
              className="rounded-2xl shadow-xl max-h-[500px] object-cover"
            />
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full">
            <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6 text-center">
              Create a New Ad
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                icon={<Heading size={20} />}
                name="title"
                placeholder="Ad Title"
                value={form.title}
                onChange={handleChange}
              />
              <Input
                icon={<Text size={20} />}
                name="description"
                placeholder="Ad Description"
                value={form.description}
                onChange={handleChange}
                textarea
              />
              <Input
                icon={<LinkIcon size={20} />}
                name="link"
                placeholder="Optional Link (https://...)"
                value={form.link}
                onChange={handleChange}
              />

              {/* File Upload */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <ImageIcon size={18} className="text-green-600" />
                  Upload Ad Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-800 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 cursor-pointer"
                  required
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
                    <Loader2 className="animate-spin" size={18} />
                    Creating...
                  </span>
                ) : (
                  "Create & Pay to Publish"
                )}
              </button>
            </form>
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
}) => (
  <div className="flex items-start gap-3 bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg">
    <span className="text-green-600 pt-1">{icon}</span>
    {textarea ? (
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
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
        required={name !== "link"}
        className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
      />
    )}
  </div>
);

export default AddAd;
