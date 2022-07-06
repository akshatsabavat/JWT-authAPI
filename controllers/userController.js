require("dotenv").config();
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

  try {
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please enter all the respective fields");
    }
    //checks if any user exists
    const userPointer = await User.findOne({ email });
    if (userPointer) {
      res.status(400);
      throw new Error("User already exists");
    }

    //generates hashed password for auth
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        password: user.password,
        token: generateJWT(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //checks if user exists
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error("User does not exist");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateJWT(user._id),
      });
    } else {
      res.status(404);
      throw new Error("Invalid password entered");
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userTBD = await User.findById(id);
    await userTBD.remove();
    res.status(200).send({ message: "Account has been deleted" });
  } catch (err) {
    res.status(404).send({ message: "Account does not exist" });
  }
};

const getUser = async (req, res) => {
  try {
    const { _id, name, email } = await User.findById(req.user.id); // req.user passed from the protect MW function

    res.status(200).json({
      _id,
      name,
      email,
    });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

//Generate JWT
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  getAll,
  registerUser,
  loginUser,
  deleteUser,
  getUser,
};
