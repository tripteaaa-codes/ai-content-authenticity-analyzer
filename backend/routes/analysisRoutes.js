const express = require("express");
const protect = require("../middleware/authMiddleware");
const { analyzeText, analyzeImage } = require("../controllers/analysisController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/text", protect, analyzeText);
router.post("/image", protect, upload.single("image"), analyzeImage);

module.exports = router;