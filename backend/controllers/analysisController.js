const sharp = require("sharp");

const analyzeText = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({
            message: "Text is required"
        });
    }

    const wordCount = text.split(" ").length;

    let aiProbability = 40;

    if (wordCount > 50) aiProbability += 20;
    if (text.includes("therefore")) aiProbability += 10;
    if (text.includes("furthermore")) aiProbability += 10;

    const humanProbability = 100 - aiProbability;

    res.json({
        verdict: aiProbability > 60 ? "Likely AI Generated" : "Likely Human Written",
        aiProbability,
        humanProbability,

        analyzedBy: req.user.name
    });
};

const analyzeImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Image is required"
            });
        }

        const metadata = await sharp(req.file.path).metadata();

        let aiProbability = 25;
        const reasons = [];

        if (!metadata.exif) {
            aiProbability += 20;
            reasons.push("Missing camera EXIF metadata");
        }

        if (metadata.width === metadata.height) {
            aiProbability += 10;
            reasons.push("Perfect square dimensions detected");
        }

        if (metadata.width > 1500 || metadata.height > 1500) {
            aiProbability += 15;
            reasons.push("Unusually high resolution");
        }

        
        if (metadata.format === "png") {
            aiProbability += 10;
            reasons.push("PNG export format detected");
        }

        if (aiProbability > 100) aiProbability = 100;

        const humanProbability = 100 - aiProbability;

        res.json({
            file: req.file.filename,
            width: metadata.width,
            height: metadata.height,
            format: metadata.format,

            verdict:
                aiProbability >= 60
                    ? "Possibly AI Generated"
                    : "Likely Real Photograph",

            aiProbability,
            humanProbability,
            reasons,
            analyzedBy: req.user.name
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { 
    analyzeText,
    analyzeImage
};