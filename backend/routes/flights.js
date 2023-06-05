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
      data_wylotu: req.body.sourceDate,
      data_przylotu: req.body.destinationDate,
      liczba_pasazerow: req.body.numberOfPassengers,
    };
    console.log("Odebrane dane: ");
    console.log(searchData);

    const flights = await pool.query(
      `SELECT kod_lotu, tp.nazwa AS m_pocz, td.nazwa AS m_doc, status, 
      TO_CHAR(data_wylotu, 'YYYY-MM-DD') AS data_wylotu,
      TO_CHAR(data_przylotu, 'YYYY-MM-DD') AS data_przylotu, 
      TO_CHAR(data_wylotu, 'HH24:MI') AS czas_wylotu,
      TO_CHAR(data_przylotu, 'HH24:MI') AS czas_przylotu,
      s.liczba_wolnych_miejsc, 
      c.klasa,
      c.cena
      FROM lot
      JOIN lotnisko tp ON lotnisko_wylotu_id=tp.lotnisko_id
      JOIN lotnisko td ON lotnisko_przylotu_id=td.lotnisko_id
      JOIN lot_szczegoly s USING (lot_id)
      JOIN cennik c USING(cennik_id)
      WHERE tp.nazwa = $1
        AND td.nazwa = $2
        AND TO_CHAR(data_wylotu, 'YYYY-MM-DD') = $3
        AND TO_CHAR(data_przylotu, 'YYYY-MM-DD') = $4
        AND s.liczba_wolnych_miejsc >= $5`,
      [
        searchData.m_pocz,
        searchData.m_doc,
        searchData.data_wylotu,
        searchData.data_przylotu,
        searchData.liczba_pasazerow,
      ]
    );

    console.log("Znalezione loty:");
    console.log(flights.rows);

    if (flights.rows.length == 0) {
      return res.status(404).json({ message: "No flights found." });
    }

    return res.status(200).json({
      data: flights.rows,
      message: "Search data received successfully.",
    });
  } catch (error) {
    console.error("Error processing search data:", error.message);
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
