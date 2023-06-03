const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// app.use(express.json());
app.use(bodyParser.json());
const usersRouter = require("./routes/users.js");
app.use("/users", usersRouter);

const registerRouter = require("./routes/register.js");
app.use("/register", registerRouter);

const loginRoter = require("./routes/login.js");
app.use("/login", loginRoter);

const userTicketsRouter = require("./routes/userTickets.js");
app.use("/users/:id/tickets", userTicketsRouter);

const flightsRouter = require("./routes/flights.js");
app.use("/flights", flightsRouter);

const ticketsRouter = require("./routes/tickets.js");
app.use("/tickets", ticketsRouter);

const authRouter = require("./routes/auth.js");
app.use("/auth", authRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
