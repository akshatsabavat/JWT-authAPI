const express = require("express");
const router = express.Router();
const protectRoute = require("../middleware/authMiddleware");
const goalController = require("../controllers/goalController");

router.post("/setGoals", protectRoute.protect, goalController.setGoal);
router.get("/getGoals", protectRoute.protect, goalController.getAllGoals);
router.post("/updateGoal/:id", protectRoute.protect, goalController.updateGoal);
router.delete(
  "/deleteGoal/:id",
  protectRoute.protect,
  goalController.deleteGoal
);

module.exports = router;
