import React from "react";
import {
  Typography,
  Divider,
  Button,
  Paper,
  Container,
  Box,
  Grid,
} from "@mui/material";

const flightsData = [
  {
    source: "New York",
    destination: "Los Angeles",
    date_start: "2023-06-05",
    date_arrival: "2023-06-05",
    hour: "10:00 AM",
  },
  {
    source: "London",
    destination: "Paris",
    date_start: "2023-06-06",
    date_arrival: "2023-06-06",
    hour: "12:30 PM",
  },
  {
    source: "Tokyo",
    destination: "Sydney",
    date_start: "2023-06-07",
    date_arrival: "2023-06-08",
    hour: "09:45 PM",
  },
  {
    source: "New York",
    destination: "Los Angeles",
    date_start: "2023-06-05",
    date_arrival: "2023-06-05",
    hour: "10:00 AM",
  },
  {
    source: "London",
    destination: "Paris",
    date_start: "2023-06-06",
    date_arrival: "2023-06-06",
    hour: "12:30 PM",
  },
  {
    source: "Tokyo",
    destination: "Sydney",
    date_start: "2023-06-07",
    date_arrival: "2023-06-08",
    hour: "09:45 PM",
  },
  {
    source: "New York",
    destination: "Los Angeles",
    date_start: "2023-06-05",
    date_arrival: "2023-06-05",
    hour: "10:00 AM",
  },
  {
    source: "London",
    destination: "Paris",
    date_start: "2023-06-06",
    date_arrival: "2023-06-06",
    hour: "12:30 PM",
  },
  {
    source: "Tokyo",
    destination: "Sydney",
    date_start: "2023-06-07",
    date_arrival: "2023-06-08",
    hour: "09:45 PM",
  },
  {
    source: "New York",
    destination: "Los Angeles",
    date_start: "2023-06-05",
    date_arrival: "2023-06-05",
    hour: "10:00 AM",
  },
  {
    source: "London",
    destination: "Paris",
    date_start: "2023-06-06",
    date_arrival: "2023-06-06",
    hour: "12:30 PM",
  },
  {
    source: "Tokyo",
    destination: "Sydney",
    date_start: "2023-06-07",
    date_arrival: "2023-06-08",
    hour: "09:45 PM",
  },
];

const FlightPage = () => {
  return (
    <Container>
      <Typography variant="h1">Loty</Typography>
      <Divider sx={{ my: 2 }} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="60vh"
        maxWidth="sm"
        sx={{
          maxHeight: "750px", // Adjust the maximum height as per your requirement
          maxWidth: "100%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Grid container spacing={2} direction="column">
          {flightsData.map((flight, index) => (
            <Grid item container justifyContent="space-between">
              <Paper
                key={index}
                elevation={3}
                sx={{ p: 2, mb: 2, width: "100%" }}
              >
                <Typography variant="h6">
                  {flight.source} → {flight.destination}
                </Typography>
                <Typography variant="body1">
                  Departure: {flight.date_start}, {flight.hour}
                </Typography>
                <Typography variant="body1">
                  Arrival: {flight.date_arrival}, {flight.hour}
                </Typography>
                <Typography variant="body1">Price: 489zl</Typography>
                <Button variant="contained" color="primary">
                  Select
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default FlightPage;
