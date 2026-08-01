async def detect_text(text: str):
    ai_probability = 0.30

    if len(text) > 100:
        ai_probability += 0.20

    if "therefore" in text.lower():
        ai_probability += 0.15

    if "furthermore" in text.lower():
        ai_probability += 0.15

    if "artificial intelligence" in text.lower():
        ai_probability += 0.10

    if ai_probability > 1:
        ai_probability = 1.0

    return {
        "type": "text",
        "aiProbability": round(ai_probability, 2),
        "humanProbability": round(1 - ai_probability, 2),
        "verdict":
            "Likely AI Generated"
            if ai_probability >= 0.6
            else "Likely Human Written"
    }