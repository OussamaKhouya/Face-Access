import logging
import os
from typing import Tuple
import cv2
import numpy as np
from fastapi import APIRouter, Form, File, UploadFile, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from database import get_db  #   for db session
from models import User  #   for User model
from fastapi import UploadFile, File, Form, HTTPException, Depends
from sqlalchemy.orm import Session
from insightface.app import FaceAnalysis
from io import BytesIO
from PIL import Image

router = APIRouter()

# Configure logging
logger = logging.getLogger("uvicorn")
logging.basicConfig(level=logging.INFO)

# Initialize InsightFace model
insightface_app = FaceAnalysis(name='buffalo_l', root='./', providers=['CPUExecutionProvider'])
insightface_app.prepare(ctx_id=0, det_size=(640, 640), det_thresh=0.5)

@router.post("/face/profile")
async def update_user_profile_photo(
        user_id: str = Form(...),
        profile_photo: bool = Form(...),
        file: UploadFile = File(...),
        db: Session = Depends(get_db),
):
    logger.info(f"Received profile photo update request for user_id={user_id}")

    # Check if user exists
    existing_user = db.query(User).filter(User.userId == user_id).first()
    if not existing_user:
        logger.warning(f"User not found: {user_id}")
        raise HTTPException(status_code=404, detail="User not found")

    # Prepare directories and files
    os.makedirs("profiles", exist_ok=True)
    temp_file_path = f"profiles/{user_id}_original.jpg"
    profile_path = f"profiles/{user_id}.jpg"

    # Save temporarily uploaded image
    logger.info(f"Saving uploaded image to {temp_file_path}")
    with open(temp_file_path, "wb") as f:
        f.write(await file.read())

    # Load the image for processing
    img = cv2.imread(temp_file_path)
    if img is None:
        logger.error(f"Failed to load image file {temp_file_path}")
        raise HTTPException(status_code=400, detail="Invalid image file")

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    cascade_path = "haarcascade_frontalface_default.xml"
    if not os.path.exists(cascade_path):
        logger.error(f"Haar cascade file not found at {cascade_path}")
        raise HTTPException(status_code=500, detail="Haar cascade data not found")

    face_cascade = cv2.CascadeClassifier(cascade_path)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    logger.info(f"Detected {len(faces)} face(s) in image for user_id={user_id}")

    if len(faces) == 0:
        logger.warning(f"No face detected in image for user_id={user_id}")
        raise HTTPException(status_code=400, detail="No face detected")

    # Crop the largest detected face with padding
    x, y, w, h = sorted(faces, key=lambda rect: rect[2] * rect[3], reverse=True)[0]
    padding = 40
    x1 = max(x - padding, 0)
    y1 = max(y - padding, 0)
    x2 = min(x + w + padding, img.shape[1])
    y2 = min(y + h + padding, img.shape[0])

    face_crop = img[y1:y2, x1:x2]
    cv2.imwrite(profile_path, face_crop)
    logger.info(f"Cropped face saved to {profile_path}")

    # Cleanup temp file
    try:
        os.remove(temp_file_path)
        logger.info(f"Removed temporary file {temp_file_path}")
    except Exception as e:
        logger.error(f"Failed to remove temporary file {temp_file_path}: {e}")

    # Update user db
    existing_user.profilePhoto = profile_photo
    db.commit()
    db.refresh(existing_user)
    logger.info(f"Updated profilePhoto flag for user_id={user_id}")

    return FileResponse(profile_path, media_type="image/jpeg", filename=f"{user_id}_profile.jpg")




# %%



def extract_face_embedding(file_bytes: bytes) -> np.ndarray:
    # Load image from bytes
    image = Image.open(BytesIO(file_bytes)).convert("RGB")
    image_np = np.array(image)

    # Detect faces
    faces = insightface_app.get(image_np)
    if not faces:
        raise ValueError("No face detected in the image.")

    # Take first detected face
    embedding = faces[0].embedding
    return embedding


def extract_face_embedding_score(file_bytes: bytes) -> Tuple[np.ndarray, int]:
    # Load image from bytes
    image = Image.open(BytesIO(file_bytes)).convert("RGB")
    image_np = np.array(image)

    # Detect faces
    faces = insightface_app.get(image_np)
    if not faces:
        raise ValueError("No face detected in the image.")

    # Take first detected face
    embedding = faces[0].embedding
    score = int(round(float(faces[0].det_score) * 100))
    return embedding, score


@router.post("/face/enroll")
async def enroll_face(
        user_id: str = Form(...),
        file: UploadFile = File(...),
        db: Session = Depends(get_db),
):
    logger.info(f"Received enroll photo request for user_id={user_id}")
    # Read uploaded file bytes
    file_bytes = await file.read()
    try:
        embedding_vector, score = extract_face_embedding_score(file_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Find user
    user = db.query(User).filter(User.userId == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Save embedding and mark face enrolled
    user.face_embedding = embedding_vector.tolist()
    user.face = True
    db.commit()
    db.refresh(user)

    return {"enrolled": True, "score": score, "user_id": user_id, "message": "Face enrolled successfully"}


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    """Compute cosine similarity between two vectors"""
    a = np.array(a)
    b = np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


@router.post("/face/recognize")
async def recognize_face(
        file: UploadFile = File(...),
        db: Session = Depends(get_db),
):
    file_bytes = await file.read()
    try:
        embedding_vector = extract_face_embedding(file_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Fetch all users with enrolled faces
    users = db.query(User).filter(User.face == True, User.face_embedding != None).all()
    if not users:
        raise HTTPException(status_code=404, detail="No enrolled users found.")

    # Find best match
    best_match = None
    highest_similarity = -1
    for user in users:
        sim = cosine_similarity(embedding_vector, np.array(user.face_embedding))
        if sim > highest_similarity:
            highest_similarity = sim
            best_match = user

    # similarity = int(round(float(highest_similarity * 100)))
    similarity = int(round(float(highest_similarity * 100)))
    logger.info(f"similarity: {similarity}")
    # Threshold for recognizing a face (tune as needed)
    THRESHOLD = 0.5
    if highest_similarity < THRESHOLD:
        return {"recognized": False, "message": "No matching face found", "similarity": similarity}

    return {
        "recognized": True,
        "userId": best_match.userId,
        "name": best_match.name,
        "similarity": similarity
    }
