const Goal = require("../models/goalModel");
const User = require("../models/userModel");

const getAllGoals = async (req, res) => {
  try {
    const userByToken = req.user;
    const userGoals = await Goal.find({ user: userByToken.id });

    res.status(200).send(userGoals);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const setGoal = async (req, res) => {
  try {
    //gets the user by jwt through the auth middle ware
    const userByToken = req.user;
    const { goalText } = req.body;

    if (!goalText) {
      res.status(400);
      throw new Error("Please Enter a goal");
    }

    const goal = await Goal.create({
      text: goalText,
      user: userByToken.id,
    });

    await goal.save();

    res.status(200).json(goal);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { setGoal, getAllGoals };
