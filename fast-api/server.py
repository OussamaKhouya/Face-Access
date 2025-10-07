# server.py
import os
import sqlite3


from fastapi import FastAPI, Form
from fastapi import UploadFile, File
from fastapi.responses import JSONResponse

app = FastAPI()

# Create users directory
os.makedirs("faces", exist_ok=True)

# Initialize SQLite
conn = sqlite3.connect("users.db", check_same_thread=False)
cursor = conn.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    image_path TEXT
)
""")
conn.commit()

@app.get("/")
def index():
    return JSONResponse({"message": "FaceAccess Api"})

@app.post("/register")
async def register_user(name: str = Form(...), file: UploadFile = File(...)):
    file_path = f"faces/{name}.jpg"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    cursor.execute("INSERT INTO users (name, image_path) VALUES (?, ?)", (name, file_path))
    conn.commit()

    return JSONResponse({"status": "success", "name": name})



