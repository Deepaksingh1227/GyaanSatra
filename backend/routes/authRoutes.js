const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

// ✅ Ensure this exists and matches frontend
router.post("/signup", signup); 
router.post("/login", login);

module.exports = router;
