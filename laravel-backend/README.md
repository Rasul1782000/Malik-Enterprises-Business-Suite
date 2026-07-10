# Malik Enterprises — Laravel 11 Backend API Gateway

This is the secure, production-grade **Laravel 11** REST API backend designed for **Malik Enterprises** in Multan, Pakistan. It handles form payload sanitization, SQLite/MySQL database persistence, safe local storage of PDF resume attachments, and secure CORS response mappings.

---

## 🛠️ Backend Architecture Features

- **Laravel 11**: Minimalist modern bootstrap, controller routing, type-safe database queries, and modular request validation classes.
- **REST APIs**:
  - `GET /api/jobs`: Returns the stable corporate industrial job openings registry.
  - `POST /api/contact`: Accepts and sanitizes client inquiries; generates unique transaction receipts.
  - `POST /api/careers/apply`: Stores candidate profiles and handles file system storage of resumes.
- **Durable File Handling**: Automatically saves resume file buffers in the secure `storage/app/resumes` filesystem folder with unique hashed file names to prevent naming collisions.
- **CORS Configured**: Secure middleware allowing authorized cross-origin requests from the Angular client (usually running on port `4200`).

---

## 📁 Key File Structure

```text
laravel-backend/
├── app/
│   ├── Models/
│   │   ├── ContactMessage.php     # Eloquent schema mapping contact logs
│   │   └── JobApplication.php     # Eloquent schema mapping candidate resume entries
│   └── Http/
│       └── Controllers/
│           ├── ContactController.php  # Handles email validation and receipt creation
│           └── CareerController.php   # Handles resume storage and profile insertion
├── routes/
│   └── api.php                    # Declares endpoints (jobs, contact, apply)
├── database/
│   ├── migrations/
│   │   ├── 2026_07_10_000000_create_contact_messages_table.php
│   │   └── 2026_07_10_000001_create_job_applications_table.php
│   └── database.sqlite            # Standard lightweight local SQLite db
├── composer.json                  # PHP dependency listings
└── .env.example                   # Environment configuration template
```

---

## 🚀 Execution & Local Setup Instructions

### Prerequisites
Make sure you have PHP (v8.2+) and Composer installed on your development workstation:
```bash
# Verify versions
php -v
composer -v
```

### Installation & Initialization
1. Navigate into the backend directory:
   ```bash
   cd laravel-backend
   ```
2. Install Composer dependencies:
   ```bash
   composer install
   ```
3. Copy environment configuration:
   ```bash
   cp .env.example .env
   ```
4. Generate the application cryptographic key:
   ```bash
   php artisan key:generate
   ```

### Database Seeding & Migrations
Configure your preferred database in `.env` (SQLite is configured by default for convenience):
1. Create an empty SQLite file if using SQLite:
   ```bash
   touch database/database.sqlite
   ```
2. Run database migrations to establish contact and careers tables:
   ```bash
   php artisan migrate
   ```

### Start Local Web Server
Start the Laravel artisan development engine:
```bash
php artisan serve --port=8000
```
Your secure REST API will be running on [http://localhost:8000/api](http://localhost:8000/api).

---

## 🔒 Security Measures Implemented
- **Request Validation**: Direct injection blocks SQL-injection and enforces size limits on files (Max 5MB for PDF/Docx).
- **Unique Hash IDs**: Uses `Str::uuid()` to prevent ID enumeration.
- **Secure File Storage**: Uploaded files are placed inside the storage sandbox which is isolated from direct public web access unless explicitly linked.
