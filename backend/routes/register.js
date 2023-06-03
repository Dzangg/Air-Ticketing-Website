const express = require("express");
const router = express.Router();
const { pool } = require("../db.js");
require("dotenv").config();
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRETKEY;
const jwt = require("jsonwebtoken");

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
        // Generate a JWT token
        const token = jwt.sign({ email: user.email }, secretKey, {
          expiresIn: "1h",
        });

        const savedUser = await pool.query(
          "INSERT INTO users (email, salt, password, jwt) VALUES ($1, $2, $3, $4)",
          [user.email, salt, hash, token]
        );
        // Return the token as the response
        res.json({ token });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
  });
});

module.exports = router;
