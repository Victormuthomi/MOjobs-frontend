import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => (
  <section className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div className="text-center">
      <AlertTriangle size={48} className="text-red-500 mb-4 mx-auto" />
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition transform hover:scale-105"
      >
        ← Back to Home
      </Link>
    </div>
  </section>
);

export default NotFound;
