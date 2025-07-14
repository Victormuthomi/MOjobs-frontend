import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { CheckCircle, MapPin, Wrench } from "lucide-react";
import HorizontalAdsStrip from "../components/HorizontalAdsStrip";
import ClientSidebar from "../components/ClientSidebar";
import FundiSidebar from "../components/FundiSidebar";

const DefaultSidebar = () => (
  <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 shadow-md p-6">
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
);

const FundiDirectory = () => {
  const [fundis, setFundis] = useState([]);
  const [filteredFundis, setFilteredFundis] = useState([]);
  const [locationCounts, setLocationCounts] = useState({});
  const [skillCounts, setSkillCounts] = useState({});
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const type = localStorage.getItem("user_type");
    setUserType(type || "");
  }, []);

  const fetchFundis = async () => {
    try {
      const res = await axios.get("/accounts/fundis/");
      const availableFundis = res.data.filter((f) => f.is_available);
      setFundis(availableFundis);
      setFilteredFundis(availableFundis);

      const locationCountMap = {};
      const skillCountMap = {};

      availableFundis.forEach((f) => {
        const loc = f.location?.trim();
        if (loc) {
          locationCountMap[loc] = (locationCountMap[loc] || 0) + 1;
        }

        const firstSkill = f.skills?.split(",")[0]?.trim();
        if (firstSkill) {
          skillCountMap[firstSkill] = (skillCountMap[firstSkill] || 0) + 1;
        }
      });

      setLocationCounts(locationCountMap);
      setSkillCounts(skillCountMap);
    } catch (err) {
      console.error("Failed to fetch fundis:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFundis();
  }, []);

  useEffect(() => {
    let filtered = fundis;

    if (selectedLocation) {
      filtered = filtered.filter((f) =>
        f.location?.toLowerCase().includes(selectedLocation.toLowerCase()),
      );
    }

    if (selectedSkill) {
      filtered = filtered.filter((f) =>
        f.skills?.toLowerCase().includes(selectedSkill.toLowerCase()),
      );
    }

    setFilteredFundis(filtered);
  }, [selectedLocation, selectedSkill, fundis]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sidebar (matches dashboard) */}
      {userType === "client" ? (
        <ClientSidebar />
      ) : userType === "fundi" ? (
        <FundiSidebar />
      ) : (
        <DefaultSidebar />
      )}

      {/* Main */}
      <main className="flex-1 py-10 px-4 sm:px-8">
        {/* Title */}
        <div className="max-w-5xl mx-auto mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-2">
            Discover Skilled Fundis Near You
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Browse through verified, available professionals for your job.
          </p>
        </div>

        {/* Sponsored Ads */}
        <section className="mt-8 mb-6">
          <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
            Sponsored Ads Near You
          </h3>
          <HorizontalAdsStrip />
        </section>

        {/* CTA */}
        <div className="max-w-4xl mx-auto bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 p-4 mb-10 rounded-xl shadow-sm">
          Are you a registered Fundi and want to be featured here?{" "}
          <button
            onClick={() => navigate("/register/fundi")}
            className="underline font-semibold hover:text-yellow-900"
          >
            Click here to register now →
          </button>
        </div>

        {/* Filters */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="p-3 rounded-xl bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-600"
          >
            <option value="">🌍 Filter by Location</option>
            {Object.entries(locationCounts)
              .sort()
              .map(([loc, count]) => (
                <option key={loc} value={loc}>
                  {loc} ({count})
                </option>
              ))}
          </select>

          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="p-3 rounded-xl bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-600"
          >
            <option value="">🛠️ Filter by Skill</option>
            {Object.entries(skillCounts)
              .sort()
              .map(([skill, count]) => (
                <option key={skill} value={skill}>
                  {skill} ({count})
                </option>
              ))}
          </select>
        </div>

        {/* Fundi Cards */}
        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="text-center col-span-full text-gray-700 dark:text-gray-300">
              Loading fundis...
            </p>
          ) : filteredFundis.length === 0 ? (
            <p className="text-center col-span-full text-gray-700 dark:text-gray-300">
              No fundis found with current filter.
            </p>
          ) : (
            filteredFundis.map((fundi) => (
              <div
                key={fundi.id}
                onClick={() => navigate(`/fundis/${fundi.id}`)}
                className="cursor-pointer p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 hover:scale-[1.01] transition transform"
              >
                {/* Avatar + Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-2xl font-semibold text-white">
                    {fundi.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      {fundi.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                      <MapPin size={14} />
                      {fundi.location || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                  <Wrench size={14} />
                  <strong>Skills:</strong>{" "}
                  {fundi.skills
                    ? fundi.skills.split(",").slice(0, 2).join(", ")
                    : "N/A"}
                </p>

                {/* Rate */}
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 mb-2">
                  <strong>💰 Rate:</strong>{" "}
                  {fundi.rate_note ? fundi.rate_note : "Not specified"}
                </p>

                {/* Availability */}
                <div className="text-sm flex items-center gap-2 text-green-600 dark:text-green-300 mt-2">
                  <CheckCircle size={16} />
                  Available now
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default FundiDirectory;
