const jwt = require("jsonwebtoken");
const config = require("config");

const CheckAuth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(404).json("unauthorized! token in not found!");
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.userId = decoded.id;

    console.log("successfully passed Auth check...");
    next();
  } catch (error) {
    return res.status(404).json("unauthorized user!");
  }
};

module.exports = CheckAuth;
