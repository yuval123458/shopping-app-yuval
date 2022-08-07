const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  season: { type: String, required: true },
  categorie: { type: String, required: true },
  size: { type: [String], required: true },
  color: { type: [String], required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
  popular: { type: Boolean, default: false },
});

module.exports = Product = new mongoose.model("Product", productsSchema);
