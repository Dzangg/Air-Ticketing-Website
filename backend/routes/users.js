const express = require("express");
const router = express.Router();

const { pool } = require("../db");

// Getting all
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.send(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one
router.get("/:id", async (req, res) => {
  try {
    const user = await pool.query(
      `SELECT * FROM users WHERE user_id=${req.params.id}`
    );
    res.send(user.rows);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Create one
router.post("/", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const newUser = await pool.query(
      `INSERT INTO users (login, password) VALUES ($1, $2)`,
      [user.email, user.password]
    );
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
