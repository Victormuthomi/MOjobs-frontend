import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FundiRegister from "./pages/fundi/FundiRegister";
import FundiLogin from "./pages/fundi/FundiLogin";
import FundiDashboard from "./pages/fundi/FundiDashboard";
import FundiProfileUpdate from "./pages/fundi/FundiProfileUpdate";
import ClientRegister from "./pages/client/ClientRegister";
import ClientLogin from "./pages/client/ClientLogin";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register/fundi" element={<FundiRegister />} />
            <Route path="/login/fundi" element={<FundiLogin />} />
            <Route path="/dashboard/fundi" element={<FundiDashboard />} />
            <Route path="/register/client" element={<ClientRegister />} />
            <Route path="/login/client" element={<ClientLogin />} />

            <Route
              path="/profile/update/fundi"
              element={<FundiProfileUpdate />}
            />

            {/* Other routes will go here */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
