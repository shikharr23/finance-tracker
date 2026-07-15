# Finance Tracker

A full-stack Finance Tracker application built with **React**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**.

The application allows users to securely manage their personal finances by tracking income and expenses, visualizing spending patterns, and maintaining a transaction history.

---

## Features

- User Authentication (Sign Up / Sign In)
- JWT-based Authentication
- Add Transactions
- Edit Transactions
- Delete Transactions
- Dashboard with Financial Summary
- Charts for Income & Expenses
- Net Balance Calculation
- Responsive UI
- Fast frontend with Vite
- Modern UI built using Tailwind CSS

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios
- Recharts

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Zod Validation

---

## Project Structure

```text
finance-tracker/
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── main.jsx
│   │
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/finance-tracker.git
cd finance-tracker
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

---

## Authentication

The application uses JWT authentication for securing protected routes and API requests.

---

## Dashboard

The dashboard displays:

- Total Transactions
- Net Balance
- Total Income
- Total Expenses
- Transaction Charts

---

