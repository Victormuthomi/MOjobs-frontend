import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { MapPin, ClipboardList, AlertTriangle, Briefcase } from "lucide-react";
import HorizontalAdsStrip from "../components/HorizontalAdsStrip";

const AllJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [titles, setTitles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const token =
        localStorage.getItem("client_token") ||
        localStorage.getItem("fundi_token") ||
        localStorage.getItem("token"); // fallback

      if (!token) {
        setErrorMessage("Please log in to view available jobs.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/jobs/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        const activeJobs = res.data.filter((job) => job.is_active);
        setJobs(activeJobs);
        setFilteredJobs(activeJobs);

        const locationMap = {};
        const titleMap = {};

        activeJobs.forEach((job) => {
          const location = job.location?.trim();
          const title = job.title?.trim();

          if (location) {
            locationMap[location] = (locationMap[location] || 0) + 1;
          }

          if (title) {
            titleMap[title] = (titleMap[title] || 0) + 1;
          }
        });

        setLocations(locationMap);
        setTitles(titleMap);
      } catch (err) {
        if (err.response?.status === 403 || err.response?.status === 401) {
          setErrorMessage(
            "Only registered clients or subscribed fundis can view jobs.",
          );
        } else {
          setErrorMessage("Something went wrong while fetching jobs.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs;

    if (selectedLocation) {
      filtered = filtered.filter((j) =>
        j.location?.toLowerCase().includes(selectedLocation.toLowerCase()),
      );
    }

    if (selectedTitle) {
      filtered = filtered.filter((j) =>
        j.title?.toLowerCase().includes(selectedTitle.toLowerCase()),
      );
    }

    setFilteredJobs(filtered);
  }, [selectedLocation, selectedTitle, jobs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4 sm:px-8">
      {/* 🌟 Title */}
      <div className="max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-2">
          Browse Available Jobs
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Explore posted jobs and find your next gig.
        </p>
      </div>

      {/* 🪧 Horizontal Ads */}
      <section className="mt-8 mb-6">
        <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
          Sponsored Ads
        </h3>
        <HorizontalAdsStrip />
      </section>

      {errorMessage ? (
        <div className="max-w-3xl mx-auto bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-l-4 border-red-500 p-4 rounded-xl shadow mb-10 flex items-start gap-3">
          <AlertTriangle size={24} className="mt-1" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      ) : (
        <>
          {/* 🔍 Filters */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-600"
            >
              <option value="">🌍 Filter by Location</option>
              {Object.entries(locations)
                .sort()
                .map(([loc, count]) => (
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
              {Object.entries(titles)
                .sort()
                .map(([title, count]) => (
                  <option key={title} value={title}>
                    {title} ({count})
                  </option>
                ))}
            </select>
          </div>

          {/* 💼 Job Cards */}
          <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <p className="text-center col-span-full text-gray-700 dark:text-gray-300">
                Loading jobs...
              </p>
            ) : filteredJobs.length === 0 ? (
              <p className="text-center col-span-full text-gray-700 dark:text-gray-300">
                No jobs found with current filters.
              </p>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  className="cursor-pointer p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 hover:scale-[1.01] transition transform"
                >
                  {/* Job visual */}
                  <div className="mb-3 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Briefcase size={20} />
                    <span className="text-sm font-medium">Job Opportunity</span>
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
    </div>
  );
};

export default AllJobsPage;
