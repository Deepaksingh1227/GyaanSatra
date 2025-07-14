const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment, checkAccess } = require("../controllers/paymentController");
const { auth } = require("../middleware/authMiddleware");

// ✅ Add this route to expose Razorpay Key ID to frontend
router.get("/get-key", (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
});

router.post("/create-order", auth, createOrder);
router.post("/verify", auth, verifyPayment);
router.get("/has-access/:session", auth, checkAccess);

module.exports = router;
