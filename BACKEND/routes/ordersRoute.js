const express = require("express");
const checkAuth = require("../middleware/CheckAuth");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

const router = express.Router();

//    POST cart to order
//    /api/orders/
//    access: private

router.post(
  "/",
  checkAuth,
  [
    check("address", "Please fill in an address").not().isEmpty(),
    check("creditCardNumber", "Please fill in credit card number")
      .not()
      .isEmpty(),
    check("creditCardExpiration", "Please fill in credit card expire date")
      .not()
      .isEmpty(),
    check("creditCardNumber", "Please fill in credit card safe number")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json(errors.array());
    }

    let user = await User.findById(req.userId).select("cart");

    try {
      const newOrder = new Order({
        cart: user.cart,
        address: req.body.address,
        name: req.body.name,
        creditCard: {
          creditCardNumber: req.body.creditCardNumber,
          creditCardExp: req.body.creditCardExpiration,
          CVV: req.body.CVV,
        },
        status: "sent",
      });

      console.log("new order1" + newOrder);

      const salt = await bcrypt.genSalt(10);

      newOrder.creditCard.creditCardNumber = await bcrypt.hash(
        req.body.creditCardNumber,
        salt
      );
      newOrder.creditCard.creditCardExp = await bcrypt.hash(
        req.body.creditCardExpiration,
        salt
      );
      newOrder.creditCard.CVV = await bcrypt.hash(req.body.CVV, salt);

      console.log("new order2" + newOrder);

      await newOrder.save();

      res.json({ order: newOrder });
    } catch (error) {
      return res.status(500).json("server error");
    }
  }
);

module.exports = router;
