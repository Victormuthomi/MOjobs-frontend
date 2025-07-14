import React, { useEffect, useState } from "react";
import { Trash2, PlusCircle, ExternalLink, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "../../lib/axios";
import toast from "react-hot-toast";
import ClientSidebar from "../../components/ClientSidebar";

const ClientAdsPage = () => {
  const [ads, setAds] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/login/client");
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const res = await axios.get("/ads/mine/", {
        headers: { Authorization: `Token ${token}` },
      });
      setAds(res.data);
    } catch (err) {
      toast.error("Failed to load your ads.");
    }
  };

  const deleteAd = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;
    try {
      await axios.delete(`/ads/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      toast.success("Ad deleted.");
      fetchAds();
    } catch (err) {
      toast.error("Failed to delete ad.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <ClientSidebar />

      <main className="flex-1 px-4 py-6 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            Manage Your Ads
          </h1>
          <button
            onClick={() => navigate("/dashboard/client/ads/add")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition text-sm sm:text-base"
          >
            <PlusCircle size={18} />
            Post a New Ad
          </button>
        </div>

        {ads.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            You haven't posted any ads yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md flex flex-col justify-between"
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-1">
                  {ad.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-3">
                  {ad.description}
                </p>

                {ad.link && (
                  <a
                    href={ad.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mb-2"
                  >
                    <ExternalLink size={14} />
                    Visit Link
                  </a>
                )}

                {ad.expires_at && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-4">
                    <CalendarCheck size={14} />
                    Expires: {new Date(ad.expires_at).toLocaleDateString()}
                  </p>
                )}

                {!ad.is_active && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mb-2">
                    Inactive – Payment required
                  </p>
                )}

                <div className="flex justify-end gap-3 mt-auto pt-2">
                  {!ad.is_active && (
                    <button
                      onClick={() =>
                        navigate(`/dashboard/client/ads/pay/${ad.id}`)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Pay Now
                    </button>
                  )}
                  <button
                    onClick={() => deleteAd(ad.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientAdsPage;
