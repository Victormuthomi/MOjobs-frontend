import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import {
  MapPin,
  ClipboardList,
  Phone,
  MessageCircle,
  ArrowLeft,
  Briefcase,
  User,
} from "lucide-react";
import HorizontalAdsStrip from "../components/HorizontalAdsStrip";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token =
    localStorage.getItem("client_token") ||
    localStorage.getItem("fundi_token") ||
    localStorage.getItem("token");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`/jobs/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setJob(res.data);
      } catch (err) {
        console.error("Failed to fetch job details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, token]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-700 dark:text-gray-300">
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-20 text-red-600 dark:text-red-400">
        Job not found or access denied.
      </div>
    );
  }

  const clientName = job.client?.name || "Unnamed Client";
  const clientPhone = job.client?.phone_number || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4 sm:px-8">
      {/* 🔙 Back Button */}
      <div className="max-w-3xl mx-auto mb-4">
        <button
          onClick={() => navigate("/jobs")}
          className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft size={14} />
          Back to Jobs
        </button>
      </div>

      {/* 📢 Ads */}
      <section className="mt-8 mb-6">
        <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
          Sponsored Ads for Fundis
        </h3>
        <HorizontalAdsStrip />
      </section>

      {/* ⚠️ Disclaimer */}
      <div className="max-w-3xl mx-auto bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 p-4 mb-6 rounded-xl border-l-4 border-yellow-500">
        <strong>⚠️ Job Caution:</strong> Please ensure that you contact the job
        poster and understand all job terms before committing. <br />
        <strong>MO-jobs does not endorse any advance payments</strong> or
        incomplete information. Always verify before accepting a job.
      </div>

      {/* 🧾 Job Card */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 mb-8 space-y-6">
        <div className="flex items-center gap-5 mb-4">
          <div className="w-16 h-16 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center text-3xl font-bold text-white">
            <Briefcase size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {job.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <MapPin size={14} />
              {job.location || "No location provided"}
            </p>
          </div>
        </div>

        {/* Job Description */}
        <div className="text-gray-700 dark:text-gray-300 space-y-4">
          <p>
            <ClipboardList className="inline mr-2" size={16} />
            <strong>Description:</strong> {job.description}
          </p>
          <p>
            📅 <strong>Posted:</strong>{" "}
            {new Date(job.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* 🧍 Client Info */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Job Posted By:
          </p>
          <div className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
            <User size={18} />
            {clientName}
          </div>

          {clientPhone && (
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <span className="text-gray-900 dark:text-white text-lg">
                {clientPhone}
              </span>
              <a
                href={`tel:${clientPhone}`}
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <Phone size={16} />
                Call
              </a>
              <a
                href={`https://wa.me/254${clientPhone.slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 dark:text-green-400 hover:underline flex items-center gap-1"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 🔧 Fundi Registration CTA */}
      <div className="max-w-2xl mx-auto bg-green-100 border-l-4 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-200 p-4 rounded-xl shadow-sm text-center">
        Are you a fundi and looking for more job opportunities?{" "}
        <button
          onClick={() => navigate("/register/fundi")}
          className="underline font-semibold hover:text-green-900"
        >
          Join AjiriNow →
        </button>
      </div>
    </div>
  );
};

export default JobDetail;
