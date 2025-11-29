// src/components/ClientSidebar.jsx
import {
  LayoutDashboard,
  Briefcase,
  Megaphone,
  User,
  LogOut,
  HardHat,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ClientSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    navigate("/login/client");
  };

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-xl p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-green-700 dark:text-white flex items-center gap-2 mb-8">
        <HardHat /> MO-jobs
      </h2>
      <nav className="space-y-4 mb-6">
        <SidebarLink
          icon={<LayoutDashboard />}
          text="Dashboard"
          to="/dashboard/client"
        />
        <SidebarLink icon={<User />} text="Fundis" to="/fundis" />
        <SidebarLink icon={<Briefcase />} text="Jobs" to="/jobs" />
        <SidebarLink
          icon={<Briefcase />}
          text="My Jobs"
          to="/dashboard/client/jobs"
        />
        <SidebarLink
          icon={<Megaphone />}
          text="My Ads"
          to="/dashboard/client/ads"
        />
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
  );
};

// Reusable link component
const SidebarLink = ({ icon, text, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition"
  >
    {icon}
    {text}
  </Link>
);

export default ClientSidebar;
