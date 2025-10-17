from sqlalchemy import Column, String, Boolean, JSON
from database import Base

class User(Base):
    __tablename__ = "users"

    userId = Column(String, primary_key=True, index=True)
    name = Column(String)
    role = Column(String)
    fingerprint = Column(Boolean)
    face = Column(Boolean)
    card = Column(Boolean)
    password = Column(String)
    profilePhoto = Column(Boolean)
    accessControlRole = Column(String)

    # Add this for face embeddings
    face_embedding = Column(JSON, nullable=True)  # store embedding as JSON list