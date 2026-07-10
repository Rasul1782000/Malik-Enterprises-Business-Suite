# Malik Enterprises — Angular Frontend App

This is a modern, responsive **Angular (v18+)** client-side single page application designed for **Malik Enterprises**. It integrates securely with the **Laravel 11 API Gateway** to retrieve job openings, dispatch contact requests, and lodge career resume applications.

---

## 🛠️ Tech Stack & Key Design Features

- **Angular (v18+)**: High performance, type-safe frontend architecture using modern **Standalone Components**, the new **Signals** reactive system, and modern dependency injection.
- **PrimeNG**: Configured with a modern sky blue theme and high-contrast clean white components to provide clear, beautiful user inputs, cards, and file uploads.
- **Tailwind CSS (v3+)**: Responsive layout blocks, fluid padding metrics, and high-contrast color choices styled with an industrial-corporate sky blue and crisp white theme.
- **Modular Sections**: Home/About view, Interactive Divisions switcher, Careers desk with drag-and-drop resume loader, and Contact terminal with vector coordinate positioning.
- **RxJS API Client**: Built-in state management using custom services to securely poll job registries, post validations, and track secure transactional reference IDs.

---

## 📁 Folder Structure Overview

```text
angular-frontend/
├── angular.json               # Angular workspace configuration
├── package.json               # Frontend dependencies & scripts
├── tsconfig.json              # TypeScript compilation guidelines
├── src/
│   ├── index.html             # Application entry-point
│   ├── main.ts                # Bootstrap mechanism
│   ├── styles.css             # Tailwind imports & global styles
│   └── app/
│       ├── app.config.ts      # Client routes & providers
│       ├── app.component.ts   # Navbar, footer & state coordinator
│       ├── app.component.html # Layout wrapper
│       ├── services/
│       │   └── api.service.ts # Secure RxJS Laravel API handler
│       └── components/        # Isolated visual sections
│           ├── hero/          # Hero display & key principals
│           ├── about/         # Founders, timeline & certifications
│           ├── services/      # Bento tabs & division details
│           ├── careers/       # Job descriptions & application form
│           └── contact/       # Coordinates map & secure validation
```

---

## 🚀 Execution & Local Setup Instructions

### Prerequisites
Make sure you have Node.js (v18.0.0 or higher) and the Angular CLI installed on your local machine:
```bash
npm install -g @angular/cli
```

### Installation
1. Navigate into the frontend directory:
   ```bash
   cd angular-frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```

### Running in Development Mode
Start the local development server:
```bash
ng serve --port 4200
```
Open [http://localhost:4200](http://localhost:4200) in your browser. The application supports Hot Module Replacement (HMR).

### Building for Production
Compile the optimized static files into the `dist/` directory:
```bash
ng build --configuration production
```

---

## 🔒 Connecting to the Laravel Backend
Configure your API URL inside `src/app/services/api.service.ts`. By default, the service is configured to look for the backend gateway on `http://localhost:8000/api`. Ensure CORS is enabled on the Laravel server.
