import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../lib/axios";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import ClientSidebar from "../../components/ClientSidebar";

const ClientAdPayment = () => {
  const { adId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // Fetch user phone number
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/accounts/clients/me/", {
          headers: { Authorization: `Token ${token}` },
        });
        setPhone(res.data.phone_number || "");
      } catch {
        console.error("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, [token]);

  // Pre-check if ad is already active
  useEffect(() => {
    const checkIfAdIsActive = async () => {
      try {
        const res = await axios.get(`/ads/${adId}/`, {
          headers: { Authorization: `Token ${token}` },
        });

        if (res.data.is_active) {
          setDisabled(true);
          setShowSuccess(true);
          setTimeout(() => navigate("/dashboard/client/ads"), 2500);
        }
      } catch {
        // Silent fail
      }
    };
    if (adId) checkIfAdIsActive();
  }, [adId, token, navigate]);

  const handlePay = async () => {
    if (!phone || !/^\d{10}$/.test(phone)) {
      setMessage("Enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    setDisabled(true);
    setMessage("");
    setShowSuccess(false);
    setShowFailed(false);

    try {
      const res = await axios.post(
        "/mpesa/stkpush/",
        { phone, purpose: "post_ad", ad_id: adId },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const { checkout_id } = res.data;
      if (!checkout_id) {
        setMessage("Failed to get payment session.");
        setLoading(false);
        setDisabled(false);
        return;
      }

      setMessage(`✅ STK Push sent to ${phone}. Confirm on your phone.`);

      // Poll every 4 seconds to check if ad is active
      let attempts = 0;
      const maxAttempts = 12;
      const interval = setInterval(async () => {
        attempts++;
        if (attempts > maxAttempts) {
          clearInterval(interval);
          setShowFailed(true);
          setMessage("Payment not completed. Try again.");
          setDisabled(false);
          return;
        }

        try {
          const pollRes = await axios.get(`/ads/${adId}/`, {
            headers: { Authorization: `Token ${token}` },
          });

          if (pollRes.data.is_active) {
            clearInterval(interval);
            setShowSuccess(true);
            setMessage("Payment successful!");
            setTimeout(() => navigate("/dashboard/client/ads"), 2000);
          }
        } catch {
          // Silent retry
        }
      }, 4000);
    } catch {
      setMessage("Failed to initiate STK push.");
      setDisabled(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <ClientSidebar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-green-700 dark:text-green-400">
            Pay to Publish Ad
          </h2>

          {showSuccess && (
            <div className="bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 p-4 rounded-xl text-center">
              <CheckCircle
                size={40}
                className="text-green-600 dark:text-green-300 mx-auto mb-2"
              />
              <p className="text-lg font-semibold text-green-700 dark:text-green-200">
                Payment Successful!
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Redirecting to your ads...
              </p>
            </div>
          )}

          {showFailed && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-300 dark:border-red-700 p-4 rounded-xl text-center">
              <XCircle
                size={40}
                className="text-red-600 dark:text-red-300 mx-auto mb-2"
              />
              <p className="text-lg font-semibold text-red-700 dark:text-red-200">
                Payment Failed or Timed Out
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Please try again.
              </p>
            </div>
          )}

          {!showSuccess && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0712345678"
                  disabled={loading || disabled}
                  className="w-full p-3 border rounded-xl bg-white dark:bg-gray-700 dark:text-white"
                />
              </div>

              <button
                onClick={handlePay}
                disabled={loading || disabled}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-transform transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex justify-center items-center gap-2">
                    <Loader2 className="animate-spin" size={18} />
                    Processing...
                  </span>
                ) : (
                  "Pay Ksh 500 to Publish Ad"
                )}
              </button>
            </>
          )}

          {message && (
            <p className="text-center text-sm text-gray-800 dark:text-gray-300">
              {message}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClientAdPayment;
