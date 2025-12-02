import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import axios from "axios";
import SellerSidebar from "../../components/SellerSidebar";
import DefaultSidebar from "../../components/DefaultSidebar";
import { BASE_URL } from "../../lib/axios";

const BUSINESS_PAYBILL = "123456"; // Replace with actual Paybill

const ItemPayment = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [mpesaRef, setMpesaRef] = useState("");
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // Fetch item details
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${BASE_URL}items/${itemId}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setItem(res.data);
      } catch (err) {
        console.error("Failed to fetch item:", err);
      }
    };
    fetchItem();
  }, [itemId, token]);

  const handlePay = async () => {
    if (!mpesaRef || mpesaRef.trim().length < 6) {
      setMessage("Enter a valid MPESA reference.");
      return;
    }

    setLoading(true);
    setDisabled(true);
    setMessage("");
    setShowSuccess(false);
    setShowFailed(false);

    try {
      await axios.patch(
        `${BASE_URL}items/${itemId}/`,
        { is_active: true, is_paid: true, mpesa_ref: mpesaRef },
        { headers: { Authorization: `Token ${token}` } }
      );

      setShowSuccess(true);
      setMessage("Payment confirmed! Item is now active.");
      setTimeout(() => navigate("/dashboard/seller/items"), 2000);
    } catch (err) {
      console.error("Failed to confirm payment:", err);
      setShowFailed(true);
      setMessage("Failed to confirm payment. Try again.");
      setDisabled(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sidebar */}
      {item?.seller?.id ? <SellerSidebar /> : <DefaultSidebar />}

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-green-700 dark:text-green-400">
            Pay for Item
          </h2>

          {item && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl space-y-2">
              <p>
                <strong>Item:</strong> {item.name}
              </p>
              <p>
                <strong>Price:</strong> KSh {item.price || "N/A"}
              </p>
              {item.offer && (
                <p>
                  <strong>Offer:</strong> {item.offer}
                </p>
              )}
            </div>
          )}

          <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 rounded-xl text-yellow-800 dark:text-yellow-200">
            <p>
              To pay, use the business Paybill number:{" "}
              <strong>{BUSINESS_PAYBILL}</strong>
            </p>
            <p>Enter your MPESA reference below after completing the payment.</p>
          </div>

          {showSuccess && (
            <div className="bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 p-4 rounded-xl text-center">
              <CheckCircle
                size={40}
                className="text-green-600 dark:text-green-300 mx-auto mb-2"
              />
              <p className="text-lg font-semibold text-green-700 dark:text-green-200">
                Payment Confirmed!
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Redirecting to your items...
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
                Payment Failed
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
                  MPESA Reference
                </label>
                <input
                  type="text"
                  value={mpesaRef}
                  onChange={(e) => setMpesaRef(e.target.value)}
                  placeholder="Enter your MPESA reference"
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
                  "Confirm Payment"
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

export default ItemPayment;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import axios from "axios";
import SellerSidebar from "../../components/SellerSidebar";
import DefaultSidebar from "../../components/DefaultSidebar";
import { BASE_URL } from "../../lib/axios";

const BUSINESS_PAYBILL = "123456"; // Replace with actual Paybill

const ItemPayment = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [mpesaRef, setMpesaRef] = useState("");
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // Fetch item details
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${BASE_URL}items/${itemId}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setItem(res.data);
      } catch (err) {
        console.error("Failed to fetch item:", err);
      }
    };
    fetchItem();
  }, [itemId, token]);

  const handlePay = async () => {
    if (!mpesaRef || mpesaRef.trim().length < 6) {
      setMessage("Enter a valid MPESA reference.");
      return;
    }

    setLoading(true);
    setDisabled(true);
    setMessage("");
    setShowSuccess(false);
    setShowFailed(false);

    try {
      await axios.patch(
        `${BASE_URL}items/${itemId}/`,
        { is_active: true, is_paid: true, mpesa_ref: mpesaRef },
        { headers: { Authorization: `Token ${token}` } }
      );

      setShowSuccess(true);
      setMessage("Payment confirmed! Item is now active.");
      setTimeout(() => navigate("/dashboard/seller/items"), 2000);
    } catch (err) {
      console.error("Failed to confirm payment:", err);
      setShowFailed(true);
      setMessage("Failed to confirm payment. Try again.");
      setDisabled(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sidebar */}
      {item?.seller?.id ? <SellerSidebar /> : <DefaultSidebar />}

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-green-700 dark:text-green-400">
            Pay for Item
          </h2>

          {item && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl space-y-2">
              <p>
                <strong>Item:</strong> {item.name}
              </p>
              <p>
                <strong>Price:</strong> KSh {item.price || "N/A"}
              </p>
              {item.offer && (
                <p>
                  <strong>Offer:</strong> {item.offer}
                </p>
              )}
            </div>
          )}

          <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 rounded-xl text-yellow-800 dark:text-yellow-200">
            <p>
              To pay, use the business Paybill number:{" "}
              <strong>{BUSINESS_PAYBILL}</strong>
            </p>
            <p>Enter your MPESA reference below after completing the payment.</p>
          </div>

          {showSuccess && (
            <div className="bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 p-4 rounded-xl text-center">
              <CheckCircle
                size={40}
                className="text-green-600 dark:text-green-300 mx-auto mb-2"
              />
              <p className="text-lg font-semibold text-green-700 dark:text-green-200">
                Payment Confirmed!
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Redirecting to your items...
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
                Payment Failed
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
                  MPESA Reference
                </label>
                <input
                  type="text"
                  value={mpesaRef}
                  onChange={(e) => setMpesaRef(e.target.value)}
                  placeholder="Enter your MPESA reference"
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
                  "Confirm Payment"
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

export default ItemPayment;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import axios from "axios";
import SellerSidebar from "../../components/SellerSidebar";
import DefaultSidebar from "../../components/DefaultSidebar";
import { BASE_URL } from "../../lib/axios";

const BUSINESS_PAYBILL = "123456"; // Replace with actual Paybill

const ItemPayment = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [mpesaRef, setMpesaRef] = useState("");
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // Fetch item details
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${BASE_URL}items/${itemId}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setItem(res.data);
      } catch (err) {
        console.error("Failed to fetch item:", err);
      }
    };
    fetchItem();
  }, [itemId, token]);

  const handlePay = async () => {
    if (!mpesaRef || mpesaRef.trim().length < 6) {
      setMessage("Enter a valid MPESA reference.");
      return;
    }

    setLoading(true);
    setDisabled(true);
    setMessage("");
    setShowSuccess(false);
    setShowFailed(false);

    try {
      await axios.patch(
        `${BASE_URL}items/${itemId}/`,
        { is_active: true, is_paid: true, mpesa_ref: mpesaRef },
        { headers: { Authorization: `Token ${token}` } }
      );

      setShowSuccess(true);
      setMessage("Payment confirmed! Item is now active.");
      setTimeout(() => navigate("/dashboard/seller/items"), 2000);
    } catch (err) {
      console.error("Failed to confirm payment:", err);
      setShowFailed(true);
      setMessage("Failed to confirm payment. Try again.");
      setDisabled(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sidebar */}
      {item?.seller?.id ? <SellerSidebar /> : <DefaultSidebar />}

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-green-700 dark:text-green-400">
            Pay for Item
          </h2>

          {item && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl space-y-2">
              <p>
                <strong>Item:</strong> {item.name}
              </p>
              <p>
                <strong>Price:</strong> KSh {item.price || "N/A"}
              </p>
              {item.offer && (
                <p>
                  <strong>Offer:</strong> {item.offer}
                </p>
              )}
            </div>
          )}

          <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 rounded-xl text-yellow-800 dark:text-yellow-200">
            <p>
              To pay, use the business Paybill number:{" "}
              <strong>{BUSINESS_PAYBILL}</strong>
            </p>
            <p>Enter your MPESA reference below after completing the payment.</p>
          </div>

          {showSuccess && (
            <div className="bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 p-4 rounded-xl text-center">
              <CheckCircle
                size={40}
                className="text-green-600 dark:text-green-300 mx-auto mb-2"
              />
              <p className="text-lg font-semibold text-green-700 dark:text-green-200">
                Payment Confirmed!
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Redirecting to your items...
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
                Payment Failed
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
                  MPESA Reference
                </label>
                <input
                  type="text"
                  value={mpesaRef}
                  onChange={(e) => setMpesaRef(e.target.value)}
                  placeholder="Enter your MPESA reference"
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
                  "Confirm Payment"
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

export default ItemPayment;
