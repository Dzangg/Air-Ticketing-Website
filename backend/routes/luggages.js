const express = require("express");
const router = express.Router();

const { pool } = require("../db");

// get luggages
router.use("/", async (req, res) => {
  const luggageOptions = await pool.query("SELECT * FROM bagaz");
  try {
    return res.send(luggageOptions.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
