const express = require("express");
const router = express.Router();

const { pool } = require("../db");

// Get all
router.get("/", async (req, res) => {
  try {
    const services = await pool.query("SELECT * FROM uslugi_dodatkowe");
    res.send(services.rows);
  } catch (err) {
    res.send(500).json({ message: err.message });
  }
});
module.exports = router;
