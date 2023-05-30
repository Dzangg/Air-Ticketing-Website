require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DBUSER,
  database: process.env.DBNAME,
  password: process.env.DBPASSWORD,
  port: 5432,
  host: "localhost",
});

module.exports = { pool };
