import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import ClientSidebar from "../../components/ClientSidebar";
// import axios from "../../lib/axios"; // Commented out for fake payment

const ClientAdPayment = () => {
  const { adId } = useParams();
  const navigate = useNavigate();
  // const token = localStorage.getItem("token"); // Commented out for fake payment

  const [mpesaRef, setMpesaRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState("");

  // Temporary hardcoded payment details
  const amount = 200;
  const paybill = "247247";
  const accountNumber = "103018689971";

  const handleFakePayment = (e) => {
    e.preventDefault();

    if (!mpesaRef.trim()) {
      setMessage("Please enter a valid MPESA reference.");
      return;
    }

    setLoading(true);
    setMessage("");

    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setMessage("Payment successful!");

      // Simulate redirect after 1.5s
      setTimeout(() => navigate("/dashboard/client/ads"), 1500);
    }, 1200);
  };

  /* 
  // ===== Original STK Push code (commented out for manual testing) =====
  const [phone, setPhone] = useState("");
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
  // ===== End of original code =====
  */

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

          {!showSuccess && (
            <>
              <div className="p-6 border-2 rounded-xl bg-gray-50 dark:bg-gray-700 mb-4 space-y-2">
                <p className="text-lg font-semibold">
                  Paybill: <span className="font-normal">{paybill}</span>
                </p>
                <p className="text-lg font-semibold">
                  Account Number:{" "}
                  <span className="font-normal">{accountNumber}</span>
                </p>
                <p className="text-lg font-semibold">
                  Amount: <span className="font-normal">Ksh {amount}</span>
                </p>
              </div>

              <form onSubmit={handleFakePayment} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                    MPESA Reference
                  </label>
                  <input
                    type="text"
                    value={mpesaRef}
                    onChange={(e) => setMpesaRef(e.target.value)}
                    placeholder="Enter MPESA ref here"
                    className="w-full border rounded p-2 bg-white dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-transform transform hover:scale-105 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex justify-center items-center gap-2">
                      <Loader2 className="animate-spin" size={18} />
                      Processing...
                    </span>
                  ) : (
                    "Submit Payment"
                  )}
                </button>
              </form>
            </>
          )}

          {message && (
            <p className="text-center text-sm text-gray-800 dark:text-gray-300 mt-2">
              {message}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClientAdPayment;
