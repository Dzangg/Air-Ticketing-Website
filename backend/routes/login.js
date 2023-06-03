const express = require("express");
const router = express.Router();
const { pool } = require("../db.js");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRETKEY;
const jwt = require("jsonwebtoken");

// Login
router.post("/", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    // Find the user in the database
    const foundUser = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      user.email,
    ]);
    if (!foundUser.rows.length) {
      return res.status(404).json({ message: "User not found." });
    }
    const { email, password } = await foundUser.rows[0];
    const match = await bcrypt.compare(user.password, password);
    if (email != user.email && match) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Generate a JWT token
    const token = jwt.sign({ email: user.email }, secretKey, {
      expiresIn: "1h",
    });
    const updatedUser = await pool.query(
      "UPDATE users SET jwt=$1 WHERE email=$2",
      [token, user.email]
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
