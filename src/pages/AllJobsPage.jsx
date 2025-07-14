import React, { useEffect, useState } from "react";
import { MapPin, ClipboardList, AlertTriangle, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import ClientSidebar from "../components/ClientSidebar";
import FundiSidebar from "../components/FundiSidebar";
import HorizontalAdsStrip from "../components/HorizontalAdsStrip";

const AllJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [locations, setLocations] = useState({});
  const [titles, setTitles] = useState({});
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [userType, setUserType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const type = localStorage.getItem("user_type");
    setUserType(type || "");
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("unauthenticated");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/jobs/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        const active = res.data.filter((j) => j.is_active);
        setJobs(active);
        setFilteredJobs(active);

        const locationMap = {};
        const titleMap = {};

        active.forEach((job) => {
          const loc = job.location?.trim();
          const title = job.title?.trim();
          if (loc) locationMap[loc] = (locationMap[loc] || 0) + 1;
          if (title) titleMap[title] = (titleMap[title] || 0) + 1;
        });

        setLocations(locationMap);
        setTitles(titleMap);
      } catch (err) {
        if (err.response?.status === 403 || err.response?.status === 401) {
          setErrorMessage("unsubscribed");
        } else {
          setErrorMessage("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs;
    if (selectedLocation)
      filtered = filtered.filter((j) =>
        j.location?.toLowerCase().includes(selectedLocation.toLowerCase()),
      );
    if (selectedTitle)
      filtered = filtered.filter((j) =>
        j.title?.toLowerCase().includes(selectedTitle.toLowerCase()),
      );
    setFilteredJobs(filtered);
  }, [selectedLocation, selectedTitle, jobs]);

  const renderErrorBox = () => {
    let message = "";
    let actions = [];

    if (errorMessage === "unauthenticated") {
      message = "You must be registered to view available jobs.";
      actions = [
        {
          label: "Register as Client",
          onClick: () => navigate("/register/client"),
          className: "bg-green-600 text-white hover:bg-green-700",
        },
        {
          label: "Register as Fundi",
          onClick: () => navigate("/register/fundi"),
          className: "bg-blue-600 text-white hover:bg-blue-700",
        },
      ];
    } else if (errorMessage === "unsubscribed") {
      message = "Only subscribed fundis can access jobs. Please subscribe.";
      actions = [
        {
          label: "Subscribe Now",
          onClick: () => navigate("/fundi/subscription"),
          className: "bg-yellow-500 text-white hover:bg-yellow-600",
        },
      ];
    } else {
      message = errorMessage || "Something went wrong.";
    }

    return (
      <div className="max-w-3xl mx-auto border-l-4 p-5 rounded-xl shadow mb-10 flex items-start gap-4 bg-red-50 text-red-800 border-red-500 dark:bg-red-900 dark:text-red-200">
        <AlertTriangle size={28} className="mt-1 shrink-0" />
        <div>
          <p className="text-base font-semibold mb-3">{message}</p>
          <div className="flex gap-4 flex-wrap">
            {actions.map((btn, idx) => (
              <button
                key={idx}
                onClick={btn.onClick}
                className={`px-4 py-2 rounded-md font-semibold shadow ${btn.className}`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sidebar (Dashboard-style, always visible) */}
      {userType === "client" ? (
        <ClientSidebar />
      ) : userType === "fundi" ? (
        <FundiSidebar />
      ) : (
        <aside className="w-full md:w-64 bg-white dark:bg-gray-900 shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Not Logged In
          </h2>
          <button
            onClick={() => (window.location.href = "/")}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Home
          </button>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Browse Available Jobs
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Explore posted jobs and find your next gig.
          </p>
        </header>

        {/* Ads */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
            Sponsored Ads
          </h3>
          <HorizontalAdsStrip />
        </section>

        {/* Error or Filters */}
        {errorMessage ? (
          renderErrorBox()
        ) : (
          <>
            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="p-3 rounded-xl bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-600"
              >
                <option value="">🌍 Filter by Location</option>
                {Object.entries(locations).map(([loc, count]) => (
                  <option key={loc} value={loc}>
                    {loc} ({count})
                  </option>
                ))}
              </select>
              <select
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
                className="p-3 rounded-xl bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-600"
              >
                <option value="">📋 Filter by Title</option>
                {Object.entries(titles).map(([title, count]) => (
                  <option key={title} value={title}>
                    {title} ({count})
                  </option>
                ))}
              </select>
            </div>

            {/* Job Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <p className="text-center col-span-full text-gray-700 dark:text-gray-300">
                  Loading jobs...
                </p>
              ) : filteredJobs.length === 0 ? (
                <p className="text-center col-span-full text-gray-700 dark:text-gray-300">
                  No jobs found.
                </p>
              ) : (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="cursor-pointer p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 hover:scale-[1.01] transition transform"
                  >
                    <div className="mb-3 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <Briefcase size={20} />
                      <span className="text-sm font-medium">
                        Job Opportunity
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {job.description.length > 90
                        ? `${job.description.slice(0, 90)}...`
                        : job.description}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 mb-1">
                      <MapPin size={14} /> {job.location}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <ClipboardList size={14} /> Posted{" "}
                      {new Date(job.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AllJobsPage;
