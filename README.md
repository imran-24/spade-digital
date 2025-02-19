# Spade Digital - Meeting Room Booking System

This project is a meeting room booking system built with modern technologies.

## Technologies Used
<div style="display: flex; flex-wrap: wrap; gap: 8px;">
  <img src="https://img.shields.io/badge/Next.js_14-black?style=flat-square&logo=next.js" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Zod-3068B7?style=flat-square" alt="Zod" />
  <img src="https://img.shields.io/badge/Clerk-6C47FF?style=flat-square" alt="Clerk (Authentication)" />
</div>

## How to Run the Project Locally

1. **Clone the repository:**
   ```bash
   https://github.com/imran-24/spade-digital.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Edit the `.env.example` file in the root directory
   - Set the necessary environment variables for MongoDB and Clerk authentication:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   NEXT_PUBLIC_IS_ADMIN=
   DATABASE_URL=mongodb://localhost:27017/spade-digital
   ```

4. **Run the project:**
   ```bash
   npm run dev
   ```

5. Visit **http://localhost:3000** to view the app in your browser.

## Additional Setup for Prisma

1. **Run Prisma migrations:**
   ```bash
   npx prisma generate
   ```
   ```bash
   npx prisma db push
   ```

2. **Seed the database (optional):**
   ```bash
   npx prisma db seed
   ```

## Screenshots

![Dashboard Preview](https://via.placeholder.com/800x450?text=Dashboard+Preview)

## Project Structure
```
spade-digital-14/
├── app/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── pages/
├── prisma/
├── public/
└── ...configuration files
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
