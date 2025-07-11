import { useState, useEffect } from "react";
import axios from "../../lib/axios";
import FundiSidebar from "../../components/FundiSidebar";
import { CheckCircle } from "lucide-react";

export default function FundiSubscription() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [subscriptionEnd, setSubscriptionEnd] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const token = localStorage.getItem("token");

  const isStillSubscribed =
    isActive && subscriptionEnd && new Date(subscriptionEnd) > new Date();

  const fetchFundiProfile = async () => {
    try {
      const res = await axios.get("/accounts/fundis/me/", {
        headers: { Authorization: `Token ${token}` },
      });
      setPhone(res.data.phone_number || "");
      setSubscriptionEnd(res.data.subscription_end || null);
      setIsActive(res.data.is_active || false);
    } catch (err) {
      console.error("Error fetching fundi profile", err);
      setMessage("❌ Failed to fetch subscription info.");
    }
  };

  useEffect(() => {
    fetchFundiProfile();
  }, []);

  const handleSubscribe = async () => {
    if (!phone) {
      setMessage("❌ Please enter your phone number.");
      return;
    }

    setLoading(true);
    setMessage("");
    setShowSuccessAnimation(false);

    try {
      const response = await axios.post(
        "/mpesa/stkpush/",
        { phone, purpose: "subscription" },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.checkout_id) {
        setMessage(
          `✅ STK Push sent to ${phone}. You will receive an M-Pesa prompt shortly. Please do NOT refresh or close this page.`,
        );

        // Start polling for subscription status
        const pollInterval = setInterval(async () => {
          try {
            const checkRes = await axios.get("/accounts/fundis/me/", {
              headers: { Authorization: `Token ${token}` },
            });
            if (
              checkRes.data.is_active &&
              new Date(checkRes.data.subscription_end) > new Date()
            ) {
              clearInterval(pollInterval);
              setIsActive(true);
              setSubscriptionEnd(checkRes.data.subscription_end);
              setShowSuccessAnimation(true);
              setMessage("✅ Subscription activated successfully!");
            }
          } catch (pollError) {
            console.error("Polling failed:", pollError);
          }
        }, 5000); // poll every 5 seconds
      } else {
        setMessage("ℹ️ " + (response.data.message || "STK Push sent."));
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.error || "Something went wrong. Try again.";
      setMessage("❌ " + errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <FundiSidebar />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400">
            Fundi Subscription
          </h2>

          {/* ✅ Success Animation */}
          {showSuccessAnimation && (
            <div className="flex flex-col items-center space-y-2 text-green-600 dark:text-green-300">
              <CheckCircle size={64} className="animate-bounce" />
              <p className="text-xl font-semibold">Subscription Activated!</p>
            </div>
          )}

          {/* Subscription status */}
          <div className="text-center space-y-2">
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                isStillSubscribed
                  ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                  : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
              }`}
            >
              Subscription: {isStillSubscribed ? "Active" : "Inactive"}
            </span>
            {subscriptionEnd && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(subscriptionEnd) > new Date()
                  ? "Expires on: "
                  : "Expired on: "}
                <strong className="text-gray-900 dark:text-white">
                  {new Date(subscriptionEnd).toLocaleDateString("en-KE", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </strong>
              </p>
            )}
          </div>

          {/* Phone input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
              placeholder="e.g. 0712345678"
              disabled={isStillSubscribed}
            />
          </div>

          {/* Subscribe Button */}
          <button
            onClick={handleSubscribe}
            disabled={loading || isStillSubscribed}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-transform transform hover:scale-105 disabled:opacity-50"
          >
            {isStillSubscribed
              ? "Subscription Active"
              : loading
                ? "Processing..."
                : "Subscribe for Ksh 200"}
          </button>

          {/* Message box */}
          {message && (
            <div
              className={`p-3 text-sm text-center rounded-lg ${
                message.startsWith("✅")
                  ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                  : message.startsWith("❌")
                    ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
                    : "bg-blue-100 text-blue-800 dark:bg-gray-800 dark:text-blue-300"
              }`}
            >
              {message}
            </div>
          )}

          {/* Note */}
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            {isStillSubscribed ? (
              <>You can renew your subscription after it expires.</>
            ) : (
              <>
                Once you confirm the payment on your phone, your subscription
                will be activated instantly. Please do NOT refresh or close this
                page.
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
