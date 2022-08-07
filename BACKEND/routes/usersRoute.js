const express = require("express");
const bcrpyt = require("bcryptjs");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const Cart = require("../models/Cart");
const checkAuth = require("../middleware/CheckAuth");

const router = express.Router();

//      GET user
//      api/users
//      access: private

router.get("/", checkAuth, async (req, res) => {
  let user;

  try {
    user = await User.findById(req.userId);

    if (!user) {
      return res.json("no user found.");
    }

    res.json({ user: user });
  } catch (error) {
    return res.status(500).json("server error");
  }
});

//      POST create new user
//      api/users
//      access: public

router.post(
  "/",
  [
    check("username", "Please fill in the USERNAME field").not().isEmpty(),
    check("email", "Please enter a valid email address").isEmail(),
    check(
      "password",
      "Please enter a valid password (6 characters minimum)"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
      const existing = await User.findOne({ email });

      if (existing) {
        return res.status(401).json(" this email is already in the database");
      }
    } catch (error) {
      return res.status(500).json("server error");
    }

    try {
      const newUser = new User({
        username: username,
        email: email,
        password: password,
      });

      const cart = new Cart({
        user: newUser.id,
        products: [],
        wishlist: [],
      });

      await cart.save();

      newUser.cart = cart;

      const salt = await bcrpyt.genSalt(10);

      newUser.password = await bcrpyt.hash(password, salt);

      await newUser.save();

      jwt.sign(
        { id: newUser.id },
        config.get("jwtSecret"),
        null,
        (err, token) => {
          if (err) {
            throw new Error(err.message);
          }
          console.log(token);
          res.json({ token: token });
        }
      );
    } catch (error) {
      res.status(500).json("bcrpyt error");
    }
  }
);

//      POST sign in user
//      api/users/sign-in
//      access: public

router.post(
  "/sign-in",
  [
    check("email", "Please fill in a valid Email").isEmail(),
    check(
      "password",
      "Please fill in a valid password (minimum of 6 characters)"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json(errors.array());
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(401).json({ msg: "No email found.", param: "email" });
      }

      const verified = await bcrpyt.compare(password, user.password);

      if (!verified) {
        console.log("not verified");

        return res.status(401).json({
          msg: "Password is Incorrect!, Please try again.",
          param: "password",
        });
      }

      jwt.sign({ id: user.id }, config.get("jwtSecret"), null, (err, token) => {
        if (err) {
          throw new Error(err);
        }
        console.log(token);
        res.json({ token: token });
      });
    } catch (error) {
      return res.status(500).json("server error");
    }
  }
);

module.exports = router;
