const express = require("express");
const router = express.Router();

const { pool } = require("../db");

// Get all
router.get("/", async (req, res) => {
  try {
    const loty = await pool.query("SELECT * FROM flights");
    res.send(loty.rows);
  } catch (err) {
    res.send(500).json({ message: err.message });
  }
});

// Get one
router.get("/:id", async (req, res) => {
  try {
    const flight = await pool.query(`SELECT * FROM flights WHERE lot_id=$1`, [
      req.params.id,
    ]);
    res.send(flight.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create one
router.post("/", async (req, res) => {
  const flight = {
    m_pocz: req.body.m_pocz,
    m_doc: req.body.m_doc,
    data_odlotu: req.body.data_odlotu,
    data_przylotu: req.body.data_przylotu,
    czas_odlotu: req.body.czas_odlotu,
  };
  try {
    const newFlight = await pool.query(
      `INSERT INTO flights (m_pocz, m_doc, data_odlotu, data_przylotu, czas_odlotu) VALUES ($1,$2,$3,$4,$5)`,
      [
        flight.m_pocz,
        flight.m_doc,
        flight.data_odlotu,
        flight.data_przylotu,
        flight.czas_odlotu,
      ]
    );
    res.status(201).json({ message: "Flight created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
