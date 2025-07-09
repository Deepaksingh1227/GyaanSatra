import React from "react";
import axios from "axios";

function PayButton({ onSuccess }) {
  const handlePayment = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) return alert("Razorpay SDK failed to load.");

    const order = await axios.post("http://localhost:5000/api/payment/create-order");
    const options = {
      key: "rzp_test_XXXXXXXX", // Replace with your Razorpay Test Key
      amount: order.data.amount,
      currency: "INR",
      name: "GyaanSatra",
      description: "Unlock Study Notes",
      order_id: order.data.id,
      handler: function (response) {
        alert("Payment successful!");
        onSuccess(); // Unlock access
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment} className="btn btn-success">Pay ₹499 to Unlock</button>;
}

const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default PayButton;
