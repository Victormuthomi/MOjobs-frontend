import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

// 🌍 Root pages
import LandingPage from "./pages/LandingPage";
import Fundis from "./pages/FundiDirectory";
import FundiDetail from "./pages/FundiDetail";
import AllJobsPage from "./pages/AllJobsPage";
import JobDetail from "./pages/JobDetail";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

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
import ClientAdsPage from "./pages/client/ClientAdsPage";
import AddAd from "./pages/client/AddAd";
import ClientAdPayment from "./pages/client/ClientAdPayment";
import ClientResetPassword from "./pages/client/ClientResetPassword";

// 🛒 Seller pages
import SellerRegister from "./pages/seller/SellerRegister";
import SellerLogin from "./pages/seller/SellerLogin";
import SellerResetPassword from "./pages/seller/SellerResetPassword";
import SellerDashboard from "./pages/seller/SellerDashboard";
import ItemDirectory from "./pages/seller/ItemDirectory";
import AddItem from "./pages/seller/AddItem";
import EditItem from "./pages/seller/EditItem";
import SellerProfileUpdate from "./pages/seller/SellerProfileUpdate";
import SellerItems from "./pages/seller/SellerItem.jsx";
import ItemDetail from "./pages/seller/ItemDetail.jsx";
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
            <Route path="/jobs" element={<AllJobsPage />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />

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
            <Route path="/dashboard/client/ads" element={<ClientAdsPage />} />
            <Route path="/dashboard/client/ads/add" element={<AddAd />} />
            <Route
              path="/dashboard/client/ads/pay/:adId"
              element={<ClientAdPayment />}
            />
            <Route
              path="/dashboard/client/jobs/edit/:id"
              element={<EditJob />}
            />
            <Route
              path="/profile/update/client"
              element={<ClientProfileUpdate />}
            />
            <Route
              path="/reset-password/client"
              element={<ClientResetPassword />}
            />

            {/* 🛒 Seller */}
            <Route path="/register/seller" element={<SellerRegister />} />
            <Route path="/login/seller" element={<SellerLogin />} />
            <Route
              path="/reset-password/seller"
              element={<SellerResetPassword />}
            />
            <Route path="/dashboard/seller" element={<SellerDashboard />} />
            <Route path="/seller/items" element={<ItemDirectory />} />
            <Route path="/seller/items/:id" element={<ItemDetail />} />
            <Route path="/dashboard/seller/items/add" element={<AddItem />} />
            <Route path="/dashboard/seller/items" element={<SellerItems />} />
            <Route
              path="/dashboard/seller/items/edit/:id"
              element={<EditItem />}
            />
            <Route
              path="/profile/update/seller"
              element={<SellerProfileUpdate />}
            />
          </Routes>
        </div>

        <Footer />
        <Analytics />
      </div>
    </Router>
  );
};

export default App;
