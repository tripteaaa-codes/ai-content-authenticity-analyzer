const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const analysisRoutes = require("./routes/analysisRoutes");

const connectDB = require("./config/db");
dotenv.config();
 connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/analysis", analysisRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Ai content Authenticity Analyzer API running"
    });
});

const PORT = process.env.PORT || 5555;

app.listen(PORT, () =>{
    console.log(`Server running at PORT ${PORT}`);
});