import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Text, Link as LinkIcon, Loader2, Heading } from "lucide-react";
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
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.link) formData.append("link", form.link);
    if (form.image) formData.append("image", form.image);

    try {
      setLoading(true);
      const res = await api.post("/ads/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const adId = res.data.id;
      toast.success("Ad created! Proceed to payment.");
      navigate(`/dashboard/client/ads/pay/${adId}`);
    } catch (err) {
      toast.error("Failed to create ad.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <ClientSidebar />

      {/* Main content */}
      <main className="flex-1 p-6 sm:p-10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left Image */}
          <div className="hidden md:flex justify-center">
            <img
              src="/images/client5.png"
              alt="Post Ad"
              className="rounded-2xl shadow-xl max-h-[500px] object-cover"
            />
          </div>

          {/* Right Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full">
            <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6 text-center">
              Create a New Ad
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                icon={<Heading size={18} />}
                name="title"
                placeholder="Ad Title"
                value={form.title}
                onChange={handleChange}
              />
              <Input
                icon={<Text size={18} />}
                name="description"
                placeholder="Ad Description"
                value={form.description}
                onChange={handleChange}
                textarea
              />
              <Input
                icon={<LinkIcon size={18} />}
                name="link"
                placeholder="Optional Link (https://...)"
                value={form.link}
                onChange={handleChange}
              />

              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Image size={18} />
                Upload Ad Image (Optional)
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
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
  <div className="flex items-start gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg">
    <span className="text-green-600">{icon}</span>
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
