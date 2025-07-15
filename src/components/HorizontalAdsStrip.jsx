import React, { useEffect, useState, useRef } from "react";
import api from "../lib/axios";

const HorizontalAdsStrip = () => {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await api.get("/ads/");
        setAds(res.data || []);
      } catch (error) {
        console.error("Failed to fetch ads:", error);
      }
    };

    fetchAds();
  }, []);

  useEffect(() => {
    if (ads.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 6000);

    return () => clearInterval(intervalRef.current);
  }, [ads]);

  if (ads.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-300 py-6">
        No ads available right now.
      </div>
    );
  }

  const ad = ads[currentIndex];

  return (
    <div className="w-full flex justify-center items-center py-4 px-2">
      <a
        href={ad.link || "#"}
        target={ad.link ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="block w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-500 transform hover:scale-[1.01] border border-gray-200 dark:border-gray-700"
        key={ad.id}
      >
        {ad.image_url ? (
          <img
            src={ad.image_url}
            alt={ad.title}
            className="w-full h-auto object-contain rounded-t-lg"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-t-lg text-gray-500">
            No Image
          </div>
        )}

        {(ad.title || ad.description || ad.link) && (
          <div className="p-3 space-y-1">
            {ad.title && (
              <h3 className="text-blue-700 dark:text-blue-300 font-semibold text-lg truncate">
                {ad.title}
              </h3>
            )}
            {ad.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {ad.description}
              </p>
            )}
            {ad.link && (
              <p className="text-xs text-blue-600 dark:text-blue-400 underline pt-1">
                Learn more
              </p>
            )}
          </div>
        )}
      </a>
    </div>
  );
};

export default HorizontalAdsStrip;
