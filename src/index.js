// backend/src/index.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./db");


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/api/entries", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM entries ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching entries:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/entries", async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO entries (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating entry:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
