import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import {
  MapPin,
  Wrench,
  CheckCircle,
  Phone,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import HorizontalAdsStrip from "../components/HorizontalAdsStrip";

const FundiDetail = () => {
  const { id } = useParams();
  const [fundi, setFundi] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFundi = async () => {
      try {
        const res = await axios.get(`/accounts/fundis/${id}/`);
        setFundi(res.data);
      } catch (err) {
        console.error("Failed to fetch fundi details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFundi();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-700 dark:text-gray-300">
        Loading fundi details...
      </div>
    );
  }

  if (!fundi) {
    return (
      <div className="text-center py-20 text-red-600 dark:text-red-400">
        Fundi not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4 sm:px-8">
      {/* 🔙 Back Button */}
      <div className="max-w-3xl mx-auto mb-4">
        <button
          onClick={() => navigate("/fundis")}
          className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft size={14} />
          Back to Fundis
        </button>
      </div>

      {/* 🪧 Ad Banner */}
      {/* 💡 Live Ads Section */}
      <section className="mt-8 mb-6">
        <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
          Sponsored Ads Near You
        </h3>
        <HorizontalAdsStrip />
      </section>

      {/* ⚠️ Disclaimer */}
      <div className="max-w-3xl mx-auto bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 p-4 mb-6 rounded-xl border-l-4 border-yellow-500">
        <strong>⚠️ Safety Notice:</strong> Please do not make any payments
        before the fundi has completed the agreed work. <br />
        <strong>MO-jobs is not liable</strong> for any unauthorized transactions
        or advance payments.
      </div>

      {/* 👤 Fundi Card */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 mb-8 space-y-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold text-white">
            {fundi.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {fundi.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <MapPin size={14} />
              {fundi.location || "No location provided"}
            </p>
          </div>
        </div>

        {/* Skills and Rate */}
        <div className="text-gray-700 dark:text-gray-300 space-y-2">
          <p>
            <Wrench className="inline mr-2" size={16} />
            <strong>Skills:</strong> {fundi.skills || "Not specified"}
          </p>
          <p>
            💰 <strong>Rate:</strong> {fundi.rate_note || "Not specified"}
          </p>
          <p
            className={`flex items-center gap-2 text-sm ${
              fundi.is_available
                ? "text-green-600 dark:text-green-300"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <CheckCircle size={16} />
            {fundi.is_available ? "Available now" : "Not available"}
          </p>
        </div>

        {/* 📞 Contact */}
        {fundi.phone_number && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Contact:
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-gray-900 dark:text-white text-lg">
                {fundi.phone_number}
              </span>
              <a
                href={`tel:${fundi.phone_number}`}
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <Phone size={16} />
                Call
              </a>
              <a
                href={`https://wa.me/254${fundi.phone_number.slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 dark:text-green-400 hover:underline flex items-center gap-1"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ➕ Fundi Register CTA */}
      <div className="max-w-2xl mx-auto bg-green-100 border-l-4 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-200 p-4 rounded-xl shadow-sm text-center">
        Are you a skilled fundi and want to be featured on MO-jobs?{" "}
        <button
          onClick={() => navigate("/register/fundi")}
          className="underline font-semibold hover:text-green-900"
        >
          Register Now →
        </button>
      </div>
    </div>
  );
};

export default FundiDetail;
