const express = require("express");
const { registration, verfyOTP, login } = require("../controllers/authController");
const router = express.Router()

router.post("/registration", registration)
router.post("/verify-otp", verfyOTP)
router.post("/login", login)

module.exports = router;