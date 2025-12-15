# jwt-login
JWT Login App

A simple Node.js + Express application demonstrating JWT (JSON Web Token) based authentication.
This project is intentionally kept simple and slightly insecure so it can be used for learning, testing, and security practice (Burp Suite / JWT attacks).

🚀 Features
Login page with basic HTML + CSS
Username & password authentication
JWT generation on successful login
Protected dashboard route
Token verification middleware
Beginner‑friendly code structure

🛠️ Tech Stack
Node.js
Express.js
jsonwebtoken (JWT)
body-parser

📂 Project Structure
jwt-login/
│── app.js          # Main application file
│── package.json    # Project dependencies
│── README.md       # Project documentation
▶️ How to Run the Project
1️⃣ Clone the repository
git clone https://github.com/ark-nishtha/jwt-login.git
cd jwt-login
2️⃣ Install dependencies
npm install
3️⃣ Start the server
node login.js
4️⃣ Open in browser
http://localhost:3000/login
🔐 Demo Login Credentials
Username: admin
Password: admin123

🔑 How JWT Works in This App
User submits login form
Server verifies credentials
JWT is generated using a secret key
Token is sent to the client
Token is required to access /dashboard
Server verifies token before granting access

⚠️ Security Notice
This project is NOT production‑ready.
Intentional weaknesses (for learning purposes):
JWT secret is hardcoded
Token is passed via URL query string
No HTTPS
No database

⚠️ Do NOT use this code as‑is in real applications.

🧪 Learning Use Cases
This app is useful for practicing:
JWT structure (Header / Payload / Signature)
Token tampering
Expired token testing
Weak secret brute‑forcing
Burp Suite JWT attacks

📌 Future Improvements

Use Authorization: Bearer <token> header
Store users in a database
Use environment variables for secrets
Add logout functionality
Add role‑based authorization

👩‍💻 Author
Nishtha
GitHub: https://github.com/ark-nishtha
