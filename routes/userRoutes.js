const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const protectRoute = require("../middleware/authMiddleware");

router.get("/getAll", userController.getAll);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.delete("/:id", userController.deleteUser);
router.get("/getUser", protectRoute.protect, userController.getUser); //gets the user according to their JWT Hence route is protected

module.exports = router;
