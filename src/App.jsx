import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🌍 Root pages
import LandingPage from "./pages/LandingPage";
import Fundis from "./pages/FundiDirectory";
import FundiDetail from "./pages/FundiDetail";

// 🧰 Fundi pages
import FundiRegister from "./pages/fundi/FundiRegister";
import FundiLogin from "./pages/fundi/FundiLogin";
import FundiDashboard from "./pages/fundi/FundiDashboard";
import FundiProfileUpdate from "./pages/fundi/FundiProfileUpdate";
import FundiSubscription from "./pages/fundi/FundiSubscription";
import FundiResetPassword from "./pages/fundi/FundiResetPassword";

// 👤 Client pages
import ClientRegister from "./pages/client/ClientRegister";
import ClientLogin from "./pages/client/ClientLogin";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientProfileUpdate from "./pages/client/ClientProfileUpdate";
import ClientJobsPage from "./pages/client/ClientJobsPage";
import EditJob from "./pages/client/EditJob";
import AddJob from "./pages/client/AddJob";
import ClientJobPayment from "./pages/client/ClientJobPayment";

// 🧩 Layout
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <Header />

        <div className="flex-grow">
          <Routes>
            {/* 🌍 Root */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/fundis" element={<Fundis />} />
            <Route path="/fundis/:id" element={<FundiDetail />} />

            {/* 🧰 Fundi */}
            <Route path="/register/fundi" element={<FundiRegister />} />
            <Route path="/login/fundi" element={<FundiLogin />} />
            <Route path="/dashboard/fundi" element={<FundiDashboard />} />
            <Route path="/fundi/subscription" element={<FundiSubscription />} />
            <Route
              path="/profile/update/fundi"
              element={<FundiProfileUpdate />}
            />
            <Route
              path="/reset-password/fundi"
              element={<FundiResetPassword />}
            />

            {/* 👤 Client */}
            <Route path="/register/client" element={<ClientRegister />} />
            <Route path="/login/client" element={<ClientLogin />} />
            <Route path="/dashboard/client" element={<ClientDashboard />} />
            <Route path="/dashboard/client/jobs" element={<ClientJobsPage />} />
            <Route path="/dashboard/client/jobs/add" element={<AddJob />} />
            <Route path="/pay/job/:jobId" element={<ClientJobPayment />} />

            <Route
              path="/dashboard/client/jobs/edit/:id"
              element={<EditJob />}
            />

            <Route
              path="/profile/update/client"
              element={<ClientProfileUpdate />}
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
