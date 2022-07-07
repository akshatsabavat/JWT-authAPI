const express = require("express");
const router = express.Router();
const protectRoute = require("../middleware/authMiddleware");
const goalController = require("../controllers/goalController");

router.post("/Setgoals", protectRoute.protect, goalController.setGoal);
