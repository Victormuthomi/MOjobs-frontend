import React, { useEffect, useState } from "react";
import {
  ToggleLeft,
  ToggleRight,
  Trash2,
  Pencil,
  PlusCircle,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "../../lib/axios";
import toast from "react-hot-toast";
import ClientSidebar from "../../components/ClientSidebar";

const ClientJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/login/client");
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("/jobs/mine/", {
        headers: { Authorization: `Token ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      toast.error("Failed to load your jobs.");
    }
  };

  const toggleJobStatus = async (id, currentStatus) => {
    try {
      await axios.patch(
        `/jobs/${id}/`,
        { is_active: !currentStatus },
        { headers: { Authorization: `Token ${token}` } },
      );
      toast.success("Job status updated.");
      fetchJobs();
    } catch (err) {
      toast.error("Could not update job status.");
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`/jobs/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      toast.success("Job deleted.");
      fetchJobs();
    } catch (err) {
      toast.error("Failed to delete job.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <ClientSidebar />

      <main className="flex-1 px-4 py-6 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            Manage Your Jobs
          </h1>
          <button
            onClick={() => navigate("/dashboard/client/jobs/add")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition text-sm sm:text-base"
          >
            <PlusCircle size={18} />
            Post a New Job
          </button>
        </div>

        {jobs.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            You haven't posted any jobs yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                    {job.title}
                  </h2>
                  <button
                    onClick={() => toggleJobStatus(job.id, job.is_active)}
                    className="text-blue-600 dark:text-blue-400"
                  >
                    {job.is_active ? (
                      <ToggleRight size={26} />
                    ) : (
                      <ToggleLeft size={26} />
                    )}
                  </button>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-3">
                  {job.description}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-2">
                  <MapPin size={14} />
                  {job.location}
                </p>

                {!job.is_active && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mb-2">
                    Inactive – Payment required
                  </p>
                )}

                <div className="flex justify-end gap-3 mt-auto pt-2">
                  {!job.is_active && (
                    <button
                      onClick={() => navigate(`/pay/job/${job.id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Pay Now
                    </button>
                  )}
                  <button
                    onClick={() =>
                      navigate(`/dashboard/client/jobs/edit/${job.id}`)
                    }
                    className="text-yellow-600 hover:text-yellow-700"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={20} />
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

export default ClientJobsPage;
