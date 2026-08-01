import { useState } from "react";
import api from "../services/api";

function Dashboard() {
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);

    const analyzeText = async () => {
        const { data } = await api.post("/analysis/text", { text });

        setResult(data);
    };

    return (
        <div>
            <h1>AI Content Authenticity Analyzer</h1>

            <textarea
                rows="8"
                cols="50"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to analyze"
            />

            <br />

            <button onClick={analyzeText}>
                Analyze Text
            </button>

            {result && (
                <div>
                    <h3>Result</h3>

                    <p>Verdict: {result.verdict}</p>
                    <p>AI Probability: {result.aiProbability}</p>
                    <p>Human Probability: {result.humanProbability}</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;