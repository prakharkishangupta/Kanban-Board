# Kanban Board – Full Stack MERN Application

A full-stack Kanban Board application built using the MERN stack with JWT authentication, drag-and-drop task management, and a modern UI using Tailwind CSS + DaisyUI.

This project allows users to manage tasks across different stages ("To Do", "In_Progress", "Done") with support for creating, updating, deleting, and dragging tasks between columns.

---

## Features

### Authentication
- User Signup & Login
- JWT-based authentication
- Secure HTTP-only cookies
- Protected routes for authenticated users only

### Task Management
- Create tasks with title & description
- Edit task title and description
- Delete tasks
- Drag & drop tasks between columns
- Persistent task state per user

### Kanban Board
- Columns: To Do, In_Progress, Done
- Smooth drag-and-drop using React DnD
- Dark themed, responsive UI

---

## Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS (v4)
- DaisyUI
- React DnD
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs

---

## Project Structure
Kanban/
├── Backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── index.js
│ └── package.json
│
├── Frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── dnd/
│ │ └── main.jsx
│ ├── index.html
│ ├── tailwind.config.js
│ ├── vite.config.js
│ └── package.json
│
└── README.md


---

## Installation & Setup

### Clone the Repository

```bash
git clone 
cd kanban-board

