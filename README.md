# FaceAccess: Facial Recognition for Access Management

[![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/) [![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/) [![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)

FaceAccess is a comprehensive, mobile-first facial recognition system designed for secure and efficient access control. The system leverages a React Native mobile application to capture user facial data and a powerful Python-based backend for real-time identification and access management. Each access attempt is meticulously logged, and an intuitive administrative dashboard provides tools for user management and detailed access history review.

## Table of Contents

- [About The Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## About The Project

FaceAccess offers a modern solution to access control, replacing traditional methods with a seamless and secure facial recognition system. The project is divided into two main components:

*   **`react-native-mobile-app`**: A cross-platform mobile application for user interaction, including registration and real-time face capture for access.
*   **`fast-api`**: A robust backend server that handles facial recognition, user management, and access logging.

## Tech Stack

### Frontend (react-native-mobile-app)

*   [React Native](https://reactnative.dev/): A framework for building native mobile apps with React.
*   [Expo](https://expo.dev/): A platform for making universal React applications.
*   [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript.

### Backend (fast-api)

*   [FastAPI](https://fastapi.tiangolo.com/): A modern, fast (high-performance), web framework for building APIs with Python 3.7+.
*   [Insightface](https://github.com/deepinsight/insightface): A deep learning framework for 2D and 3D face analysis.
*   [SQLAlchemy](https://www.sqlalchemy.org/): The Python SQL Toolkit and Object Relational Mapper.
*   [SQLite](https://www.sqlite.org/index.html): A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.

## Features

*   **User Registration**: Simple and secure user enrollment with facial data capture.
*   **Real-time Face Recognition**: Instantaneous identification for seamless access.
*   **Access Control**: Grant or deny access based on facial recognition results.
*   **Admin Dashboard**: A comprehensive dashboard for user management and access monitoring.
*   **Access Logging**: Detailed logs of all access attempts for security and auditing purposes.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm
*   Python 3.7+ and pip
*   Expo CLI
*   Android Studio or Xcode for mobile development

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/FaceAccess.git
    ```
2.  **Frontend (react-native-mobile-app)**
    ```sh
    cd react-native-mobile-app
    npm install
    npx expo start
    ```
3.  **Backend (fast-api)**
    ```sh
    cd fast-api
    pip install -r requirements.txt
    uvicorn server:app --reload --host 0.0.0.0 --port 8000
    ```

## Project Structure

```
FaceAccess/
├── fast-api/
│   ├── .gitignore
│   ├── cors_config.py
│   ├── create_db.py
│   ├── database.py
│   ├── face_routes.py
│   ├── models.py
│   ├── README.md
│   ├── requirements.txt
│   ├── server.py
│   └── ...
└── react-native-mobile-app/
    ├── .gitignore
    ├── app.json
    ├── eas.json
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    └── ...
```
