const fs = require("fs");
const FormData = require("form-data");
const fetch = require("node-fetch");
const Analysis = require("../models/Analysis");

const endpointMap = {
    text: "http://127.0.0.1:8000/detect/text",
    image: "http://127.0.0.1:8000/detect/image"
};

const analyzeText = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                message: "Text is required"
            });
        }

        const response = await fetch(endpointMap.text, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        });

        const result = await response.json();

        await Analysis.create({
            user: req.user._id,
            type: "text",
            content: text,
            aiProbability: result.aiProbability,
            humanProbability: result.humanProbability,
            verdict: result.verdict
        });

        res.json({
            ...result,
            analyzedBy: req.user.name
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};

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
            endpointMap.image,
            {
                method: "POST",
                body: formData,
                headers: formData.getHeaders()
            }
        );

        const result = await response.json();

        await Analysis.create({
            user: req.user._id,
            type: "image",
            fileName: req.file.filename,
            aiProbability: result.aiProbability,
            verdict: result.verdict
        });

        res.json({
            file: req.file.filename,
            ...result,
            analyzedBy: req.user.name
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};

const getHistory = async (req, res) => {
    try {
        const history = await Analysis.find({
            user: req.user._id
        })
        .select("-user -__v -updatedAt")
        .sort({ createdAt: -1 });

        res.json(history);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    analyzeText,
    analyzeImage,
    getHistory
};