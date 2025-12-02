import {
  LayoutDashboard,
  PackagePlus,
  Grid2x2,
  User,
  LogOut,
  HardHat,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SellerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    navigate("/login/seller");
  };

  // --- Essential Sidebar Links ---
  const links = [
    { to: "/dashboard/seller", icon: <LayoutDashboard />, text: "Dashboard" },
    { to: "/seller/items", icon: <Grid2x2 />, text: "Items" },
    {
      to: "/dashboard/seller/items/add",
      icon: <PackagePlus />,
      text: "Add Item",
    },
    { to: "/profile/update/seller", icon: <User />, text: "Profile" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-white dark:bg-gray-800 shadow-xl p-6 flex-col">
        <h2 className="text-2xl font-bold text-green-700 dark:text-white flex items-center gap-2 mb-8">
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
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:underline"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Minimal Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-2xl flex justify-around py-2 z-50">
        {links.map((link) => (
          <MobileNavLink
            key={link.to}
            {...link}
            active={location.pathname === link.to}
          />
        ))}

        <button
          onClick={handleLogout}
          className="flex flex-col items-center text-red-600"
        >
          <LogOut size={20} />
          <span className="text-xs">Logout</span>
        </button>
      </div>
    </>
  );
};

const SidebarLink = ({ icon, text, to, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition 
      ${
        active
          ? "text-green-700 dark:text-green-400 font-semibold"
          : "text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
      }`}
  >
    {icon} {text}
  </Link>
);

const MobileNavLink = ({ icon, text, to, active }) => (
  <Link
    to={to}
    className={`flex flex-col items-center text-xs ${
      active
        ? "text-green-600 dark:text-green-400"
        : "text-gray-600 dark:text-gray-300"
    }`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default SellerSidebar;
