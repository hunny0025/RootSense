<<<<<<< HEAD
# 🌳 RootSense Full-Stack

RootSense is a comprehensive sustainability platform designed for college campuses to track tree survival, report civic issues, and measure environmental impact using AI-powered insights.

## Project Structure

- **`/frontend`**: Next.js 14 application (UI, Client Logic)
- **`/backend`**: Express.js server (Admin Auth, API)

## 🚀 Quick Start

You need to run **both** the frontend and backend servers.

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Runs on `http://localhost:5000`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:3000`

## 🔑 Environment Variables

### Backend (`/backend/.env`)
```
ADMIN_EMAIL=admin@rootsense.com
ADMIN_PASSWORD=admin123
PORT=5000
```

### Frontend (`/frontend/.env.local`)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_GEMINI_API_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## 🛡️ Admin Panel
Access the secure admin panel at: `http://localhost:3000/admin/login`

**Default Credentials:**
- Email: `admin@rootsense.com`
- Password: `admin123`
=======
# RootSense
>>>>>>> 27b56179df10630cfb24e4baa786e5529ae52506
