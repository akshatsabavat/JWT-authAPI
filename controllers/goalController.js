const Goal = require("../models/goalModel");
const User = require("../models/userModel");

const setGoal = async (req, res) => {
  try {
    //gets the user by jwt through the auth middle ware
    const userByToken = req.user;
    const { goalText } = req.body;

    if (!goalText) {
      res.status(400);
      throw new Error("Please Enter a goal");
    }

    const goal = Goal.create({
      text: goalText,
      user: userByToken.id,
    });

    res.status(200).send(goal);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { setGoal };
