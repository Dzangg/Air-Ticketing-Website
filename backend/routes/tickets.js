const express = require("express");
const router = express.Router();

const { pool } = require("../db.js");

// Get all
router.get("/", async (req, res) => {
  try {
    const tickets = await pool.query(
      `SELECT ticket_id, f.m_pocz, f.m_doc FROM tickets
      JOIN flights f USING (lot_id)`
    );
    res.send(tickets.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one
router.get("/:ticket_id", async (req, res) => {
  try {
    const ticket = await pool.query(
      `SELECT * FROM tickets WHERE ticket_id=${req.params.ticket_id}`
    );
    res.send(ticket.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create one
router.post("/", async (req, res) => {
  const passengersData = req.body.passengersData;
  const flightId = req.body.flightId;
  try {
    console.log(passengersData);
    console.log("lot id: " + flightId);

    // uzytkownik
    const user = await pool.query(
      "SELECT uzytkownik_ID FROM uzytkownik WHERE email=$1",
      [passengersData[0].email]
    );
    const userId = user.rows[0].uzytkownik_id;
    console.log("user id: " + userId);

    const kod_biletu = "1234";
    const status = "aktywny";
    const cena = passengersData.reduce(
      (total, passenger) => total + passenger.koszt,
      0
    );
    console.log("kod biletu: " + kod_biletu);

    // bilet
    const ticket = await pool.query(
      "INSERT INTO bilet (uzytkownik_id,lot_id,kod,status,cena) VALUES($1,$2,$3,$4,$5) RETURNING bilet_id",
      [userId, flightId, kod_biletu, status, cena]
    );
    const ticketId = ticket.rows[0].bilet_id;

    // samolot
    const airplane = await pool.query(
      "SELECT o.samolot_id FROM Lot JOIN lot_szczegoly l USING(lot_id) JOIN samolot o ON l.samolot_id=o.samolot_id WHERE lot_ID=$1",
      [flightId]
    );
    const airplaneId = airplane.rows[0].samolot_id;
    console.log("samolotid: " + airplaneId);

    // pasazerowie
    passengersData.forEach(async (passenger, index) => {
      // siedzenie pasazera
      const s = await pool.query(
        "SELECT siedzenie_id FROM siedzenie WHERE samolot_id=$1 AND nazwa_siedzenia=$2",
        [airplaneId, passenger.miejsce]
      );
      const seat_id = s.rows[0].siedzenie_id;

      // bagaze pasazera
      const normalBaggageId = 1;
      const checkedBaggageId = passenger.bagaz_rejestrowany;

      const nazwisko = passenger.nazwisko;
      const imie = passenger.imie;
      const wiek = parseInt(passenger.wiek);

      const p1 = await pool.query(
        "INSERT INTO pasazer (bilet_id,siedzenie_id,imie,nazwisko,wiek) VALUES($1,$2,$3,$4,$5) RETURNING pasazer_id",
        [ticketId, seat_id, imie, nazwisko, wiek]
      );

      const passengerId = p1.rows[0].pasazer_id;
      if (checkedBaggageId != "") {
        const baggageNumber = normalBaggageId + (checkedBaggageId != 0);
        for (let i = 0; i < baggageNumber; i++) {
          const b_p = await pool.query(
            "INSERT INTO bagaz_pasazer (bagazbagaz_id,pasazerpasazer_id) VALUES ($1,$2)",
            [checkedBaggageId, passengerId]
          );
        }
      } else {
        const b_p = await pool.query(
          "INSERT INTO bagaz_pasazer (bagazbagaz_id,pasazerpasazer_id) VALUES ($1,$2)",
          [1, passengerId]
        );
      }

      // uslugi pasazera
      const services = passenger.uslugi_dodatkowe;
      if (services.length != 0) {
        services.forEach(async (serviceId) => {
          const p_u_d = await pool.query(
            "INSERT INTO pasazer_uslugi_dodatkowe (pasazer_id,id_uslugi) VALUES($1,$2)",
            [passengerId, serviceId]
          );
        });
      }
    });

    res.status(201).json({ message: "Ticket created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
