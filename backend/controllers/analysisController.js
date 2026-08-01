const fs = require("fs");
const FormData = require("form-data");
const fetch = require("node-fetch");

// ---------------- TEXT ANALYSIS ----------------

const analyzeText = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({
            message: "Text is required"
        });
    }

    let aiProbability = 40;

    if (text.length > 200) aiProbability += 20;
    if (text.includes("therefore")) aiProbability += 10;
    if (text.includes("furthermore")) aiProbability += 10;

    if (aiProbability > 100) aiProbability = 100;

    const humanProbability = 100 - aiProbability;

    res.json({
        verdict:
            aiProbability >= 60
                ? "Likely AI Generated"
                : "Likely Human Written",

        aiProbability,
        humanProbability,
        analyzedBy: req.user.name
    });
};

// ---------------- IMAGE ANALYSIS ----------------

const analyzeImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Image is required"
            });
        }

        const formData = new FormData();

        formData.append(
            "file",
            fs.createReadStream(req.file.path)
        );

        const response = await fetch(
            "http://127.0.0.1:8000/detect",
            {
                method: "POST",
                body: formData,
                headers: formData.getHeaders()
            }
        );

        const result = await response.json();

        res.json({
            file: req.file.filename,
            aiProbability: result.aiProbability,
            verdict: result.verdict,
            analyzedBy: req.user.name
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    analyzeText,
    analyzeImage
};