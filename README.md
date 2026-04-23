# 🌌 Uppala Mahesh — Personal Portfolio (MERN Stack)

A fully functional, production-grade personal portfolio built with **React**, **Node.js**, **Express**, and **MongoDB**.

## ✨ Features

- **6 Dynamic Pages** — Home, About, Qualifications, Skills, Certifications, Contact
- **REST API Backend** — Express.js with Mongoose ODM
- **MongoDB Database** — 5 collections (profile, skills, projects, certifications, messages)
- **Responsive Design** — Mobile-first with hamburger navigation
- **Galactic Dark Theme** — Glassmorphism, gradient accents, particle animations
- **Form Validation** — Frontend (React) + Backend (Express middleware)
- **Modal Popups** — Certificate preview with backdrop blur
- **Animated UI** — Framer Motion page transitions, scroll reveals, progress bars
- **Typewriter Effect** — Hero section role cycling

## 🛠️ Tech Stack

| Layer      | Technology                            |
|------------|---------------------------------------|
| Frontend   | React 18, Vite, React Router, Framer Motion, React Icons, Axios |
| Backend    | Node.js, Express.js                   |
| Database   | MongoDB (Mongoose ODM)                |
| Styling    | Vanilla CSS (custom design system)    |
| Fonts      | Space Grotesk, Inter, JetBrains Mono  |

## 📁 Project Structure

```
project/
├── client/                    (React + Vite)
│   ├── src/
│   │   ├── components/        (10 reusable components)
│   │   ├── pages/             (6 page components)
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                    (Node.js + Express)
│   ├── models/                (6 Mongoose schemas)
│   ├── routes/                (6 route files)
│   ├── controllers/           (6 controllers)
│   ├── middleware/             (validation)
│   ├── seed.js
│   ├── server.js
│   └── package.json
│
├── .env
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd project

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install

# 4. Configure environment
# Edit .env in root directory:
# MONGODB_URI=mongodb://localhost:27017/portfolio
# PORT=5000

# 5. Seed the database
cd ../server
node seed.js

# 6. Start backend (terminal 1)
node server.js

# 7. Start frontend (terminal 2)
cd ../client
npm run dev
```

### Access
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api

## 📡 API Endpoints

| Method | Endpoint              | Description            |
|--------|-----------------------|------------------------|
| GET    | `/api/profile`        | Fetch profile data     |
| GET    | `/api/skills`         | Fetch all skills       |
| GET    | `/api/projects`       | Fetch all projects     |
| GET    | `/api/certifications` | Fetch certifications   |
| GET    | `/api/qualifications` | Fetch qualifications   |
| POST   | `/api/contact`        | Submit contact message |
| GET    | `/api/contact`        | Retrieve all messages  |

## ✅ Validation Rules

### Frontend (React)
- All fields required
- Email format validation
- 10-digit mobile number check

### Backend (Express Middleware)
- No empty fields allowed
- Email regex validation
- Mobile must be exactly 10 digits

## 👤 Author

**Uppala Mahesh**  
B.Tech IT — Vasavi College of Engineering  
