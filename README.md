# DSA Tracker - Full Stack Application

A full-stack DSA (Data Structures and Algorithms) problem tracker with premium dark mode aesthetics, interactive tree navigation, and individual difficulty-level progress reporting.

---

## 📂 Repository Structure

The project has been split into dedicated folders for ease of development and deployment:

```text
Assignment/
├── frontend/             # React (Vite) client application
│   ├── src/              # Page views, layout components, context providers, API config
│   ├── public/           # Static assets
│   ├── package.json      # Frontend package configuration
│   └── ...
└── backend/              # Node.js + Express backend server
    ├── src/              # Controllers, routes, models, middleware, database seeder
    ├── .env              # Environment configurations (MongoDB URI, JWT secret, Port)
    ├── package.json      # Backend package configuration
    └── ...
```

---

## 🚀 How to Run the Application

Since both applications are isolated, navigate to the respective directory and follow the instructions below:

### 1. Backend Server Setup

1. **Navigate to the directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   corepack pnpm install
   ```

3. **Database Seeding**:
   Populate the MongoDB instance with the core DSA topics and problems:
   ```bash
   corepack pnpm run seed
   ```

4. **Start the development server**:
   ```bash
   corepack pnpm run dev
   ```
   The backend server runs by default on `http://localhost:5000`.

---

### 2. Frontend React Setup

1. **Navigate to the directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   corepack pnpm install
   ```

3. **Start the development server**:
   ```bash
   corepack pnpm run dev
   ```
   Open your browser at the local address shown in your terminal (typically `http://localhost:5173`).

4. **Production Build**:
   ```bash
   corepack pnpm run build
   ```

---

## ✨ Features Implemented
- **Premium Styling**: Glassmorphic elements, modern typography (Outfit/Inter), and customized responsive inputs suited for dark mode viewports.
- **Dynamic Status Toggles**: Clicking checkboxes synchronizes progress to MongoDB. Features optimistic UI rendering which rolls back dynamically in case of sync errors.
- **Difficulty Progress Indicators**: View overall stats alongside three dedicated color-coded progress bars for **Easy (Green)**, **Medium (Yellow)**, and **Hard (Red)** difficulty levels.
- **Topic Level Statuses**: Chapters automatically show green `Done` badges once all of their problems are completed, and `Pending` otherwise.
