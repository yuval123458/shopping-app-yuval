const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const config = require("config");
const KEY = config.get("stripeSecretKey");
const stripe = Stripe(KEY);
const checkAuth = require("../middleware/CheckAuth");
const Cart = require("../models/Cart");

router.post("/payment", checkAuth, async (req, res) => {
  console.log("stripe charge");
  console.log("payment req.body amount" + req.body.amount);
  console.log("payment req.body tokenId" + req.body.tokenId);
  try {
    const charge = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
      description: "test charges",
    });

    let cart = await Cart.findOne({ user: req.userId });

    cart.products = [];
    await cart.save();

    return res.json(charge);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
