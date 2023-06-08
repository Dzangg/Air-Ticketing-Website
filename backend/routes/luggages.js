const express = require("express");
const router = express.Router();

const { pool } = require("../db");

// get luggages
router.use("/", async (req, res) => {
  //   const luggageOptions = [
  //     {
  //       bagaz_id: 1,
  //       typ_bagazu: "Bagaż podręczny",
  //       waga: "10 kg",
  //       wymiary: "40x30x20 cm",
  //       cena: 0,
  //     },
  //     {
  //       bagaz_id: 2,
  //       typ_bagazu: "Bagaż rejestrowany",
  //       waga: "10 kg",
  //       wymiary: "149x119x171 cm",
  //       cena: 106,
  //     },
  //     {
  //       bagaz_id: 3,
  //       typ_bagazu: "Bagaż rejestrowany",
  //       waga: "20 kg",
  //       wymiary: "149x119x171 cm",
  //       cena: 135,
  //     },
  //     {
  //       bagaz_id: 4,
  //       typ_bagazu: "Bagaż rejestrowany",
  //       waga: "30 kg",
  //       wymiary: "149x119x171 cm",
  //       cena: 216,
  //     },
  //     {
  //       bagaz_id: 5,
  //       typ_bagazu: "Walizka na kółkach",
  //       waga: "10 kg",
  //       wymiary: "55x40x23 cm",
  //       cena: 60,
  //     },
  //   ];
  const luggageOptions = await pool.query("SELECT * FROM bagaz");
  try {
    return res.send(luggageOptions.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
