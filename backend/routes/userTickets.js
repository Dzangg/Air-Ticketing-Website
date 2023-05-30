const express = require("express");
const router = express.Router({ mergeParams: true });

const { pool } = require("../db.js");

// Get all users tickets
router.get("/", async (req, res) => {
  const user_id = req.params.id;

  try {
    const tickets = await pool.query(
      `SELECT ticket_id, f.m_pocz, f.m_doc FROM tickets
      JOIN flights f USING (lot_id)
      WHERE user_id=$1`,
      [user_id]
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
      `SELECT * FROM tickets WHERE ticket_id=$1`,
      [req.params.ticket_id]
    );
    res.send(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
