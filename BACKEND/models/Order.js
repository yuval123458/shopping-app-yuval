const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  address: { type: String, required: true },
  status: { type: String, default: "pending" },
  name: { type: String, required: true },
  creditCard: {
    creditCardNumber: { type: String, required: true },
    creditCardExp: { type: String, required: true },
    CVV: { type: String, required: true },
  },
});

module.exports = Order = new mongoose.model("Order", orderSchema);
