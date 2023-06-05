const express = require("express");
const router = express.Router();

const { pool } = require("../db");

// Get all
router.get("/", async (req, res) => {
  try {
    const lotniska = await pool.query("SELECT * FROM lotnisko");
    res.send(lotniska.rows);
  } catch (err) {
    res.send(500).json({ message: err.message });
  }
});
module.exports = router;
