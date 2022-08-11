const express = require("express");
const checkAuth = require("../middleware/CheckAuth");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const router = express.Router();
const { check } = require("express-validator");
const { validationResult } = require("express-validator");

//   GET user's cart
//   /api/cart/
//   access: private

router.get("/", checkAuth, async (req, res) => {
  let cart;

  try {
    cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      return res.status(500).json("server error");
    }

    return res.json({ cart: cart });
  } catch (error) {
    return res.status(500).json("server error");
  }
});

//   POST add product to cart
//   /api/cart/
//   access: private

router.post(
  "/",
  checkAuth,
  [
    check("size", "size must be filled").not().equals("#"),
    check("color", "color must be filled").not().isEmpty(),
    check("quantity", "quantity must stay between 1-5")
      .isLength({ min: 1 })
      .isLength({ max: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(403).json({ errors: errors.array() });
    }
    const user = await User.findById(req.userId);
    const cart = await Cart.findById(user.cart);

    if (req.userId !== cart.user.toString()) {
      return res.status(401).json("yout not allowed!");
    }
    try {
      const { productId, size, color, quantity, title, price, img, configure } =
        req.body;

      cart.products.unshift({
        productId: productId,
        title: title,
        price: price,
        img: img,
        size: size,
        color: color,
        quantity: quantity,
        configure: configure,
      });

      await cart.save();

      return res.json(cart);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("server error");
    }
  }
);

//   PUT product to cart no confg
//   /api/cart/confg
//   access: private

router.put("/confg", checkAuth, async (req, res) => {
  const { Id } = req.body;

  let product;
  let cart;

  try {
    product = await Product.findById(Id);

    console.log(product);

    cart = await Cart.findOne({ user: req.userId });

    console.log(cart);

    cart.products.unshift({
      productId: Id,
      title: product.title,
      price: product.price,
      img: product.img,
      quantity: 0,
      color: "",
      size: "#",
      configure: true,
    });

    await cart.save();

    return res.json(cart);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("server error");
  }
});

//   PUT toggle product from wishList
//   /api/cart
//   access: private

router.put("/", checkAuth, async (req, res) => {
  const { pId } = req.body;

  console.log(pId);

  let product;
  let cart;
  let existing;

  console.log(req.userId);

  try {
    product = await Product.findById(pId);
  } catch (error) {
    console.log("no product");
    return res.status(500).json("server error");
  }
  try {
    cart = await Cart.findOne({ user: req.userId });

    existing = cart.wishlist.filter((prod) => prod._id.toString() === pId);

    console.log(existing);

    if (existing.length > 0) {
      cart.wishlist = cart.wishlist.filter(
        (prod) => prod._id.toString() !== pId
      );
      console.log(cart.wishlist);
      console.log("removed");
    } else {
      cart.wishlist.unshift(product);
      console.log("added");
    }

    await cart.save();

    return res.json(cart.wishlist);
  } catch (error) {
    console.log("no cart");
  }
});

//   DELETE a product from cart
//   /api/cart
//   access: private

router.delete("/:productId", checkAuth, async (req, res) => {
  let cart;

  try {
    cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      return res.status(500).json("no cart found");
    }

    cart.products = cart.products.filter(
      (prod) => prod._id.toString() !== req.params.productId
    );

    await cart.save();

    return res.json({ cart: cart });
  } catch (error) {
    return res.status(500).json("server error");
  }
});

module.exports = router;
