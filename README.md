<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Spade Digital Project - Meeting Room Booking System</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 20px;
      background-color: #f4f4f4;
    }
    h1 {
      color: #333;
    }
    h2 {
      color: #555;
    }
    p, ul {
      font-size: 1rem;
      color: #666;
    }
    ul {
      list-style-type: square;
      margin-left: 20px;
    }
    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .tech {
      background-color: #ddd;
      padding: 8px;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <h1>Spade Digital - Meeting Room Booking System</h1>
  <p>This project is a meeting room booking system built with modern technologies.</p>

  <h2>Technologies Used:</h2>
  <div class="tech-stack">
    <div class="tech">Next.js 14</div>
    <div class="tech">React</div>
    <div class="tech">Prisma</div>
    <div class="tech">TailwindCSS</div>
    <div class="tech">TypeScript</div>
    <div class="tech">MongoDB</div>
    <div class="tech">Zod</div>
    <div class="tech">Clerk (Authentication)</div>
  </div>

  <h2>How to Run the Project Locally:</h2>
  <ol>
    <li><strong>Clone the repository:</strong>
      <pre>git clone https://github.com/yourusername/spade-digital-14.git</pre>
    </li>
    <li><strong>Install dependencies:</strong>
      <pre>npm install</pre>
    </li>
    <li><strong>Set up environment variables:</strong>
      <ul>
        <li>Create a `.env` file in the root directory.</li>
        <li>Set the necessary environment variables for MongoDB and Clerk authentication. Example:</li>
        <pre>
NEXT_PUBLIC_CLERK_FRONTEND_API=<Your Clerk Frontend API>
CLERK_API_KEY=<Your Clerk API Key>
DATABASE_URL=mongodb://localhost:27017/spade-digital
        </pre>
      </ul>
    </li>
    <li><strong>Run the project:</strong>
      <pre>npm run dev</pre>
    </li>
    <li>Visit <strong>http://localhost:3000</strong> to view the app in your browser.</li>
  </ol>

  <h2>Additional Setup for Prisma:</h2>
  <ol>
    <li><strong>Run Prisma migrations:</strong>
      <pre>npx prisma migrate dev</pre>
    </li>
    <li><strong>Seed the database (optional):</strong>
      <pre>npx prisma db seed</pre>
    </li>
  </ol>

  <h2>How to Contribute:</h2>
  <ul>
    <li>Fork the repository.</li>
    <li>Create a feature branch.</li>
    <li>Make your changes.</li>
    <li>Submit a pull request for review.</li>
  </ul>

  <h2>License:</h2>
  <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>
