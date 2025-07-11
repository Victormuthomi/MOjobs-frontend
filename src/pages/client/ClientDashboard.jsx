import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Megaphone,
  User,
  LogOut,
  HardHat,
  ToggleLeft,
  ToggleRight,
  BadgeCheck,
  Smartphone,
  IdCard,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../lib/axios";
import toast from "react-hot-toast";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [ads, setAds] = useState([]);

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Token ${token}` };

      const userRes = await axios.get("/accounts/clients/me/", { headers });
      const jobsRes = await axios.get("/jobs/mine/", { headers });
      const adsRes = await axios.get("/ads/mine/", { headers });

      setUser(userRes.data);
      setJobs(jobsRes.data);
      setAds(adsRes.data);
    } catch (err) {
      toast.error("Failed to load dashboard data.");
    }
  };

  const toggleJobStatus = async (jobId, currentStatus) => {
    try {
      await axios.patch(
        `/jobs/${jobId}/`,
        { is_active: !currentStatus },
        { headers: { Authorization: `Token ${token}` } },
      );
      toast.success("Job status updated");
      fetchData();
    } catch (err) {
      toast.error("Failed to update job status");
    }
  };

  useEffect(() => {
    if (!token) navigate("/login/client");
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login/client");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-xl p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-green-700 dark:text-white flex items-center gap-2 mb-8">
          <HardHat /> AjiriNow
        </h2>
        <nav className="space-y-4 mb-6">
          <SidebarLink
            icon={<LayoutDashboard />}
            text="Dashboard"
            to="/dashboard/client"
          />
          <SidebarLink icon={<User />} text="Fundis" to="/dashboard/fundis" />
          <SidebarLink icon={<Briefcase />} text="Jobs" to="/dashboard/jobs" />
          <SidebarLink icon={<Megaphone />} text="Ads" to="/dashboard/ads" />
          <SidebarLink
            icon={<User />}
            text="Profile"
            to="/profile/update/client"
          />
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:underline"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Welcome,{" "}
            <span className="font-semibold text-green-600 dark:text-green-400">
              {user?.name || "Client"}
            </span>
          </p>
        </header>

        {/* Ads Banner */}
        <div className="mt-8 mb-6 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-l-4 border-green-500 px-6 py-4 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold">Your Business Ads</h3>
          <p className="text-sm mt-1">
            This section showcases your active business ads. Need more reach?
            Add a new ad under the <strong>Ads</strong> tab!
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <DashboardCard
            title="Total Jobs Posted"
            value={jobs.length}
            icon={<Briefcase />}
            color="blue"
          />
          <DashboardCard
            title="Total Ads Posted"
            value={ads.length}
            icon={<Megaphone />}
            color="green"
          />
          <DashboardCard
            title="Role"
            value={user?.role || "N/A"}
            icon={<BadgeCheck />}
            color="green"
          />
          <DashboardCard
            title="Phone Number"
            value={user?.phone_number || "N/A"}
            icon={<Smartphone />}
            color="blue"
          />
          <DashboardCard
            title="ID Number"
            value={user?.id_number || "N/A"}
            icon={<IdCard />}
            color="green"
          />
          <DashboardCard
            title="Role Note"
            value={user?.client_profile?.role_note || "Not provided"}
            icon={<User />}
            color="blue"
          />
        </div>

        {/* Job List with Toggle */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Your Jobs
          </h2>
          {jobs.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">
              No jobs posted yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {job.description}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleJobStatus(job.id, job.is_active)}
                    className="text-blue-600 dark:text-blue-400"
                  >
                    {job.is_active ? (
                      <ToggleRight size={28} />
                    ) : (
                      <ToggleLeft size={28} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

// Sidebar Link component
const SidebarLink = ({ icon, text, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition"
  >
    {icon}
    {text}
  </Link>
);

// Reusable Dashboard Card component
const DashboardCard = ({ title, value, icon, color }) => {
  const bgColor = {
    blue: "bg-blue-100 dark:bg-blue-900",
    green: "bg-green-100 dark:bg-green-900",
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

export default ClientDashboard;
