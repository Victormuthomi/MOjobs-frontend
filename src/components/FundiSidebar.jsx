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

const SidebarLink = ({ icon, text, to, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-2 py-2 rounded-md transition ${
      active
        ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white"
        : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
    }`}
  >
    {icon}
    {text}
  </Link>
);

const MobileNavLink = ({ icon, text, to, active }) => (
  <Link
    to={to}
    className={`flex flex-col items-center text-xs ${
      active
        ? "text-blue-600 dark:text-blue-400"
        : "text-gray-600 dark:text-gray-300"
    }`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default function FundiSidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    if (onLogout) onLogout(); // optional hook
    navigate("/login/fundi");
  };

  const links = [
    { to: "/dashboard/fundi", icon: <LayoutDashboard />, text: "Dashboard" },
    { to: "/fundis", icon: <User />, text: "Fundis" },
    { to: "/jobs", icon: <Briefcase />, text: "Jobs" },
    { to: "/profile/update/fundi", icon: <Settings />, text: "Profile" },
    { to: "/fundi/subscription", icon: <BadgeCheck />, text: "Subscription" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-white dark:bg-gray-800 shadow-xl p-6 flex-col">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-white flex items-center gap-2 mb-8">
          <HardHat /> MO-jobs
        </h2>

        <nav className="space-y-4 mb-6">
          {links.map((link) => (
            <SidebarLink
              key={link.to}
              {...link}
              active={location.pathname === link.to}
            />
          ))}
        </nav>

        <button
          onClick={handleLogoutClick}
          className="flex items-center gap-2 text-red-600 hover:underline"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-2xl flex justify-around py-2 z-50">
        {links.map((link) => (
          <MobileNavLink
            key={link.to}
            {...link}
            active={location.pathname === link.to}
          />
        ))}

        <button
          onClick={handleLogoutClick}
          className="flex flex-col items-center text-red-600"
        >
          <LogOut size={20} />
          <span className="text-xs">Logout</span>
        </button>
      </div>
    </>
  );
}
