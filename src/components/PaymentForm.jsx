// src/components/PaymentForm.jsx
import React, { useState } from "react";
import { Loader2, DollarSign } from "lucide-react";
import toast from "react-hot-toast";
import axios, { BASE_URL } from "../lib/axios.js";

const PaymentForm = ({
  itemId,
  fee,
  feeType,
  paybill,
  accountNumber,
  token,
  onSuccess,
}) => {
  const [mpesaRef, setMpesaRef] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!mpesaRef) return toast.error("MPESA reference is required.");

    try {
      setLoading(true);
      await axios.patch(
        `${BASE_URL}marketplace/items/${itemId}/`,
        { mpesa_ref: mpesaRef },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Item activated successfully!");
      onSuccess();
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Failed to activate item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePaymentSubmit} className="space-y-4">
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Pay Ksh <span className="font-bold">{fee}</span> via MPESA.
      </p>
      {feeType && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{feeType}</p>
      )}
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Paybill: <span className="font-bold">{paybill}</span>, Account:{" "}
        <span className="font-bold">{accountNumber}</span>
      </p>
      <div className="flex items-start gap-3 bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg">
        <span className="text-green-600 pt-1">
          <DollarSign size={18} />
        </span>
        <input
          type="text"
          name="mpesa_ref"
          placeholder="MPESA Reference"
          value={mpesaRef}
          onChange={(e) => setMpesaRef(e.target.value)}
          required
          className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg text-lg font-medium text-white transition ${
          loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? (
          <span className="flex justify-center items-center gap-2">
            <Loader2 className="animate-spin" size={18} /> Activating...
          </span>
        ) : (
          "Activate Item"
        )}
      </button>
    </form>
  );
};

export default PaymentForm;
