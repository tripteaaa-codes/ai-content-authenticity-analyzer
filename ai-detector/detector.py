from fastapi import FastAPI, UploadFile
from PIL import Image
import torch

app = FastAPI()

@app.get("/")
async def home():
    return {
        "message" : "AI Detector Service Running"
    }

@app.post("/detect")
async def detect(file: UploadFile):
    image = Image.open(file.file)

    return {
        "aiProbability": 0.82,
        "verdict": "Likely AI Generated"
    }