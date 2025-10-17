import hashlib
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi import Response
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session
from cors_config import setup_cors
from database import get_db
from face_routes import router as face_router  # import your router
from models import User
from sqlalchemy import func
app = FastAPI()

setup_cors(app)
app.include_router(face_router)  # face related routes



@app.get("/")
def index():
    return JSONResponse({"message": "FaceAccess Api"})


# Define the request body schema (model)
class UserRegister(BaseModel):
    userId: str
    name: str
    role: str
    fingerprint: bool
    face: bool
    card: bool
    password: str
    profilePhoto: bool
    accessControlRole: str


@app.get("/users/latest-id")
def get_latest_user_id_route(db: Session = Depends(get_db)):
    latest_id = db.query(func.max(User.userId)).scalar()
    print(latest_id)

    if latest_id is None:
        raise HTTPException(status_code=404, detail="No users")
    return {"latestUserId": latest_id}

@app.post("/addUser")
async def register_user(user: UserRegister, db: Session = Depends(get_db)):
    # Check if userId already exists
    existing_user = db.query(User).filter(User.userId == user.userId).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User ID already exists")

    # Hash password (simple example, use bcrypt or similar in prod)
    hashed_password = hashlib.sha256(user.password.encode()).hexdigest()

    new_user = User(
        userId=user.userId,
        name=user.name,
        role=user.role,
        fingerprint=(user.fingerprint),
        face=(user.face),
        card=(user.card),
        password=hashed_password,
        profilePhoto=(user.profilePhoto),
        accessControlRole=user.accessControlRole,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully!", "user": {
        "userId": new_user.userId,
        "name": new_user.name,
        "role": new_user.role,
        "fingerprint": new_user.fingerprint,
        "face": new_user.face,
        "card": new_user.card,
        "profilePhoto": new_user.profilePhoto,
        "accessControlRole": new_user.accessControlRole,
    }}


class UserUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    fingerprint: Optional[str] = None
    face: Optional[str] = None
    card: Optional[str] = None
    password: Optional[str] = None
    profilePhoto: Optional[str] = None
    accessControlRole: Optional[str] = None


@app.post("/updateUser")
async def update_user(user_id: str, user_update: UserUpdate, db: Session = Depends(get_db)):
    # Find the existing user
    existing_user = db.query(User).filter(User.userId == user_id).first()
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Update fields only if they are provided (for PATCH-style behavior)
    if user_update.name is not None:
        existing_user.name = user_update.name
    if user_update.role is not None:
        existing_user.role = user_update.role
    if user_update.fingerprint is not None:
        existing_user.fingerprint = user_update.fingerprint
    if user_update.face is not None:
        existing_user.face = user_update.face
    if user_update.card is not None:
        existing_user.card = user_update.card
    if user_update.password is not None:
        # Hash the updated password
        existing_user.password = hashlib.sha256(user_update.password.encode()).hexdigest()
    if user_update.profilePhoto is not None:
        existing_user.profilePhoto = user_update.profilePhoto
    if user_update.accessControlRole is not None:
        existing_user.accessControlRole = user_update.accessControlRole

    db.commit()
    db.refresh(existing_user)

    return {"message": "User updated successfully!", "user": {
        "userId": existing_user.userId,
        "name": existing_user.name,
        "role": existing_user.role,
        "fingerprint": existing_user.fingerprint,
        "face": existing_user.face,
        "card": existing_user.card,
        "profilePhoto": existing_user.profilePhoto,
        "accessControlRole": existing_user.accessControlRole,
    }}


# Pydantic model for response (exclude password)
class UserOut(BaseModel):
    userId: str
    name: str
    role: str
    fingerprint: bool
    face: bool
    card: bool
    profilePhoto: bool
    accessControlRole: Optional[str] = None

    class Config:
        from_attributes = True


@app.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.userId == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.get("/users", response_model=List[UserOut])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users



@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.userId == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    # Return an empty 204 response (no content)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

