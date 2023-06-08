const express = require("express");
const router = express.Router();
const { pool } = require("../db.js");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRETKEY;
const jwt = require("jsonwebtoken");

// Login
router.post("/", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    // Find the user in the database
    const foundUser = await pool.query(
      `SELECT * FROM uzytkownik WHERE email=$1`,
      [user.email]
    );
    if (!foundUser.rows.length) {
      return res.status(404).json({ message: "User not found." });
    }

    const email = await foundUser.rows[0].email;
    const haslo = await foundUser.rows[0].haslo;
    const match = await bcrypt.compare(user.password, haslo);
    if (email != user.email && match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const foundPerson = await pool.query(
      "SELECT imie, nazwisko, wiek FROM osoba WHERE osoba_id=$1",
      [foundUser.rows[0].id_osoba]
    );
    // Generate a JWT token
    const token = jwt.sign(
      {
        userImie: foundPerson.rows[0].imie,
        userNazwisko: foundPerson.rows[0].nazwisko,
        userWiek: foundPerson.rows[0].wiek,
        userEmail: user.email,
      },
      process.env.SECRETKEY,
      {
        expiresIn: "100h",
      }
    );
    const updatedUser = await pool.query(
      "UPDATE uzytkownik SET jwt=$1 WHERE email=$2",
      [token, user.email]
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
