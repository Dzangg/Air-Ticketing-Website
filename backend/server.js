const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// Apply body-parser middleware
app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors());
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

const airportsRouter = require("./routes/airports.js");
app.use("/airports", airportsRouter);

const ticketsRouter = require("./routes/tickets.js");
app.use("/tickets", ticketsRouter);

const authRouter = require("./routes/auth.js");
app.use("/auth", authRouter);

const luggagesRouter = require("./routes/luggages.js");
app.use("/luggages", luggagesRouter);

const servicesRouter = require("./routes/services.js");
app.use("/services", servicesRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
