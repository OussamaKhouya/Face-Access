# cors_config.py
from fastapi.middleware.cors import CORSMiddleware

def setup_cors(app):
    origins = [
        "http://localhost:8081",  # your frontend URL
        "http://172.16.1.180:8081",  # your frontend URL
        # Add other allowed origins if needed
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
