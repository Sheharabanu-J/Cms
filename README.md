# RenewCred CMS Platform

A complete, production-ready Headless CMS with a Block-Based Editor, Admin Dashboard, and Dynamic Public Website.

## Architecture

This project uses a Monorepo structure containing three parts:
- `backend/`: Node.js, Express, MongoDB API.
- `admin-frontend/`: React Admin Dashboard with TipTap block editor.
- `public-frontend/`: React Public Website rendering dynamic blocks.

## Folder Structure

```
renewcred-cms/
├── backend/            # Express API, MongoDB models, Auth
├── admin-frontend/     # React Admin Panel (Vite)
├── public-frontend/    # React Public Website (Vite)
├── docker-compose.yml  # Docker orchestration
├── .env.example        # Environment variables template
└── README.md
```

## Installation

1. Clone the repository and navigate to the project root.
2. Install all dependencies:
   ```bash
   npm run install:all
   ```

## Running without Docker

1. Create a `.env` file in the `backend/` directory and populate it based on `.env.example`.
2. Start the development servers concurrently:
   ```bash
   npm run dev
   ```
   This will start:
   - Backend on http://localhost:5000
   - Admin Frontend on http://localhost:5173
   - Public Frontend on http://localhost:5174
