const express = require("express");
const router = express.Router();
const { pool } = require("../db.js");
const secretKey = process.env.SECRETKEY;
const jwt = require("jsonwebtoken");
const authMiddleware = require("./authMiddleware");

router.get("/", authMiddleware, (req, res) => {
  res.json({ message: "Logged in", user: req.user });
});

module.exports = router;
