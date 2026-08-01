from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from PIL import Image

from services.text_detector import detect_text

app = FastAPI()

@app.get("/")
async def home():
    return {"message": "AI Detector Service Running"}

# -------- IMAGE --------

@app.post("/detect/image")
async def detect_image(file: UploadFile = File(...)):
    image = Image.open(file.file)

    return {
        "type": "image",
        "aiProbability": 0.82,
        "verdict": "Likely AI Generated"
    }

# -------- TEXT --------

class TextRequest(BaseModel):
    text: str

@app.post("/detect/text")
async def analyze_text(data: TextRequest):
    return await detect_text(data.text)