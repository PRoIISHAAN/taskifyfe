# Taskify Frontend (taskifyfe)

Vite + React frontend for Taskify.

## Tech Stack
- React
- Vite
- React Router
- Axios
- Tailwind CSS
- MUI + Radix UI + DnD libraries

## Prerequisites
- Node.js 18+
- npm
- Running Taskify backend API

## Environment Variables
Create a `.env` file using `.env.example` as reference.

Required keys:
- `VITE_API_BASE_URL`

Example:
- `VITE_API_BASE_URL=http://localhost:3000`

## Install
```bash
npm install
```

## Run (Development)
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Preview Build
```bash
npm run preview
```

## Lint
```bash
npm run lint
```

## Axios Configuration
Axios is configured in `src/main.jsx`:
- Uses `VITE_API_BASE_URL` as `axios.defaults.baseURL`
- Sends cookies by default (`withCredentials = true`)

## Notes
- Keep environment-specific values in `.env`.
- Do not hardcode API hosts or secrets in source files.
