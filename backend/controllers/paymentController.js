const Razorpay = require("razorpay");
const Payment = require("../models/Payment");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: 100, // Razorpay amounts are in paise (e.g., 100 = 1 INR)
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
    const { order_id, razorpay_payment_id, category } = req.body;
    await Payment.create({
      userId: req.user.id,
      orderId: order_id,
      paymentId: razorpay_payment_id,
      session: category,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({ error: "Failed to verify payment" });
  }
};

exports.checkAccess = async (req, res) => {
  try {
    const found = await Payment.findOne({ userId: req.user.id, session: req.params.session });
    res.json({ allowed: !!found });
  } catch (error) {
    console.error("Access Check Error:", error);
    res.status(500).json({ error: "Failed to check payment access" });
  }
};
