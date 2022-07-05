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

  //checks if any feild is empty
  if (!name || !email || !password) {
    res.status(400).send({ message: "Please enter all feilds" });
  }

  try {
    //checks if any user exists
    const userPointer = await User.findOne({ email });
    if (userPointer) {
      res.status(400).send({ message: "user exists" });
    }

    //generates hashed password for auth
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name: name,
      email: email,
      password: hashPassword,
    });

    await user.save();
    res.status(200).send({ message: "Account has been created" });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //checks if user exists
  const user = await User.findOne({ email });
  if (!user) res.status(404).send({ message: "user does not exist" });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    res.send({ message: `Welcome back ${user.name}` });
  } else {
    res.status(404).send({ message: "invalid password" });
  }
};

module.exports = {
  getAll,
  registerUser,
  loginUser,
};
