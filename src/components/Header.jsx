import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Home, Users, Briefcase, PlusSquare } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("user_type"); // 'client' or 'fundi'

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
    <>
      {/* Original Header (desktop & mobile menu) */}
      <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <a href="/" onClick={handleLogoClick} className="flex items-center">
            <img
              src="images/logo.png"
              alt="MOjobs Logo"
              className="
                h-10 w-auto
                md:h-14
                transform
                transition-transform duration-300
                scale-100 md:scale-125
              "
            />
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

        {/* Mobile dropdown nav */}
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

      {/* Bottom nav for mobile */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white dark:bg-gray-900 shadow-t py-2 flex justify-around items-center border-t border-gray-200 dark:border-gray-700">
        <Link
          to="/"
          className="flex flex-col items-center text-gray-700 dark:text-gray-200"
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/fundis"
          className="flex flex-col items-center text-gray-700 dark:text-gray-200"
        >
          <Users size={24} />
          <span className="text-xs mt-1">Fundis</span>
        </Link>
        <Link
          to="/jobs"
          className="flex flex-col items-center text-gray-700 dark:text-gray-200"
        >
          <Briefcase size={24} />
          <span className="text-xs mt-1">Jobs</span>
        </Link>
        {!token && (
          <Link
            to="/register/client"
            className="flex flex-col items-center text-gray-700 dark:text-gray-200"
          >
            <PlusSquare size={24} />
            <span className="text-xs mt-1">Advertise</span>
          </Link>
        )}
      </nav>
    </>
  );
};

export default Header;
