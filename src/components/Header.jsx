import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("user_type"); // assuming it's either 'client' or 'fundi'

  const handleLogoClick = (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/"); // not logged in
    } else if (userType === "client") {
      navigate("/dashboard/client");
    } else if (userType === "fundi") {
      navigate("/dashboard/fundi");
    } else {
      navigate("/"); // fallback
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <a
          href="/"
          onClick={handleLogoClick}
          className="text-2xl font-bold text-blue-600 dark:text-white"
        >
          AjiriNow
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200">
          <Link to="/fundis" className="hover:text-blue-600">
            Find Fundi
          </Link>
          <Link to="/jobs" className="hover:text-blue-600">
            Find Job
          </Link>
          <Link to="/register/client" className="hover:text-blue-600">
            Advertise
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 dark:text-gray-200"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-gray-700 dark:text-gray-200">
          <Link to="/fundis" className="block hover:text-blue-600">
            Find Fundi
          </Link>
          <Link to="/jobs" className="block hover:text-blue-600">
            Find Job
          </Link>
          <Link to="/register/client" className="block hover:text-blue-600">
            Advertise
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
