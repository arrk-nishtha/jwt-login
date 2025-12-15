const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Demo secret (intentionally weak for learning JWT attacks)
const JWT_SECRET = "mysecretkey";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Demo user
const USER = {
  username: "admin",
  password: "admin123"
};

// ---------------- LOGIN PAGE ----------------
app.get("/login", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Login</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #667eea, #764ba2);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0;
        }

        .login-box {
          background: white;
          padding: 30px;
          width: 320px;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          text-align: center;
        }

        h2 {
          margin-bottom: 20px;
          color: #333;
        }

        input {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 14px;
        }

        button {
          width: 100%;
          padding: 10px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        button:hover {
          background: #5a67d8;
        }
      </style>
    </head>
    <body>
      <div class="login-box">
        <h2>Login</h2>
        <form method="POST" action="/login">
          <input name="username" placeholder="Username" required />
          <input name="password" type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// ---------------- LOGIN HANDLER ----------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    // Generate JWT
    const token = jwt.sign(
      { username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.send(`
      <h3>Login Successful</h3>
      <p><b>JWT Token:</b></p>
      <textarea rows="5" cols="70">${token}</textarea>
      <br><br>
      <a href="/dashboard?token=${token}">Go to Dashboard</a>
    `);
  } else {
    res.send("<h3>Invalid credentials</h3>");
  }
});

// ---------------- JWT VERIFICATION ----------------
function verifyToken(req, res, next) {
  const token = req.query.token;

  if (!token) {
    return res.send("Token missing");
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.send("Invalid or expired token");
    }
    req.user = decoded;
    next();
  });
}

// ---------------- DASHBOARD ----------------
app.get("/dashboard", verifyToken, (req, res) => {
  res.send(`
    <h2>Dashboard</h2>
    <p>Welcome <b>${req.user.username}</b></p>
    <p>This page is protected by JWT</p>
  `);
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/login`);
});
