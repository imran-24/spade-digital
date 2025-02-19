<h1 style="font-family: Arial, sans-serif; color: #333;">Spade Digital - Meeting Room Booking System</h1>
<p style="font-family: Arial, sans-serif; line-height: 1.6; color: #666;">This project is a meeting room booking system built with modern technologies.</p>

<h2 style="font-family: Arial, sans-serif; color: #555;">Technologies Used:</h2>
<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <div style="background-color: #ddd; padding: 8px; border-radius: 5px; font-family: Arial, sans-serif;">Next.js 14</div>
  <div style="background-color: #ddd; padding: 8px; border-radius: 5px; font-family: Arial, sans-serif;">React</div>
  <div style="background-color: #ddd; padding: 8px; border-radius: 5px; font-family: Arial, sans-serif;">Prisma</div>
  <div style="background-color: #ddd; padding: 8px; border-radius: 5px; font-family: Arial, sans-serif;">TailwindCSS</div>
  <div style="background-color: #ddd; padding: 8px; border-radius: 5px; font-family: Arial, sans-serif;">TypeScript</div>
  <div style="background-color: #ddd; padding: 8px; border-radius: 5px; font-family: Arial, sans-serif;">MongoDB</div>
  <div style="background-color: #ddd; padding: 8px; border-radius: 5px; font-family: Arial, sans-serif;">Zod</div>
  <div style="background-color: #ddd; padding: 8px; border-radius: 5px; font-family: Arial, sans-serif;">Clerk (Authentication)</div>
</div>

<h2 style="font-family: Arial, sans-serif; color: #555;">How to Run the Project Locally:</h2>
<ol style="font-family: Arial, sans-serif; line-height: 1.6; color: #666;">
  <li><strong>Clone the repository:</strong>
    <pre style="background-color: #f4f4f4; padding: 10px;">git clone https://github.com/yourusername/spade-digital-14.git</pre>
  </li>
  <li><strong>Install dependencies:</strong>
    <pre style="background-color: #f4f4f4; padding: 10px;">npm install</pre>
  </li>
  <li><strong>Set up environment variables:</strong>
    <ul>
      <li>Edit the <code>.env.example</code> file in the root directory.</li>
      <li>Set the necessary environment variables for MongoDB and Clerk authentication. Example:</li>
      <pre style="background-color: #f4f4f4; padding: 10px;">
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
        CLERK_SECRET_KEY=
        NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
        NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
        NEXT_PUBLIC_IS_ADMIN=
        DATABASE_URL=mongodb://localhost:27017/spade-digital
      </pre>
    </ul>
  </li>
  <li><strong>Run the project:</strong>
    <pre style="background-color: #f4f4f4; padding: 10px;">npm run dev</pre>
  </li>
  <li>Visit <strong>http://localhost:3000</strong> to view the app in your browser.</li>
</ol>

<h2 style="font-family: Arial, sans-serif; color: #555;">Additional Setup for Prisma:</h2>
<ol style="font-family: Arial, sans-serif; line-height: 1.6; color: #666;">
  <li><strong>Run Prisma migrations:</strong>
    <pre style="background-color: #f4f4f4; padding: 10px;">npx prisma migrate dev</pre>
  </li>
  <li><strong>Seed the database (optional):</strong>
    <pre style="background-color: #f4f4f4; padding: 10px;">npx prisma db seed</pre>
  </li>
</ol>
