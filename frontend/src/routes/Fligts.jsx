import React from "react";
import {
  Card,
  Grid,
  Typography,
  Divider,
  Avatar,
  Button,
  Container,
  Box,
  Stack,
  Paper,
} from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const FlightsPage = () => {
  const navigate = useNavigate();

  const flightsData = [
    {
      id: 1,
      airline: "Airline A",
      flightNumber: "FL001",
      departure: "City X",
      departureTime: "09:00 AM",
      arrival: "City Y",
      arrivalTime: "12:00 PM",
      price: "$200",
    },
    {
      id: 1,
      airline: "Airline A",
      flightNumber: "FL001",
      departure: "City X",
      departureTime: "09:00 AM",
      arrival: "City Y",
      arrivalTime: "12:00 PM",
      price: "$200",
    },
    {
      id: 1,
      airline: "Airline A",
      flightNumber: "FL001",
      departure: "City X",
      departureTime: "09:00 AM",
      arrival: "City Y",
      arrivalTime: "12:00 PM",
      price: "$200",
    },
    {
      id: 1,
      airline: "Airline A",
      flightNumber: "FL001",
      departure: "City X",
      departureTime: "09:00 AM",
      arrival: "City Y",
      arrivalTime: "12:00 PM",
      price: "$200",
    },

    {
      id: 2,
      airline: "Airline B",
      flightNumber: "FL002",
      departure: "City X",
      departureTime: "11:00 AM",
      arrival: "City Z",
      arrivalTime: "02:00 PM",
      price: "$250",
    },
    {
      id: 2,
      airline: "Airline B",
      flightNumber: "FL002",
      departure: "City X",
      departureTime: "11:00 AM",
      arrival: "City Z",
      arrivalTime: "02:00 PM",
      price: "$250",
    },
    {
      id: 2,
      airline: "Airline B",
      flightNumber: "FL002",
      departure: "City X",
      departureTime: "11:00 AM",
      arrival: "City Z",
      arrivalTime: "02:00 PM",
      price: "$250",
    },
    {
      id: 2,
      airline: "Airline B",
      flightNumber: "FL002",
      departure: "City X",
      departureTime: "11:00 AM",
      arrival: "City Z",
      arrivalTime: "02:00 PM",
      price: "$250",
    },
    {
      id: 2,
      airline: "Airline B",
      flightNumber: "FL002",
      departure: "City X",
      departureTime: "11:00 AM",
      arrival: "City Z",
      arrivalTime: "02:00 PM",
      price: "$250",
    },
    {
      id: 2,
      airline: "Airline B",
      flightNumber: "FL002",
      departure: "City X",
      departureTime: "11:00 AM",
      arrival: "City Z",
      arrivalTime: "02:00 PM",
      price: "$250",
    },
    // Add more flights as needed
  ];

  return (
    <Container sx={{ overflow: "hidden" }}>
      <Stack direction="row" sx={{ mt: "30px" }} alignItems="center">
        <Item>
          <Typography variant="h3">Wyszukane loty</Typography>
        </Item>
        <Item>
          <Button
            variant="contained"
            startIcon={<UndoIcon />}
            onClick={() => navigate(-1)}
          >
            Cofnij
          </Button>
        </Item>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ height: "700px", overflowY: "scroll" }}>
        <Grid container spacing={4} maxWidth="lg">
          {flightsData.map((flight) => (
            <Grid item xs={12} sm={6} md={4} key={flight.id}>
              <Card sx={{ p: "30px" }}>
                <Typography variant="subtitle1">
                  Flight {flight.flightNumber}
                </Typography>
                <Divider />
                <Typography variant="subtitle1">
                  Arrival: {flight.arrival} -{">"} Departure: {flight.departure}
                </Typography>
                <Divider />
                <Typography variant="body1">
                  Departure Time: {flight.departureTime}
                </Typography>
                <Divider />
                <Typography variant="body1">
                  Cena: {flight.price}
                </Typography>{" "}
                {/* Display the flight price */}
                <Divider />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleBookFlight(flight.id)}
                >
                  Zarezerwuj
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default FlightsPage;
