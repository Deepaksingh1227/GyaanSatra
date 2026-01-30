const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: String,
  session: String,
  orderId: String,
  paymentId: String
});

module.exports = mongoose.model("Payment", paymentSchema);
