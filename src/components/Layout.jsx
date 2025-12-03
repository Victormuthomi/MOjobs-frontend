// src/components/Layout.jsx
import React from "react";
import SellerSidebar from "./SellerSidebar";
import FundiSidebar from "./FundiSidebar";
import ClientSidebar from "./ClientSidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("user_type");

  // Determine which sidebar to show if logged in
  const renderSidebar = () => {
    switch (userType) {
      case "seller":
        return <SellerSidebar />;
      case "fundi":
        return <FundiSidebar />;
      case "client":
        return <ClientSidebar />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Show sidebar only if logged in */}
      {token && renderSidebar()}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Show header only if NOT logged in */}
        {!token && <Header />}

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
