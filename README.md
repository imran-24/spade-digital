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
    <div class="code-block-container" style="position: relative;">
      <pre style="background-color: #f4f4f4; padding: 10px; margin-right: 30px;">git clone https://github.com/yourusername/spade-digital-14.git</pre>
      <button class="copy-button" data-text="git clone https://github.com/yourusername/spade-digital-14.git" style="position: absolute; top: 5px; right: 5px; background-color: #f0f0f0; border: 1px solid #ddd; border-radius: 3px; padding: 3px 6px; cursor: pointer;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </button>
    </div>
  </li>
  <li><strong>Install dependencies:</strong>
    <div class="code-block-container" style="position: relative;">
      <pre style="background-color: #f4f4f4; padding: 10px; margin-right: 30px;">npm install</pre>
      <button class="copy-button" data-text="npm install" style="position: absolute; top: 5px; right: 5px; background-color: #f0f0f0; border: 1px solid #ddd; border-radius: 3px; padding: 3px 6px; cursor: pointer;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </button>
    </div>
  </li>
  <li><strong>Set up environment variables:</strong>
    <ul>
      <li>Edit the <code>.env.example</code> file in the root directory.</li>
      <li>Set the necessary environment variables for MongoDB and Clerk authentication. Example:</li>
      <div class="code-block-container" style="position: relative;">
        <pre style="background-color: #f4f4f4; padding: 10px; margin-right: 30px;">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_IS_ADMIN=
DATABASE_URL=mongodb://localhost:27017/spade-digital</pre>
        <button class="copy-button" data-text="NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_IS_ADMIN=
DATABASE_URL=mongodb://localhost:27017/spade-digital" style="position: absolute; top: 5px; right: 5px; background-color: #f0f0f0; border: 1px solid #ddd; border-radius: 3px; padding: 3px 6px; cursor: pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        </button>
      </div>
    </ul>
  </li>
  <li><strong>Run the project:</strong>
    <div class="code-block-container" style="position: relative;">
      <pre style="background-color: #f4f4f4; padding: 10px; margin-right: 30px;">npm run dev</pre>
      <button class="copy-button" data-text="npm run dev" style="position: absolute; top: 5px; right: 5px; background-color: #f0f0f0; border: 1px solid #ddd; border-radius: 3px; padding: 3px 6px; cursor: pointer;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </button>
    </div>
  </li>
  <li>Visit <strong>http://localhost:3000</strong> to view the app in your browser.</li>
</ol>

<h2 style="font-family: Arial, sans-serif; color: #555;">Additional Setup for Prisma:</h2>
<ol style="font-family: Arial, sans-serif; line-height: 1.6; color: #666;">
  <li><strong>Run Prisma migrations:</strong>
    <div class="code-block-container" style="position: relative;">
      <pre style="background-color: #f4f4f4; padding: 10px; margin-right: 30px;">npx prisma generate</pre>
      <button class="copy-button" data-text="npx prisma generate" style="position: absolute; top: 5px; right: 5px; background-color: #f0f0f0; border: 1px solid #ddd; border-radius: 3px; padding: 3px 6px; cursor: pointer;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </button>
    </div>
    <div class="code-block-container" style="position: relative; margin-top: 10px;">
      <pre style="background-color: #f4f4f4; padding: 10px; margin-right: 30px;">npx prisma db push</pre>
      <button class="copy-button" data-text="npx prisma db push" style="position: absolute; top: 5px; right: 5px; background-color: #f0f0f0; border: 1px solid #ddd; border-radius: 3px; padding: 3px 6px; cursor: pointer;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </button>
    </div>
  </li>
  <li><strong>Seed the database (optional):</strong>
    <div class="code-block-container" style="position: relative;">
      <pre style="background-color: #f4f4f4; padding: 10px; margin-right: 30px;">npx prisma db seed</pre>
      <button class="copy-button" data-text="npx prisma db seed" style="position: absolute; top: 5px; right: 5px; background-color: #f0f0f0; border: 1px solid #ddd; border-radius: 3px; padding: 3px 6px; cursor: pointer;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </button>
    </div>
  </li>
</ol>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const copyButtons = document.querySelectorAll('.copy-button');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const textToCopy = this.getAttribute('data-text');
      
      // Use the modern Clipboard API
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Visual feedback
        const originalHTML = this.innerHTML;
        this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        
        setTimeout(() => {
          this.innerHTML = originalHTML;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  });
});
</script>
