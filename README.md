Here's the translated README file in English:

---

# My Interactive Table 🚀

This project is a full-stack application with a **frontend** built using **React** and a **backend** built with **Node.js**, using **Express** and **MongoDB**. Below are details about the dependencies, environment variables, and how to run both parts of the application.

## Table of Contents 📚

- [Dependencies](#dependencies)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Running the Backend and Frontend](#running-the-backend-and-frontend)
- [Environment Variables](#environment-variables)

## Dependencies 🛠️

### Frontend

The frontend uses **React** with Create React App.

- **`react`**: ^19.0.0
- **`react-dom`**: ^19.0.0
- **`react-scripts`**: 5.0.1
- **`cra-template`**: 1.2.0

#### `frontend/package.json` file:

```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "cra-template": "1.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:3000"
}
```

### Backend

The backend is built with **Node.js** and **Express**, and uses **MongoDB** via **Mongoose**.

- **`cors`**: ^2.8.5
- **`mongoose`**: ^8.9.4

#### `backend/package.json` file:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "mongoose": "^8.9.4"
  }
}
```

## Running the Backend and Frontend 🚀

### 1. Running the Backend (Node.js)

- Make sure **MongoDB** is properly installed and configured on your machine.
- Install the backend dependencies:

```bash
cd backend
npm install
```

- Start the backend server with the following command:

```bash
npm start
```

This will start the backend on the port specified in your `.env` file (default `PORT_BACKEND=5000`).

### 2. Running the Frontend (React)

- Install the frontend dependencies:

```bash
cd frontend
npm install
```

- Start the frontend server with the following command:

```bash
npm start
```

This will start the frontend on the port specified in your `.env` file (default `PORT_FRONTEND=3000`).

The frontend will connect to the backend via the **proxy** configured in the `package.json`, which redirects API requests to `http://localhost:5000`.

## Environment Variables 🌱

### 1. Backend Environment Variables

You need to create a `.env` file at the root of the project to define the following variables:

- **`PORT_BACKEND`**: The port on which your backend server listens (default `5000`).
- **`MONGO_URI`**: The connection string to your MongoDB database.

Example `.env` file for the backend:

```env
PORT_BACKEND=3000
PORT_FRONTEND=3005
MONGO_URI=mongodb://localhost:27017/my-database
```

### 2. Frontend Environment Variables

The React frontend also uses a `.env` file. This file contains variables that configure the application.

- **`PORT`**: The port on which the React server listens (default `3000`).
- **`REACT_APP_PORT_BACKEND`**: The port on which the React server listens.

Example `.env` file for the frontend:

```env
PORT=3005
REACT_APP_PORT_BACKEND=3000
```

> **Note**: Make sure your environment variables are correctly configured before starting the services. The backend should be started before the frontend for the APIs to work properly.
