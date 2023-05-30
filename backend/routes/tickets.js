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
  const ticket = {
    lot_id: req.body.lot_id,
    user_id: req.body.user_id,
  };
  try {
    const newTicket = await pool.query(
      `INSERT INTO tickets (lot_id, user_id) VALUES ($1, $2)`,
      [ticket.lot_id, ticket.user_id]
    );
    res.status(201).json({ message: "Ticket created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
