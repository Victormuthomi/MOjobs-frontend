import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/axios";
import toast from "react-hot-toast";
import {
  Briefcase,
  MapPin,
  ClipboardList,
  Loader2,
  HardHat,
} from "lucide-react";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      const { title, description, location } = res.data;
      setForm({ title, description, location });
    } catch (err) {
      toast.error("Failed to fetch job details");
      navigate("/dashboard/jobs");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.patch(`/jobs/${id}/`, form, {
        headers: { Authorization: `Token ${token}` },
      });
      toast.success("Job updated successfully");
      navigate("/dashboard/client/jobs");
    } catch (err) {
      toast.error("Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) navigate("/login/client");
    fetchJob();
  }, []);

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 w-full">
        {/* Left image */}
        <div className="hidden md:flex items-center justify-center relative">
          <img
            src="/images/client4.png"
            alt="Edit Job"
            className="rounded-2xl shadow-2xl w-full h-auto max-h-[600px] object-cover"
          />
          <div className="absolute bottom-6 left-28 bg-green-700/90 text-white px-4 py-2 rounded-lg shadow-md">
            <p className="text-sm md:text-base font-semibold">
              Make your listing stand out!
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
            Edit Job
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              icon={<Briefcase />}
              name="title"
              placeholder="Job Title"
              value={form.title}
              onChange={handleChange}
            />
            <Input
              icon={<ClipboardList />}
              name="description"
              placeholder="Job Description"
              value={form.description}
              onChange={handleChange}
              textarea
            />
            <Input
              icon={<MapPin />}
              name="location"
              placeholder="Location"
              value={form.location}
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
                  Updating...
                </span>
              ) : (
                "Update Job"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Reusable Input
const Input = ({
  icon,
  name,
  placeholder,
  value,
  onChange,
  textarea = false,
}) => (
  <div className="flex items-start gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg">
    <span className="text-green-600 mt-1">{icon}</span>
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
        required
        className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
      />
    )}
  </div>
);

export default EditJob;
