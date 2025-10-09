## FaceAccess : Facial recognition application for access management 

### Overview
FaceAccess is a mobile-first facial recognition system for secure access management. Using a React Native app, it captures user faces and communicates with a Python-based backend to identify individuals and control access. The system logs each access attempt and provides an dashboard for admins to manage users and review access history.

## Tools
- React Native
- Python/FastAPI
- OpenCV
- SQLite/PostgreSQL

## Features

- **User Registration**
- **Real-time Face Recognition**
- **Access Control**
- **Admin Dashboard**
- **Email/SMS alerts**

### Run Project

```bash
# React Native
npm install
npx expo start
npx expo run:android --device

# FastAPi
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```




