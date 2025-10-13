# face_routes.py
import os
import cv2
import numpy as np

from fastapi import APIRouter, Form, File, UploadFile, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from database import get_db  # adjust import for your db session
from fastapi.responses import JSONResponse
from models import User      # adjust import for your User model
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


# # Save received photo as user_id.jpg in profiles folder
# @router.post("/face/profile0")
# async def update_user_profile_photo(
#         user_id: str = Form(...),
#         profile_photo: bool = Form(...),
#         file: UploadFile = File(...),
#         db: Session = Depends(get_db),
# ):
#     # Find the existing user by userId
#     existing_user = db.query(User).filter(User.userId == user_id).first()
#     if not existing_user:
#         raise HTTPException(status_code=404, detail="User not found")
#
#     file_path = f"profiles/{user_id}.jpg"
#
#     # Create users directory
#     os.makedirs("profiles", exist_ok=True)
#
#     with open(file_path, "wb") as f:
#         f.write(await file.read())
#
#     # Update only the profilePhoto boolean field
#     existing_user.profilePhoto = profile_photo
#
#     db.commit()
#     db.refresh(existing_user)
#
#     return {"message": "User profile photo updated successfully!"}


logger = logging.getLogger("uvicorn")  # FastAPI typically runs on Uvicorn server
# You can also configure logging level if needed
logging.basicConfig(level=logging.INFO)


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
    x, y, w, h = sorted(faces, key=lambda rect: rect[2]*rect[3], reverse=True)[0]
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

# def variance_of_laplacian(image):
#     return cv2.Laplacian(image, cv2.CV_64F).var()

# @router.post("/face/enroll")
# async def enroll_face(
#     user_id: str = Form(...),
#     file: UploadFile = File(...),
#     db: Session = Depends(get_db),
# ):
#     # Read file to memory
#     file_contents = await file.read()
#     img_array = np.frombuffer(file_contents, np.uint8)
#     img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
#     if img is None:
#         raise HTTPException(status_code=400, detail="Invalid image file")
#
#     gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#
#     cascade_path = "haarcascade_frontalface_default.xml"
#     if not os.path.exists(cascade_path):
#         raise HTTPException(status_code=500, detail="Haar cascade data not found")
#     face_cascade = cv2.CascadeClassifier(cascade_path)
#     faces = face_cascade.detectMultiScale(gray, 1.1, 4)
#
#     if len(faces) == 0:
#         return JSONResponse(content={"enrolled": False, "clarity": 0.0, "message": "No face detected"})
#
#     # Pick largest face
#     x, y, w, h = sorted(faces, key=lambda r: r[2]*r[3], reverse=True)[0]
#     face_img = gray[y:y+h, x:x+w]
#
#     # Compute Laplacian variance (focus/blur detection)
#     #blur_var = variance_of_laplacian(face_img)
#
#     # Normalize blur_var to percentage - empirical limits
#     min_val, max_val = 50.0, 200.0  # tune thresholds based on testing
#     #clarity_percent = max(0.0, min(100.0, (blur_var - min_val) / (max_val - min_val) * 100))
#
#     # Threshold to enroll
#     enroll_threshold = 80.0
#
#     blur_var = variance_of_laplacian(face_img)
#     enroll_threshold = 80  # Adjust based on testing
#     if blur_var < enroll_threshold:
#         return JSONResponse(content={
#             "enrolled": False,
#             "clarity": float(blur_var),
#             "message": "Face detected but image quality is not good enough"
#         })
#     # if clarity_percent < enroll_threshold:
#     #     return JSONResponse(content={
#     #         "enrolled": False,
#     #         "clarity": clarity_percent,
#     #         "message": "Face detected but image quality is not good enough"
#     #     })
#
#     # Save cropped face image for enrolled user
#     os.makedirs("enrolled_faces", exist_ok=True)
#     save_path = f"enrolled_faces/{user_id}.jpg"
#     cv2.imwrite(save_path, img[y:y+h, x:x+w])
#
#     # Here you might add face encoding or registration in DB for real use case
#
#     return JSONResponse(content={
#         "enrolled": True,
#         "clarity": blur_var,
#         "message": "Face enrolled successfully"
#     })
