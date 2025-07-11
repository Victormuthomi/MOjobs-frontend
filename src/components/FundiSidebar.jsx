import {
  HardHat,
  LayoutDashboard,
  User,
  Briefcase,
  Settings,
  BadgeCheck,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SidebarLink = ({ icon, text, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-2 py-2 rounded-md ${
        isActive
          ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white"
          : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
      } transition`}
    >
      {icon}
      {text}
    </Link>
  );
};

export default function FundiSidebar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout(); // optional hook
    navigate("/login/fundi");
  };

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-xl p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-white flex items-center gap-2 mb-8">
        <HardHat /> AjiriNow
      </h2>

      <nav className="space-y-4 mb-6">
        <SidebarLink
          icon={<LayoutDashboard />}
          text="Dashboard"
          to="/dashboard/fundi"
        />
        <SidebarLink icon={<User />} text="Fundis" to="/dashboard/fundis" />
        <SidebarLink icon={<Briefcase />} text="Jobs" to="/dashboard/jobs" />
        <SidebarLink
          icon={<Settings />}
          text="Profile"
          to="/profile/update/fundi"
        />
        <SidebarLink
          icon={<BadgeCheck />}
          text="Subscription"
          to="/fundi/subscription"
        />
      </nav>

      <button
        onClick={handleLogoutClick}
        className="flex items-center gap-2 text-red-600 hover:underline"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
