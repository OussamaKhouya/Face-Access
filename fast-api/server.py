# server.py
import os
from typing import List
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from fastapi import FastAPI, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal  # Your DB session factory
from models import User
import hashlib

app = FastAPI()

# Create users directory
os.makedirs("faces", exist_ok=True)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def str_to_bool(v: str):
    return v.lower() == 'true'


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



@app.post("/addUser2")
async def register_user(user: UserRegister):
    # Here you would add your logic to save the user to a database
    # For example, check if userId exists, hash password, store user data, etc.
    # If successful:
    print(user)
    return {"message": "User registered successfully!", "user": user}

# Pydantic model for response (exclude password)
class UserOut(BaseModel):
    userId: str
    name: str
    role: str
    fingerprint: bool
    face: bool
    card: bool
    profilePhoto: bool
    accessControlRole: str

    class Config:
        orm_mode = True

@app.get("/users", response_model=List[UserOut])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users
