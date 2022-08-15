const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const usersRoute = require("./routes/usersRoute");
const productsRoute = require("./routes/productsRoute");
const cartRoute = require("./routes/cartRoute");
const stripeRoute = require("./routes/stripe");

const app = express();

const mongoURI = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);

    console.log("mongoose connected...");
  } catch (error) {
    console.log(error.message);
  }
};
connectDB();

app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Bearer, X-Requested-With, x-auth-token, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH"
  );
  next();
});

app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/stripe", stripeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
