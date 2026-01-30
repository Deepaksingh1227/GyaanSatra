const Razorpay = require("razorpay");
const Payment = require("../models/Payment");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  const options = {
    amount: 99900, // ₹99900 = INR 999
    currency: "INR",
    receipt: "order_rcptid_" + Date.now(),
  };
  const order = await razorpay.orders.create(options);
  res.json(order);
};

exports.verifyPayment = async (req, res) => {
  const { order_id, razorpay_payment_id, category } = req.body;
  await Payment.create({
    userId: req.user.id,
    orderId: order_id,
    paymentId: razorpay_payment_id,
    session: category,
  });
  res.sendStatus(200);
};

exports.checkAccess = async (req, res) => {
  const found = await Payment.findOne({ userId: req.user.id, session: req.params.session });
  res.json({ allowed: !!found });
};
