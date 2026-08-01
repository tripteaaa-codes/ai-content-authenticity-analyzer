const express = require("express");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");


const {
    analyzeText,
    analyzeImage,
    getHistory
} = require("../controllers/analysisController");

const router = express.Router();

router.post("/text", protect, analyzeText);
router.post("/image", protect, upload.single("image"), analyzeImage);
router.get("/history", protect, getHistory);

module.exports = router;