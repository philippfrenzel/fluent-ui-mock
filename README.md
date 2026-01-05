# Fluent UI Mocks (Vite + React + Fluent v9)

This is a small, runnable mock app that demonstrates a simple “Reference Tables” experience using **Fluent UI React v9**.

## Prerequisites

- Node.js 18+ (Node 20+ recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (default: `http://localhost:5173`).

## Build + preview

```bash
npm run build
npm run preview
```

Preview runs on `http://localhost:4173`.

## Generate screenshots

```bash
npm run screenshots
```

This will:
1. build the app
2. start `vite preview`
3. capture 3 full-page screenshots into `./mocks/`

## Routes

- `/reference-tables` – list
- `/reference-tables/:id` – detail
- `/admin/reference-tables/:id/edit` – admin edit
