const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRETKEY;
const { pool } = require("../db.js");

const authMiddleware = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);

    // find user
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      decoded.email,
    ]);
    // Check if the user exists and the token matches
    if (user.rows.length == 0 || user.rows[0].jwt !== token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
      //return res.redirect("/login");
    }
    console.error(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
