const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => { 
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL database.");
});

// API endpoint to fetch users
app.get("/users", (req, res) => { //Routes for Get all users 
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch users." });
    } else {
      res.json(results);
    }
  });
});


// API endpoint to add a user
app.post("/users", (req, res) => { //Routes for Add new user
  const { name, email, username } = req.body;
  if (!name || !email || !username) {
    return res.status(400).json({ error: "Name, email, and username are required." });
  }

  // validation for duplicate email or username
  const query = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(query, [username, email], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to check for duplicates." });
    } else if (results.length > 0) {
      return res.status(400).json({ error: "Username or email already exists." });
    } else {
      const insertQuery = "INSERT INTO users (name, email, username) VALUES (?, ?, ?)";
      db.query(insertQuery, [name, email, username], (err, results) => {
        if (err) {
          res.status(500).json({ error: "Failed to add user." });
        } else {
          res.json({ 
            message: "User added successfully.", 
            id: results.insertId, 
            name: name, 
            username: username
          });
        }
      });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
