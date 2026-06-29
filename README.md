🐾 PetNest – Full-Stack Pet Adoption Platform

PetNest is a modern, full-stack pet adoption portal designed to connect adorable pets with loving forever homes.
Users can browse pets, submit adoption requests, and pet owners get a full dashboard to manage listings and adoption workflows.

🚀 Live Links
Live Deployment: [live Link](https://pet-adoption-next-project.vercel.app/)
Client Repository: [Repo Client Side](https://github.com/rifadhossainrabbi/Pet-Adoption-Assignment-9-client-side-next-project)
Server Repository: [Repo Server Side](https://github.com/rifadhossainrabbi/Pet-Adoption-Server-Side)
🎯 Purpose

PetNest streamlines the pet adoption process. It helps animal lovers find companions easily and gives pet owners/shelters a secure dashboard to publish pets and handle adoption requests.

✨ Key Features
🔍 Advanced Search & Filter
Search pets by name using MongoDB $regex
Filter pets by species using $in
Instant results (SSR / no-cache fetching)

📩 Complete Adoption Workflow
Authenticated users submit adoption requests
Pet owners approve or reject requests from their dashboard

🔐 Secure Authentication
Implemented with Better-Auth
Login via Email/Password & Google OAuth
JWT stored inside secure HTTPOnly cookies

📊 Owner Dashboard
Add pets
Update pet info
Delete pets
Review adoption requests
Approve / Reject requests

🎨 Interactive Premium UI
Built with HeroUI
Smooth animations using Framer Motion
Modern & minimal dark theme

📱 Fully Responsive
Mobile-first layout
Responsive dashboard + navbar
Optimized for all devices

🔔 Real-Time Toast Notifications
React-Hot-Toast added for instant feedback
(CRUD operations, login, errors)

🛠️ Tech Stack
Frontend (Next.js 16 – App Router)
Next.js 16
Tailwind CSS 4
HeroUI
React Hook Form
Framer Motion
Better-Auth (client plugin)
React Icons
React Hot Toast
React Spinners
Backend (Node + Express)
Express.js
MongoDB (Native Driver)
JWT Auth using jose
CORS + Dotenv

📦 Packages & Their Purpose

### Core Framework
next — React-based full stack framework (SSR, SSG, Routing)
react / react-dom — UI building & rendering libraries
### Authentication & Database
better-auth — Authentication system (login, signup, sessions)
@better-auth/mongo-adapter — Better Auth ↔ MongoDB connection adapter
mongodb — MongoDB database driver
### UI & Components
@heroui/react — Pre-built modern UI components
@heroui/styles — HeroUI styling system
react-icons — Popular icon packs as React components
framer-motion — Smooth animations & transitions
react-hot-toast — Toast notifications
react-spinners — Loading spinners
### Forms
react-hook-form — High-performance form handling & validation

### Dev Tools
tailwindcss — Utility-first CSS framework
@tailwindcss/postcss — PostCSS setup for Tailwind
eslint — Linting tool for cleaner code
eslint-config-next — ESLint rules optimized for Next.js
babel-plugin-react-compiler — React compiler optimization