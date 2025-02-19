<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Spade Digital - Meeting Room Booking System</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .tech-badge {
      display: inline-block;
      background-color: #f0f0f0;
      padding: 5px 10px;
      border-radius: 5px;
      margin: 5px;
    }
    .code-container {
      position: relative;
      margin: 15px 0;
    }
    pre {
      background-color: #f4f4f4;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
    }
    .copy-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      padding: 5px 10px;
      background-color: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 3px;
      cursor: pointer;
    }
    .copy-success {
      color: green;
    }
  </style>
</head>
<body>
  <h1>Spade Digital - Meeting Room Booking System</h1>
  <p>This project is a meeting room booking system built with modern technologies.</p>

  <h2>Technologies Used:</h2>
  <div>
    <span class="tech-badge">Next.js 14</span>
    <span class="tech-badge">React</span>
    <span class="tech-badge">Prisma</span>
    <span class="tech-badge">TailwindCSS</span>
    <span class="tech-badge">TypeScript</span>
    <span class="tech-badge">MongoDB</span>
    <span class="tech-badge">Zod</span>
    <span class="tech-badge">Clerk (Authentication)</span>
  </div>

  <h2>How to Run the Project Locally:</h2>
  <ol>
    <li><strong>Clone the repository:</strong>
      <div class="code-container">
        <pre><code>git clone https://github.com/yourusername/spade-digital-14.git</code></pre>
        <button class="copy-btn" data-text="git clone https://github.com/yourusername/spade-digital-14.git">Copy</button>
      </div>
    </li>
    <li><strong>Install dependencies:</strong>
      <div class="code-container">
        <pre><code>npm install</code></pre>
        <button class="copy-btn" data-text="npm install">Copy</button>
      </div>
    </li>
    <li><strong>Set up environment variables:</strong>
      <ul>
        <li>Edit the <code>.env.example</code> file in the root directory.</li>
        <li>Set the necessary environment variables for MongoDB and Clerk authentication:</li>
      </ul>
      <div class="code-container">
        <pre><code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_IS_ADMIN=
DATABASE_URL=mongodb://localhost:27017/spade-digital</code></pre>
        <button class="copy-btn" data-text="NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_IS_ADMIN=
DATABASE_URL=mongodb://localhost:27017/spade-digital">Copy</button>
      </div>
    </li>
    <li><strong>Run the project:</strong>
      <div class="code-container">
        <pre><code>npm run dev</code></pre>
        <button class="copy-btn" data-text="npm run dev">Copy</button>
      </div>
    </li>
    <li>Visit <strong>http://localhost:3000</strong> to view the app in your browser.</li>
  </ol>

  <h2>Additional Setup for Prisma:</h2>
  <ol>
    <li><strong>Run Prisma migrations:</strong>
      <div class="code-container">
        <pre><code>npx prisma generate</code></pre>
        <button class="copy-btn" data-text="npx prisma generate">Copy</button>
      </div>
      <div class="code-container">
        <pre><code>npx prisma db push</code></pre>
        <button class="copy-btn" data-text="npx prisma db push">Copy</button>
      </div>
    </li>
    <li><strong>Seed the database (optional):</strong>
      <div class="code-container">
        <pre><code>npx prisma db seed</code></pre>
        <button class="copy-btn" data-text="npx prisma db seed">Copy</button>
      </div>
    </li>
  </ol>

  <script>
    // This script will actually work when hosted as a proper HTML page
    document.addEventListener('DOMContentLoaded', function() {
      const copyButtons = document.querySelectorAll('.copy-btn');
      
      copyButtons.forEach(button => {
        button.addEventListener('click', function() {
          const textToCopy = this.getAttribute('data-text');
          
          navigator.clipboard.writeText(textToCopy)
            .then(() => {
              const originalText = this.textContent;
              this.textContent = "Copied!";
              this.classList.add('copy-success');
              
              setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('copy-success');
              }, 2000);
            })
            .catch(err => {
              console.error('Failed to copy: ', err);
            });
        });
      });
    });
  </script>
</body>
</html>
