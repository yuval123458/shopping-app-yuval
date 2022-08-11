const { findLastIndex } = require("lodash");
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      img: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      color: { type: String, required: false },
      size: { type: String, required: true },
      configure: { type: Boolean, required: true },
    },
  ],
  wishlist: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      img: { type: String, required: true },
    },
  ],
});

module.exports = Cart = new mongoose.model("Cart", cartSchema);
