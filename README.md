# 🔐 MERN Authentication App

A full-stack authentication system built with the **MERN stack** (MongoDB, Express, React, Node.js). This project provides user registration, login, logout, and protected routes — all wrapped in a modern, responsive UI using **Material-UI** and **TailwindCSS**.

---

## ✨ Features

- **👤 User Registration** – Secure signup with hashed passwords.
- **🔑 User Login** – JWT-based authentication, with tokens stored in cookies and `localStorage`.
- **🔒 Protected Routes** – Access control for authenticated users only.
- **🚪 Logout** – Securely logs users out and clears tokens.
- **🎨 Modern UI** – Built with React, Material-UI, and TailwindCSS.
- **✅ Form Validation** – Backend (Joi) + Frontend (Material-UI) validation.
- **📢 Notifications** – Smooth user feedback via React Toastify.

---

## 🧰 Tech Stack

### Frontend
- React
- React Router
- Material-UI
- TailwindCSS
- React Toastify
- Vite

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT (jsonwebtoken)
- bcrypt
- Joi
- dotenv
- CORS
- cookie-parser


## 🔄 How It Works

### 📝 Registration
User submits `name`, `email`, and `password` → password is hashed with `bcrypt` → user is saved in MongoDB.

### 🔓 Login
User submits credentials → backend verifies → issues JWT → token is stored as **HTTP-only cookie** + `localStorage`.

### 🔐 Protected Routes
Frontend checks for token → backend validates JWT on protected APIs → grants or denies access.

### 🚪 Logout
Backend clears HTTP-only cookie → frontend removes localStorage token → user session ends.
