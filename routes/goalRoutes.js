const express = require("express");
const router = express.Router();
const protectRoute = require("../middleware/authMiddleware");
const goalController = require("../controllers/goalController");

router.post("/setGoals", protectRoute.protect, goalController.setGoal);

module.exports = router;
