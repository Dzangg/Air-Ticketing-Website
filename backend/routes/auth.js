const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { pool } = require("../db");

// Middleware function to verify JWT on each request
async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;
    console.log("veryfikacja: ", decoded);
    const foundUser = await pool.query(
      `SELECT EXISTS (SELECT 1 FROM uzytkownik WHERE email=$1)`,
      [decoded.userEmail]
    );

    if (!foundUser.rows[0].exists) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

router.get("/", verifyToken, async (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
