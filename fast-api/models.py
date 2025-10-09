from sqlalchemy import Column, String, Boolean
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
