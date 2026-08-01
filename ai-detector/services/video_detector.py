import cv2
import tempfile

async def detect_video(file):
    temp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
    temp.write(await file.read())
    temp.close()

    cap = cv2.VideoCapture(temp.name)

    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)

    cap.release()

    return {
        "type": "video",
        "frames": frame_count,
        "fps": fps,
        "verdict": "Video analysis placeholder"
    }