const express = require("express");
const multer = require("multer");
const upload = multer();
const { registration, verifyOTP, login, userProfile, updateProfile } = require("../controllers/authController");
const { authMiddleware } = require("./middleware/authMiddleware");
const router = express.Router();


router.post("/registration", registration);
router.post("/verify-otp", verifyOTP);
router.post("/login", login );
router.get("/profile", authMiddleware, userProfile );
router.put("/update-profile", authMiddleware, upload.single("avatar"),updateProfile );


module.exports = router;