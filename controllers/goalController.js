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

const updateGoal = async (req, res) => {
  const userByToken = req.user;
  const { newGoal } = req.body;
  const goalID = req.params.id;

  try {
    const goal = await Goal.findById(goalID);

    //check if goal exists
    if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
    }

    const user = await User.findById(userByToken.id);

    //Check if authenticated user exists
    if (!user) {
      res.status(400);
      throw new Error("User does not exist");
    }

    //Check is logged user matches goal TBU user
    if (goal.user.toString() !== user.id) {
      throw new Error("User does not contain the entered goal");
    }

    const updateGoal = await Goal.updateOne(
      { _id: goalID },
      { $set: { text: newGoal } }
    );

    res.status(201).send({ message: "goal Updated", new: updateGoal });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const deleteGoal = async (req, res) => {
  const userByToken = req.user;
  const goalID = req.params.id;
  try {
    const goal = await Goal.findById(goalID);

    if (!goal) {
      res.status(400);
      throw new Error("Goal does not exist");
    }

    const user = await User.findById(userByToken.id);

    if (!user) {
      res.status(400);
      throw new Error("User does not exist");
    }

    if (goal.user.toString() !== user.id) {
      res.status(400);
      throw new Error("User does not contain the entered goal");
    }

    await goal.remove();

    res.status(200).send({ message: "Goal deleted" });
  } catch {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { setGoal, getAllGoals, updateGoal, deleteGoal };
