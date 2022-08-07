const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

//   GET popular products
//   /api/products/popular/true
//   access: public

router.get("/popular/true", async (req, res) => {
  try {
    let products = await Product.find({ popular: true });
    return res.json(products);
  } catch (error) {
    return res.status(500).json("server error");
  }
});

//    GET products for given season
//    /api/products/:season
//    access: public

router.get("/:season", async (req, res) => {
  const { season } = req.params;

  try {
    let products = await Product.find({ season: season });
    return res.json(products);
  } catch (error) {
    return res.status(500).json("server error");
  }
});

router.post("/", async (req, res) => {
  const { title, description, img, season, size, color, price, inStock } =
    req.body;
  try {
    const newProduct = new Product({
      title,
      description,
      img,
      season,
      size,
      color,
      price,
      inStock,
    });

    await newProduct.save();

    res.json("created successfully");
  } catch (error) {
    res.status(500).json("server error");
  }
});

//    GET product
//    /api/products/product/:pId
//    access: public

router.get("/product/:pId", async (req, res) => {
  const { pId } = req.params;
  console.log(pId);
  try {
    let product = await Product.findById(pId.toString());

    return res.json(product);
  } catch (error) {
    return res.status(500).json("server error");
  }
});

module.exports = router;
