import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-white"
        >
          AjiriNow
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200">
          <Link to="/fundis" className="hover:text-blue-600">
            Find Fundi
          </Link>
          <Link to="/jobs/post" className="hover:text-blue-600">
            Post Job
          </Link>
          <Link to="/ads/post" className="hover:text-blue-600">
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
          <Link to="/jobs/post" className="block hover:text-blue-600">
            Post Job
          </Link>
          <Link to="/ads/post" className="block hover:text-blue-600">
            Advertise
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
