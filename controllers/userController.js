const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
};

module.exports = {
  getAll,
};
