const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/getAll", userController.getAll);
router.post("/register", userController.registerUser);

module.exports = router;
