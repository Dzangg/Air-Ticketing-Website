const express = require("express");
const router = express.Router();
const { pool } = require("../db.js");
require("dotenv").config();
const bcrypt = require("bcrypt");

// register
router.post("/", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  // check if user exists

  const foundUser = await pool.query(
    `SELECT EXISTS (SELECT 1 FROM users WHERE email=$1)`,
    [user.email]
  );
  if (foundUser.rows[0].exists) {
    return res
      .status(403)
      .json({ message: "User with this email already exists." });
  }

  // generate salt && hashedPassword
  bcrypt.genSalt(parseInt(process.env.SALTROUNDS), async (err, salt) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    bcrypt.hash(user.password, salt, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      // save the user in DB
      try {
        const savedUser = await pool.query(
          "INSERT INTO users (email, salt, password) VALUES ($1, $2, $3)",
          [user.email, salt, hash]
        );

        res.status(201).json({ message: "User registered successfully." });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
  });
});

module.exports = router;
