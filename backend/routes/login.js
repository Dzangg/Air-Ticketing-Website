const express = require("express");
const router = express.Router();
const { pool } = require("../db.js");
const bcrypt = require("bcrypt");

// Login
router.post("/", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const foundUser = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      user.email,
    ]);
    if (!foundUser.rows.length) {
      return res.status(404).json({ message: "User not found." });
    }
    const { email, password } = await foundUser.rows[0];
    const match = await bcrypt.compare(user.password, password);
    if (email == user.email && match) {
      return es.status(200).json({ message: "Successfully logged in." });
    }
    return res.status(401).json({ message: "Invalid password" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
