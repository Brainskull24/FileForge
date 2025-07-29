# 📦 FileForge

A modern, fast, and minimal frontend built with **Vite**, **React + TypeScript**, and **Tailwind CSS**. This app communicates with the FileForge backend and supports multiple environments via `.env` variables.

---

## 🚀 Features

- ⚡ Blazing fast development with Vite
- 🌈 Tailwind CSS + shadcn/ui for modern UI
- 🔐 Secure authentication via JWT and Firebase
- 🌐 Environment-based configuration using `.env`
- 📤 File encoding/decoding utilities (Base64, HEX, URL, etc.)
- 📈 Usage-based credit system

---

## 🛠️ Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- Axios, Zod, React Hook Form, etc.

---

## 📁 Project Structure

```bash
src/
├── components/        # Reusable UI components   
├── lib/               # API utilities, Axios setup
├── hooks/             # Custom React hooks
├── utils/             # Helper functions
├── assets/            # Static assets (icons, images)
├── App.tsx            # Main app entry
└── main.tsx           # Vite mount point
```

⚙️ Setup & Installation
Clone the repository

```bash
git clone https://github.com/your-username/fileforge-frontend.git
cd client
```

Install dependencies

```bash
npm install
Create a .env file
```

## .env

```bash
VITE_API_URL=https://api.fileforge.in
VITE_GOOGLE_CLIENT_ID=your_google_client_id
Start the dev server
```

```bash
npm run dev
🧪 Available Scripts
npm run dev – Start development server

npm run build – Build for production

npm run preview – Preview built app
```

## 🌍 Environment Variables
Variable	Description
VITE_API_URL	Base URL for the backend API
VITE_GOOGLE_CLIENT_ID	Google OAuth Client ID

All env vars must be prefixed with VITE_ to be exposed in Vite.

## 🔒 Production Build
```bash
npm run build
Compiles your frontend into /dist, ready to deploy to any static host (e.g. Netlify, Vercel, Cloudflare Pages).
```

## 🧰 Tools Used in Dev
ESLint + Prettier for linting and formatting

Husky + Lint-staged for pre-commit hooks

shadcn/ui for accessible, themeable components

## 📬 Support
Having trouble? Reach us at support@fileforge.com or join our Discord Community.
 
## 📄 License
MIT License © 2025 [Your Name or Team]
---