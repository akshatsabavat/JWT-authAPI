require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//function to protect the get user by id route
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //gets token from header
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // returns the decoded token and a payload that contains the user ID

      //gets user from token
      req.user = await User.findById(decoded.id).select("-password"); // -password to avoid the hashed password

      next();
    } catch (err) {
      res.status(401).send({ message: "Not authorized" });
    }
  }

  if (!token) {
    res.status(401).send({ message: "Not authorized" });
  }
};

module.exports = {
  protect,
};
