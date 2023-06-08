import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Register() {
  localStorage.removeItem("token");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    imie: "",
    nazwisko: "",
    wiek: "",
    email: "",
    password: "",
  });
  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUser((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    return (
      user.imie == "" ||
      user.nazwisko == "" ||
      user.wiek == "" ||
      user.email == "" ||
      user.password == ""
    );
  };

  const registerUser = async () => {
    console.log(user);
    if (!validateInputs()) {
      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          throw new Error("Error fetching data: " + response.status);
        }
        const jsonData = await response.json();
        navigate("/login");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Rejestracja
        </Typography>

        <TextField
          name="imie"
          label="imie"
          onChange={handleUserChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="nazwisko"
          label="nazwisko"
          onChange={handleUserChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="wiek"
          label="wiek"
          onChange={handleUserChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="email"
          onChange={handleUserChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="password"
          label="password"
          onChange={handleUserChange}
          type="password"
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          type="submit"
          onClick={registerUser}
          fullWidth
        >
          Rejestruj
        </Button>
      </Box>
    </Container>
  );
}
