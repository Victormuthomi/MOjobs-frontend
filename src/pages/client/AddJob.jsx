import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Text, Map, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/axios";
import ClientSidebar from "../../components/ClientSidebar";

const AddJob = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/jobs/", form, {
        headers: { Authorization: `Token ${token}` },
      });

      const jobId = res.data.id;
      toast.success("Job created! Proceed to payment.");
      navigate(`/pay/job/${jobId}`);
    } catch (err) {
      toast.error("Failed to create job.");
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
              src="/images/client4.png"
              alt="Add Job"
              className="rounded-2xl shadow-xl max-h-[500px] object-cover"
            />
          </div>

          {/* Right Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full">
            <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6 text-center">
              Add New Job
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                icon={<Briefcase size={18} />}
                name="title"
                placeholder="Job Title"
                value={form.title}
                onChange={handleChange}
              />
              <Input
                icon={<Text size={18} />}
                name="description"
                placeholder="Job Description"
                value={form.description}
                onChange={handleChange}
                textarea
              />
              <Input
                icon={<Map size={18} />}
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
                    Creating...
                  </span>
                ) : (
                  "Create & Pay to Post"
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
        required
        className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
      />
    )}
  </div>
);

export default AddJob;
