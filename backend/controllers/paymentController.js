const Razorpay = require("razorpay");
const Payment = require("../models/Payment");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: 100, // 1 INR in paise (Setting to ₹1 for testing as requested)
      currency: "INR",
      receipt: "order_rcptid_" + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ error: "Failed to create payment order" });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, category } = req.body;

    console.log("Verifying payment:", { razorpay_order_id, razorpay_payment_id, category });
    console.log("User info from token:", req.user);

    if (!razorpay_order_id || !razorpay_payment_id || !category) {
      console.error("Missing payment fields in request body");
      return res.status(400).json({ error: "Missing required payment fields" });
    }

    const newPayment = await Payment.create({
      userId: req.user.id,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      session: category,
    });

    console.log("Payment record created:", newPayment);
    res.sendStatus(200);
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({ error: "Failed to verify payment" });
  }
};

exports.checkAccess = async (req, res) => {
  try {
    console.log("Checking access for session:", req.params.session);
    console.log("User info from token:", req.user);

    // 1. Check if user is admin – admins get access to everything
    const adminEmails = ["admin@gyaansatra.com", "divyanthakur856@gmail.com"];

    if (req.user && (req.user.role === "admin" || adminEmails.includes(req.user.email))) {
      console.log("Access granted: Admin user detected");
      return res.json({ allowed: true });
    }

    // 2. Check if payment exists in database
    const found = await Payment.findOne({
      userId: req.user.id,
      session: req.params.session
    });

    console.log("Payment search result:", found);
    res.json({ allowed: !!found });
  } catch (error) {
    console.error("Access Check Error:", error);
    res.status(500).json({ error: "Failed to check payment access" });
  }
};
