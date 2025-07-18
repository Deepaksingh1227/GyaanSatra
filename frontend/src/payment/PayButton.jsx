// src/payments/PayButton.jsx
import React from "react";
import axios from "../api/axios"; // ✅ custom axios instance

const PayButton = ({ category }) => {
  const token = localStorage.getItem("token");

  const handlePayment = async () => {
    try {
      // 1. Get Razorpay Key ID from backend
      const { data: keyRes } = await axios.get("/api/payment/get-key");
      const razorpayKey = keyRes.key;

      // 2. Create Razorpay order
      const { data } = await axios.post(
        "/api/payment/create-order",
        { category },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 3. Razorpay checkout options
      const options = {
        key: razorpayKey,
        amount: data.amount,
        currency: "INR",
        name: "GyaanSatra",
        description: `Unlock ${category} Notes`,
        order_id: data.id,
        handler: async function (response) {
          // 4. Verify payment
          await axios.post(
            "/api/payment/verify",
            { ...response, category },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          alert("Payment Successful!");
          window.location.reload();
        },
        prefill: {
          name: "GyaanSatra User",
          email: "user@example.com", // optional
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment failed. Try again later.");
    }
  };

  return (
    <button className="btn btn-warning" onClick={handlePayment}>
      Pay ₹1 to Unlock
    </button>
  );
};

export default PayButton;
