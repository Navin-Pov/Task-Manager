# Task-Manager
A full-stack Task Management web app built with React, Express, Node.js, and MongoDB. Features JWT auth, dark mode, categories, and real-time filtering.
# Stack Task Manager 📋🚀

Welcome to the **Stack Task Management App**! This is a complete, production-ready full-stack application built to demonstrate my ability to design, build, and deploy an end-to-end web system. 

It aims to solve the problem of daily organization by giving users a personal, secure space where they can instantly write down, categorize, track, and complete their goals. 

Whether you are a beginner looking to understand full-stack architecture, or an employer reviewing my capabilities, this repository demonstrates solid API architecture, React component design, and robust user authentication.

---

## 🌟 Comprehensive Feature List

### 🔒 Security & Authentication
- **User Registration & Login:** A fully secure authentication flow.
- **Data Encryption:** Passwords are never stored in plain text. They are hashed in the backend using `bcryptjs`.
- **JWT Authorization:** Sessions are kept alive and secure using **JSON Web Tokens**. Users can only see and modify the tasks legally tied to their unique token. The frontend utilizes Axios interceptors to automatically attach this token to every request.

### 💻 User Interface & Experience
- **Responsive Layout:** Beautiful, vanilla CSS system that looks great on mobile phones and desktop displays without relying on heavy UI frameworks.
- **Dynamic Dark Mode:** A sophisticated theme toggle in the navigation bar. Your theme preference is instantly saved to your browser's Local Storage!
- **Visual Feedback System:** Integrated `react-hot-toast` to provide beautiful slide-up notifications. You instantly know when a task is saved, deleted, or if a password was typed incorrectly without looking at console logs.

### ⚡ Core Functionalities
- **Instant CRUD:** Create, Read, Update, and Delete tasks without page refreshes.
- **Status Toggling:** One-click toggle between "Pending" and "Completed".
- **Category System:** Assign physical tags (Work, Personal, Shopping, Urgent) to visually segment your responsibilities.
- **Live Filtering:** Sort your view instantly by tapping "All", "Pending", or "Completed".

---

## 🏗️ Folder Architecture

Understanding how this app is built:

```text
github-task-manager/
│
├── backend/                  # The strict Node.js + Express API Server
│   ├── controllers/          # Business logic (handling task creation, login checks)
│   ├── middleware/           # Validates the JWT tokens before granting access
│   ├── models/               # Mongoose schemas explaining how DB data is shaped
│   ├── routes/               # API URL endpoints (/api/auth, /api/tasks)
│   ├── server.js             # Core Express server configuration
│   └── .env.example          # Template for backend server variables
│
└── frontend/                 # The React User Interface
    ├── src/
    │   ├── components/       # Reusable UI pieces (TaskItem card, Navbar)
    │   ├── context/          # React Context wrapping the app to store the logged-in User
    │   ├── pages/            # Full-scale views (Dashboard, Login, Register)
    │   ├── App.jsx           # Main React component routing all paths
    │   └── index.css         # Custom modern design system
    ├── index.html            
    └── package.json          
```

---

## 🔌 API Endpoints Reference

If you wish to interact with the backend directly via Postman:

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Creates a new user | No |
| `POST` | `/api/auth/login` | Authenticates and returns JWT | No |
| `GET`  | `/api/auth/me` | Returns logged-in user profile | **Yes** |
| `GET`  | `/api/tasks` | Gets all tasks for the logged user | **Yes** |
| `POST` | `/api/tasks` | Creates a new task | **Yes** |
| `PUT`  | `/api/tasks/:id` | Updates task title, text, or completion | **Yes** |
| `DELETE`| `/api/tasks/:id` | Deletes a task from the database | **Yes** |

---

## 🛠️ Step-By-Step Setup Guide

Follow these exact steps to run this application perfectly on your local machine. You will need [Node.js](https://nodejs.org/) installed, and a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string (or local MongoDB database).

### Phase 1: Booting the Backend

1. **Navigate to the server directory:**
   ```bash
   cd backend
   ```

2. **Install all Node modules:**
   ```bash
   npm install
   ```

3. **Configure the Environment variables:**
   - Create a brand new file inside the `backend` folder and name it EXACTLY `.env`.
   - Copy the text from `.env.example` into your new `.env` file and insert your real database string.
   ```env
   PORT=5000
   MONGO_URI=your_actual_mongodb_connection_string
   JWT_SECRET=super_secret_string_make_it_up
   ```

4. **Launch the server:**
   ```bash
   npm start
   # If successful, you will see "Server is running..." and "MongoDB connected successfully"
   ```

### Phase 2: Booting the Frontend

1. **Open a BRAND NEW terminal tab/window** (Do not close the backend terminal). 
2. **Navigate to the visual interface:**
   ```bash
   cd frontend
   ```

3. **Install the React packages:**
   ```bash
   npm install
   ```

4. **Start the Vite Website Engine:**
   ```bash
   npm run dev
   ```

5. **Action:** Open your internet browser and visit `http://localhost:5173`. Create an account, and experience the application!

---

### Developed with ❤️ 
