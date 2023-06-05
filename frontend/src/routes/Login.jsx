import React from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import Ticket from "../components/FlightsPage/Ticket";
const Login = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Logowanie
        </Typography>
        <TextField label="email" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <Button variant="contained" type="submit" fullWidth>
          Submit
        </Button>
      </form>
      <Ticket flightId={1} />
    </Container>
  );
};

export default Login;
