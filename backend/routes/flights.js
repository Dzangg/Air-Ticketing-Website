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

// Get one id
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

// Send searched

router.post("/", async (req, res) => {
  try {
    const searchData = {
      m_pocz: req.body.source,
      m_doc: req.body.destination,
      data_odlotu: req.body.sourceDate,
      data_przylotu: req.body.destinationDate,
      liczba_pasazerow: req.body.numberOfPassengers,
    };
    console.log(searchData);
    console.log(await pool.query("SELECT * FROM flights"));

    const flights = await pool.query(
      `SELECT f.data_wylotu, f.data_przylotu
      FROM flights f
      JOIN lot_szczegoly s USING (lot_id)
      WHERE m_pocz = $1
        AND m_doc = $2
        AND data_odlotu = $3
        AND data_przylotu = $4
        AND s.liczba_wolnych_miejsc >= $5`,
      [
        searchData.m_pocz,
        searchData.m_doc,
        searchData.data_odlotu,
        searchData.data_przylotu,
        searchData.liczba_pasazerow,
      ]
    );
    console.log(flights.rows);
    if (flights.rows.length == 0) {
      return res.status(404).json({ message: "No flights found." });
    }

    return res.status(200).json({
      data: flights.rows,
      message: "Search data received successfully.",
    });
  } catch (error) {
    console.error("Error processing search data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Create one
router.post("/:id", async (req, res) => {
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
