# Laxmi Traders — Fullstack Starter (Working Code)

## What is included
- backend: Express server with submission endpoint, Puppeteer PDF generation, Multer uploads, Mongoose model.
- frontend: Vite + React app with Landing, Form, Success and Admin pages.

## How to run (locally)
1. Backend:
   - cd backend
   - cp .env.example .env  (edit values as needed)
   - npm install
   - node server.js
2. Frontend:
   - cd frontend
   - npm install
   - npm run dev

Note: Puppeteer downloads a Chromium binary on `npm install`. If you run in a restricted environment, configure Puppeteer to use system Chromium via env vars.