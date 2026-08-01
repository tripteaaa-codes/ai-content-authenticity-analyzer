from PIL import Image

async def detect_image(file):
    image = Image.open(file.file)

    return {
        "type": "image",
        "aiProbability": 0.82,
        "verdict": "Likely AI Generated"
    }