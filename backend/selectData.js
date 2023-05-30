const { pool } = require("./db");

async function selectData() {
  const res = await pool.query("SELECT * FROM loty", (err, result) => {
    err ? console.log(err.message) : console.log(result.rows);
  });
}
// pg_ctl -D "C:\Program Files\PostgreSQL\15\data" restart
selectData();
