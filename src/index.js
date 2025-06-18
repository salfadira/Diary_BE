// backend/src/index.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./db");


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post("/api/adddiary", async (req, res) => {
  const sql = "INSERT INTO diary (title, description) VALUES ($1, $2)";
  const values = [req.body.title, req.body.description];

  try {
    await db.query(sql, values);
    return res.status(201).json({ success: "New diary added successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something unexpected has occurred: " + err.message });
  }
});

app.get("/api/diary", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM diary");
    res.status(200).json(result.rows); // ✅ Send only the rows (array of diary entries)
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

app.get("/api/getdiary/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM diary WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error: " + err });
    return res.status(200).json(result);
  });
});

app.put("/api/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE diary SET title = ?, description = ?, modify_at = ? WHERE id = ?";
  const values = [req.body.title, req.body.description, new Date(), id];

  db.query(sql, values, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Something unexpected has occurred: " + err });
    return res.status(200).json({ success: "Diary updated successfully" });
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM diary WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Something unexpected has occurred: " + err });
    return res.status(200).json({ success: "Diary successfully deleted" });
  });
});
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
