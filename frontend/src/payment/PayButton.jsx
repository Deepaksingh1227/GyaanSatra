import React from "react";
import axios from "../api/axios"; // ✅ custom axios instance
import { useNavigate } from "react-router-dom"; // ✅ Added for redirection

const PayButton = ({ category = "forensics" }) => {
  const navigate = useNavigate(); // ✅ Hook for navigation
  const token = localStorage.getItem("token");

  const [isProcessing, setIsProcessing] = React.useState(false);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
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
          console.log("Razorpay Response received:", response);
          try {
            // 4. Verify payment
            await axios.post(
              "/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                category
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            alert("Payment Successful!");
            // Programmatically navigate to the specific notes page instead of just reloading
            navigate(`/session/${category}`);
          } catch (verifyErr) {
            console.error("Verification Error:", verifyErr);
            alert("Payment verification failed. Please check your internet or contact support.");
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
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
      alert("Payment failed or cancelled. Try again later.");
      setIsProcessing(false);
    }
  };

  return (
    <button
      className="btn btn-warning"
      onClick={handlePayment}
      disabled={isProcessing}
    >
      {isProcessing ? "Processing..." : "Pay ₹1 to Unlock"}
    </button>
  );
};

export default PayButton;
