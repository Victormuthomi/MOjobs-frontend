import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Tag, Phone, MessageCircle, ArrowLeft } from "lucide-react";
import HorizontalAdsStrip from "../../components/HorizontalAdsStrip.jsx";
import axios, { BASE_URL } from "../../lib/axios.js"; // <-- switched to axios

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${BASE_URL}marketplace/items/${id}/`);
        setItem(res.data);
      } catch (err) {
        console.error("Failed to fetch item details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-700 dark:text-gray-300">
        Loading item details...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="text-center py-20 text-red-600 dark:text-red-400">
        Item not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4 sm:px-8 flex flex-col md:flex-row">
      <main className="flex-1">
        {/* Back Button */}
        <div className="max-w-3xl mx-auto mb-4">
          <button
            onClick={() => navigate("/items")}
            className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            Back to Items
          </button>
        </div>

        {/* Sponsored Ads */}
        <section className="mt-8 mb-6">
          <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
            Sponsored Ads Near You
          </h3>
          <HorizontalAdsStrip />
        </section>

        {/* Safety Notice */}
        <div className="max-w-3xl mx-auto bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 p-4 mb-6 rounded-xl border-l-4 border-yellow-500">
          <strong>⚠️ Safety Notice:</strong> Only pay for items after confirming
          that the item exists and is available. Mojobs is not responsible for
          any off-platform or advance payments.
        </div>

        {/* Item Card */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 mb-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src={item.image_url || "/images/default-item.png"}
              alt={item.title}
              className="w-full md:w-48 h-48 object-cover rounded-xl shadow-md"
            />
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {item.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {item.description}
              </p>
              <p className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <Tag size={16} />
                <strong>Category:</strong> {item.category || "Not specified"}
              </p>
              <p className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <MapPin size={16} />
                <strong>Location:</strong> {item.location || "Not specified"}
              </p>
              <p className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                💰 <strong>Price:</strong>{" "}
                {item.price ? `KSh ${item.price}` : "Not specified"}
              </p>
            </div>
          </div>

          {/* Seller Contact */}
          {item.contact_call && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Seller Contact:
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-gray-900 dark:text-white text-lg">
                  {item.seller_name}
                </span>
                <span className="text-gray-900 dark:text-white text-lg">
                  {item.contact_call}
                </span>
                <a
                  href={`tel:${item.contact_call}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <Phone size={16} />
                  Call
                </a>
                <a
                  href={`https://wa.me/254${item.contact_call.slice(1)}`}
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

        {/* Seller Register CTA */}
        <div className="max-w-2xl mx-auto bg-green-100 border-l-4 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-200 p-4 rounded-xl shadow-sm text-center">
          Are you a seller and want to list your items on Mojobs?{" "}
          <button
            onClick={() => navigate("/register/seller")}
            className="underline font-semibold hover:text-green-900"
          >
            Register Now →
          </button>
        </div>
      </main>
    </div>
  );
};

export default ItemDetail;
