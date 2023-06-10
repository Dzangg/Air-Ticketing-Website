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

// Get all tickets
router.get("/:userEmail", async (req, res) => {
  try {
    // uzytkownik
    const user = await pool.query(
      "SELECT uzytkownik_ID FROM uzytkownik WHERE email=$1",
      [req.params.userEmail]
    );
    const userId = user.rows[0].uzytkownik_id;

    // bilety
    const tickets = await pool.query(
      `SELECT * FROM bilet WHERE uzytkownik_id=$1`,
      [userId]
    );

    const ticketsData = [];
    for (const ticket of tickets.rows) {
      const ticketId = ticket.bilet_id;

      const ticketPrice = ticket.cena;
      const ticketStatus = ticket.status;

      // pasazerowie
      const passengers = await pool.query(
        `SELECT * FROM pasazer WHERE bilet_id=$1`,
        [ticketId]
      );

      const passengerData = [];
      for (const passenger of passengers.rows) {
        const passengerId = passenger.pasazer_id;

        const luggage = await pool.query(
          "SELECT b.bagaz_id, b.typ_bagazu, b.waga, b.wymiary, b.cena FROM pasazer p JOIN bagaz_pasazer bp ON p.pasazer_id = bp.pasazerpasazer_id JOIN bagaz b ON bp.bagazbagaz_id = b.bagaz_id WHERE p.pasazer_id = $1",
          [passengerId]
        );

        const service = await pool.query(
          "SELECT ud.id_uslugi, ud.nazwa, ud.cena FROM pasazer p JOIN pasazer_uslugi_dodatkowe u ON p.pasazer_id=u.pasazer_id JOIN uslugi_dodatkowe ud ON u.id_uslugi=ud.id_uslugi WHERE p.pasazer_id=$1",
          [passengerId]
        );

        const seat = await pool.query(
          "SELECT s.nazwa_siedzenia FROM pasazer p JOIN siedzenie  s USING(siedzenie_id) WHERE p.pasazer_id=$1",
          [passengerId]
        );

        const data = [
          {
            passenger: passenger,
            seat: seat.rows[0],
            luggage: luggage.rows,
            service: service.rows,
          },
        ];

        passengerData.push(...data);
      }

      const lot = await pool.query(
        "SELECT TO_CHAR(data_wylotu, 'YYYY-MM-DD') AS data_wylotu, TO_CHAR(data_przylotu, 'YYYY-MM-DD') AS data_przylotu FROM lot WHERE lot_ID=$1",
        [ticket.lot_id]
      );

      const airport = await pool.query(
        "SELECT lw.nazwa AS l1, lp.nazwa AS l2 FROM Lot l JOIN lotnisko lw ON l.lotnisko_wylotu_id=lw.lotnisko_id JOIN lotnisko lp ON l.lotnisko_przylotu_id=lp.lotnisko_id WHERE lot_ID=$1",
        [ticket.lot_id]
      );

      const flightData = {
        data_wylotu: lot.rows[0].data_wylotu,
        data_przylotu: lot.rows[0].data_przylotu,
        l1: airport.rows[0].l1,
        l2: airport.rows[0].l2,
      };
      ticketsData.push({
        passengerData: passengerData,
        ticketPrice: ticketPrice,
        ticketStatus: ticketStatus,
        flightData: flightData,
      });
    }
    res.send({
      ticketsData: ticketsData,
    });
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
        const b_p = await pool.query(
          "INSERT INTO bagaz_pasazer (bagazbagaz_id,pasazerpasazer_id) VALUES ($1,$2)",
          [checkedBaggageId, passengerId]
        );
      }
      const b_p = await pool.query(
        "INSERT INTO bagaz_pasazer (bagazbagaz_id,pasazerpasazer_id) VALUES ($1,$2)",
        [1, passengerId]
      );

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

    const updateAvailableSeats = await pool.query(
      "UPDATE lot_szczegoly SET liczba_wolnych_miejsc=liczba_wolnych_miejsc-$1 WHERE lot_id=$2",
      [passengersData.length, flightId]
    );

    res.status(201).json({ message: "Ticket created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
