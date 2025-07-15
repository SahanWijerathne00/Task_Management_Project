# 📘 Task Management / Study Planner App

A full-stack MERN application to help students or individuals plan and manage their tasks efficiently. It includes authentication, task CRUD operations, filtering, sorting, and a beautiful responsive UI.

---

## 📌 Project Overview

This is a **Task Management Web App** designed for students to:

* ✅ Register & Login securely (JWT authentication)
* ✅ Add, edit, delete tasks
* ✅ Filter tasks by status & priority
* ✅ Sort tasks by due date
* ✅ Mobile responsive, animated, and styled with Tailwind CSS + Framer Motion

---

## 🚀 Live Demo

* 🌐 Frontend: [(https://task-management-project-ruby.vercel.app/)]
* 🔗 Backend: [(https://taskmanagementproject.up.railway.app)]

---

## 📦 Tech Stack

* **Frontend**: React, Axios, Tailwind CSS, React Router, Framer Motion
* **Backend**: Node.js, Express.js, MongoDB Atlas, JWT, bcryptjs
* **Database**: MongoDB Atlas
* **Deployment**: Vercel (frontend), Railway (backend)

---

## 🛠️ Setup Instructions

### ⚙️ Prerequisites

* Node.js v18+ (Install from [https://nodejs.org](https://nodejs.org))
* MongoDB Atlas database (cloud-based)
* Git & GitHub

### 📁 Project Structure

```
Task_Management_Project/
├── client/       # React frontend
└── Server/       # Node.js/Express backend
```

---

### ✅ Backend Setup (Server)

```bash
cd Server
npm install
```

#### Create `.env` file in `/Server`:

```env
MONGO_URI=your-mongodb-connection-url
JWT_SECRET=your-secret-key
```

#### Run Locally:

```bash
node server.js
# or if using nodemon:
npx nodemon server.js
```

Backend runs at: `http://localhost:5000`

---

### 🌐 Frontend Setup (Client)

```bash
cd client
npm install
```

#### Optional: Create `.env` in `/client`

```env
REACT_APP_API_BASE=http://localhost:5000
```

#### Run Locally:

```bash
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🗂️ Features

* 🔐 JWT-based user authentication
* 📝 Task CRUD operations
* 🔍 Filter by priority/status
* 📅 Sort by due date
* 🎨 Animated + responsive UI
* 🔒 Environment variable-based config

---


