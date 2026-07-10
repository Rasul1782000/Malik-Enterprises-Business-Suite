# Malik Enterprises — Unified Corporate Architecture

Welcome to the official enterprise application repository for **Malik Enterprises**, based in Multan, Pakistan. This project comprises two core elements designed to showcase and deploy a responsive corporate website, career acquisition portal, and secure operations dashboard:

1. **🚀 Active Full-Stack Applet (React + Express)**: A live, interactive full-stack application running on Node.js. It powers the live container preview of the landing page, allowing you to browse services, search jobs, apply with resumes, submit contact requests, and immediately view submissions in real-time in the secure portal.
2. **🏢 Separated Laravel & Angular Blueprints**: Located inside the `/laravel-backend` and `/angular-frontend` directories. This is the production-grade, highly organized architecture requested for your standard deployment, incorporating standalone TypeScript clients and Eloquent-validated PHP controllers.

---

## 🏢 Business Overview (Malik Enterprises)

- **Key Principal**: Malik Faisal Azeem
- **Headquarters Address**: 46-C Industrial Estate Phase-1, Sher Shah Town, Multan, 60000 Pakistan
- **Principal Operational Sectors**:
  1. **Warehouse Clubs, Supercenters, and General Merchandise Retailers**: High-capacity logistics distribution, vendor sourcing, and automated sorting frameworks.
  2. **Plastics Product Manufacturing**: Injection molding, thermoplastic blowing, and custom structural polymer extrusion.
  3. **Commercial and Industrial Machinery Repair & Maintenance**: Heavy industrial gear calibration, cylinder troubleshooting, and preventative manufacturing plant upkeep (excluding automotive & electronics).

---

## 🚀 Live Container Applet (React + Express)

The preview in your workspace is running this full-stack setup on Port `3000`. It matches the exact functional capability of the Angular-Laravel blueprint:

### System Architecture
- **Vite & React (Frontend)**: Inter, Space Grotesk, and JetBrains Mono typography paired with custom CSS fluid styling. Holds a custom SVG vector coordinate map of Multan Industrial Estate.
- **Express Node.js (Backend)**: Secure `/api/jobs` registry, `/api/contact` validation, and `/api/careers/apply` uploader logic.
- **Operations Console**: Accessible via the **Portal** button in the header. Shows in-memory logs of forms filled during the current preview session!

### Quick Commands (Container-Specific)
- **Launch Development Server**: `npm run dev` (starts `server.ts` on port 3000)
- **Compile Production Bundle**: `npm run build` (bundles assets with Vite & compiles the server to CJS with `esbuild` into `dist/`)
- **Start Production Container**: `npm run start`

---

## 📐 Enterprise Separated Blueprints

For your permanent external production setup, we have compiled completely configured codebases in separate folders. 

### 🟢 1. Angular Frontend (`/angular-frontend`)
A modern **Angular v18** standalone client-side SPA.
- **Features**: RxJS API integrations, reactive form binding, drag-and-drop resume loader preview, and responsive responsive styling.
- **How to Run**:
  ```bash
  cd angular-frontend
  npm install
  ng serve --port 4200
  ```
- *See [angular-frontend/README.md](./angular-frontend/README.md) for detailed blueprints.*

### 🔴 2. Laravel Backend (`/laravel-backend`)
A secure **Laravel 11** PHP API gateway.
- **Features**: Eloquent models, migration schemas for database tables, and controller-level validators.
- **How to Run**:
  ```bash
  cd laravel-backend
  composer install
  cp .env.example .env
  php artisan key:generate
  touch database/database.sqlite
  php artisan migrate
  php artisan serve --port=8000
  ```
- *See [laravel-backend/README.md](./laravel-backend/README.md) for detailed blueprints.*

---

## 🔒 Security & API Integration Overview

Both the live preview and the separated blueprints utilize advanced security practices:
1. **Filename Isolation**: Resume files are saved with cryptographic UUID values instead of plain user names, blocking path traversal and file inclusion exploits.
2. **Strict MIME Constraints**: Reject potential malware by explicitly restricting uploads to verified PDF, DOC, or DOCX formats under 5MB.
3. **Payload Sanitization**: Form inputs undergo HTML-tag stripping and email validations to prevent Cross-Site Scripting (XSS) and SQL injection.
