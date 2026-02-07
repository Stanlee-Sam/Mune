# Mune

Mune is a pet health early-warning platform that helps owners and vets monitor symptoms, track outbreak alerts, and discover nearby veterinary clinics.

## Features
- Symptom checker with rule-based risk evaluation and recommended action
- Outbreak alerts (create, view, update, delete)
- Veterinary clinics directory (add, update, delete, image upload)
- Authentication with role-based access (OWNER, VET)

## Tech Stack
- Frontend: Next.js (App Router), React, React DOM, Tailwind CSS, Axios, Sonner, Motion, Next Themes, React Icons, React Spinners, Lucide, clsx, class-variance-authority, tailwind-merge, jwt-decode
- Frontend Dev: TypeScript, ESLint, @types/node, @types/react, @types/react-dom, Tailwind CSS, @tailwindcss/postcss, tw-animate-css
- Backend: Node.js, Express, Prisma, PostgreSQL, jsonwebtoken (JWT), bcrypt, multer, Cloudinary (multer-storage-cloudinary), dotenv, CORS
- Backend Dev: nodemon

## Project Structure
- `frontend/` Next.js client app
- `backend/` Express API + Prisma schema/migrations

## Environment Variables
Create `.env` files for each app as needed.

### Backend (`backend/.env`)
- `DATABASE_URL` Postgres connection string
- `JWT_SECRET` JWT signing secret
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### Frontend (`frontend/.env`)
- `NEXT_PUBLIC_API_URL` Base URL for the API (e.g. `http://localhost:5000`)

## Setup

### 1) Install dependencies

```bash
# backend
cd backend
npm install

# frontend
cd ../frontend
npm install
```

### 2) Database setup (backend)

```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

### 3) Run the apps

```bash
# backend
cd backend
node server.js
# or
npx nodemon server.js

# frontend
cd ../frontend
npm run dev
```

The frontend runs at `http://localhost:3000` and the API at `http://localhost:5000`.

## API Routes (Summary)
- `POST /users/register` Create account
- `POST /users/login` Login and receive JWT
- `PUT /users/:id` Update user (auth required)
- `POST /evaluate` Evaluate symptoms (auth required)
- `GET /outbreaks` List outbreak alerts
- `GET /outbreaks/:id` Get outbreak detail
- `POST /outbreaks` Create outbreak (VET only)
- `PUT /outbreaks/:id` Update outbreak (VET only)
- `DELETE /outbreaks/:id` Delete outbreak (VET only)
- `GET /clinic` List clinics
- `POST /clinic` Create clinic (VET only)
- `PUT /clinic/:id` Update clinic (VET only)
- `DELETE /clinic/:id` Delete clinic (VET only)

## Notes
- CORS in `backend/server.js` is currently limited to `http://localhost:3000`.
- The symptom evaluation engine uses rule definitions from the database and checks outbreak status by location.
