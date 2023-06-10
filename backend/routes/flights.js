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

// get flight seats
router.get("/:id/seats", async (req, res) => {
  const flightId = req.params.id;
  try {
    // const seats = await pool.query(
    //   `SELECT s.nazwa_siedzenia FROM lot JOIN lot_szczegoly l using(lot_id) JOIN samolot o ON l.samolot_id=o.samolot_id JOIN siedzenie s ON o.samolot_ID=s.samolot_ID WHERE lot_id=$1`,
    //   [flightId]
    // );
    const seats = await pool.query(
      `SELECT s.nazwa_siedzenia FROM lot JOIN lot_szczegoly l using(lot_id) JOIN samolot o ON l.samolot_id=o.samolot_id JOIN siedzenie s ON o.samolot_ID=s.samolot_ID WHERE lot_id=$1 AND s.nazwa_siedzenia NOT IN (SELECT nazwa_siedzenia FROM siedzenie JOIN pasazer p USING(siedzenie_id) JOIN bilet b ON p.bilet_id=b.bilet_id WHERE b.lot_id=$1) `,
      [flightId]
    );
    //  JOIN bilet b ON p.bilet_id=b.bilet_id WHERE b.lot_id=$3

    const seatsValues = seats.rows.map((seat) => seat.nazwa_siedzenia);

    res.send(seatsValues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Send searched

router.post("/search", async (req, res) => {
  try {
    const searchData = {
      m_pocz: req.body.source,
      m_doc: req.body.destination,
      data_wylotu: req.body.sourceDate,
      data_przylotu: req.body.destinationDate,
      liczba_pasazerow: req.body.numberOfPassengers,
    };

    const flights = await pool.query(
      `SELECT lot_id, kod_lotu, tp.nazwa AS m_pocz, td.nazwa AS m_doc, status, 
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

    if (flights.rows.length == 0) {
      return res.status(404).json({ message: "No flights found." });
    }

    return res.status(200).json({
      flightsData: flights.rows,
      passengers: req.body.passengers,
      message: "Search data received successfully.",
    });
  } catch (error) {
    console.error("Error processing search data:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Create one
router.post("/add", async (req, res) => {
  const flight = {
    cennik_id: parseInt(req.body.cennik_id),
    zaloga_id: parseInt(req.body.zaloga_id),
    m_pocz: req.body.od,
    m_doc: req.body.do,
    status: req.body.status,
    data_wylotu: req.body.data_wylotu,
    data_przylotu: req.body.data_przylotu,
    czas_wylotu: req.body.czas_wylotu,
    czas_przylotu: req.body.czas_przylotu,
    kod_lotu: req.body.kod_lotu,
  };

  try {
    const lotniska = {
      lotnisko_wylotu_id: "",
      lotnisko_przylotu_id: "",
    };

    const l1 = await pool.query("SELECT * FROM lotnisko WHERE nazwa=$1", [
      flight.m_pocz,
    ]);
    const l2 = await pool.query("SELECT * FROM lotnisko WHERE nazwa=$1", [
      flight.m_doc,
    ]);

    if (l1.rows.length == 0) {
      const lw = await pool.query(
        "INSERT INTO lotnisko (kod_iata,nazwa) VALUES ($1,$2) RETURNING lotnisko_id",
        ["AAA", flight.m_pocz]
      );

      lotniska.lotnisko_wylotu_id = lw.rows[0].lotnisko_id;
    } else {
      lotniska.lotnisko_wylotu_id = l1.rows[0].lotnisko_id;
    }

    if (l2.rows.length == 0) {
      const lp = await pool.query(
        "INSERT INTO lotnisko (kod_iata,nazwa) VALUES ($1,$2) RETURNING lotnisko_id",
        ["AAA", flight.m_doc]
      );

      lotniska.lotnisko_przylotu_id = lp.rows[0].lotnisko_id;
    } else {
      lotniska.lotnisko_przylotu_id = l2.rows[0].lotnisko_id;
    }

    const data_wylotu = flight.data_wylotu + " " + flight.czas_wylotu + ":00";
    const data_przylotu =
      flight.data_przylotu + " " + flight.czas_przylotu + ":00";

    // console.log(flight.cennik_id);
    // console.log(flight.zaloga_id);
    // console.log(JSON.stringify(lotniska));
    // console.log(flight.status);
    // console.log("dw " + data_wylotu);
    // console.log("dp " + data_przylotu);
    // console.log(flight.kod_lotu);

    const newFlight = await pool.query(
      `INSERT INTO lot (cennik_id, zaloga_id, lotnisko_wylotu_id, lotnisko_przylotu_id, status, data_wylotu, data_przylotu, kod_lotu)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING lot_id`,
      [
        flight.cennik_id,
        flight.zaloga_id,
        lotniska.lotnisko_wylotu_id,
        lotniska.lotnisko_przylotu_id,
        flight.status,
        data_wylotu,
        data_przylotu,
        flight.kod_lotu,
      ]
    );

    const flightId = newFlight.rows[0].lot_id;

    const newAirplane = await pool.query(
      "INSERT INTO samolot (model, linia_lotnicza, liczba_miejsc) VALUES ($1, $2, $3) RETURNING samolot_id",
      ["boeing 747-800", "LOT", 400]
    );
    // const airplaneMaxSeats = newAirplane.rows[0].liczba_miejsc;
    const airplaneMaxSeats = 400;

    const flightSeats = [
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "B1",
      "B2",
      "B3",
      "B4",
      "B5",
      "C1",
      "C2",
      "C3",
      "C4",
      "C5",
    ];
    flightSeats.forEach(async (seat) => {
      const newSeat = await pool.query(
        "INSERT INTO siedzenie (samolot_id,nazwa_siedzenia) VALUES($1,$2)",
        [newAirplane.rows[0].samolot_id, seat]
      );
    });

    const flightDetails = await pool.query(
      "INSERT INTO lot_szczegoly (lot_id,samolot_id, opoznienie, kod_bramki, liczba_wolnych_miejsc) VALUES ($1, $2, $3, $4,$5)",
      [flightId, newAirplane.rows[0].samolot_id, 0, "A1", airplaneMaxSeats]
    );

    res.status(201).json({ message: "Flight created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
