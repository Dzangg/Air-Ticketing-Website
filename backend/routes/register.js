const express = require("express");
const router = express.Router();
const { pool } = require("../db.js");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
router.post("/", async (req, res) => {
  const user = {
    imie: req.body.imie,
    nazwisko: req.body.nazwisko,
    wiek: req.body.wiek,
    email: req.body.email,
    password: req.body.password,
  };

  // check if user exists

  const foundUser = await pool.query(
    `SELECT EXISTS (SELECT 1 FROM uzytkownik WHERE email=$1)`,
    [user.email]
  );
  if (foundUser.rows[0].exists) {
    return res
      .status(403)
      .json({ message: "User with this email already exists." });
  }

  // generate salt && hashedPassword
  bcrypt.genSalt(parseInt(process.env.SALTROUNDS), async (err, salt) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    bcrypt.hash(user.password, salt, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      // save the user in DB
      try {
        // Generate a JWT token
        const token = jwt.sign(
          {
            userImie: user.imie,
            userNazwisko: user.nazwisko,
            userWiek: user.wiek,
            userEmail: user.email,
          },
          process.env.SECRETKEY,
          {
            expiresIn: "100h",
          }
        );

        const newPerson = await pool.query(
          "INSERT INTO osoba (imie,nazwisko,wiek) VALUES ($1,$2,$3) RETURNING osoba_id",
          [user.imie, user.nazwisko, user.wiek]
        );
        const newPersonId = newPerson.rows[0].osoba_id;

        const savedUser = await pool.query(
          "INSERT INTO uzytkownik (id_osoba,email,haslo,salt,jwt) VALUES ($1, $2, $3, $4,$5)",
          [newPersonId, user.email, hash, salt, token]
        );
        // Return the token as the response
        const response = {
          success: true,
          message: "Rejestracja przebiegła pomyślnie.",
        };

        res.json(response);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
  });
});

module.exports = router;
