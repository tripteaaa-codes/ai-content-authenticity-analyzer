const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    type: {
        type: String,
        enum: ["text", "image"],
        required: true
    },

    content: String,

    fileName: String,

    aiProbability: Number,

    humanProbability: Number,

    verdict: String
}, {
    timestamps: true
});

module.exports = mongoose.model("Analysis", analysisSchema);