import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  CardHeader,
  CardContent,
} from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import { red } from "@mui/material/colors";

import { styled } from "@mui/material/styles";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function UserTickets(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [tickets, setTickets] = useState();

  useEffect(() => {
    setUser(props.user);
    if (user) {
      loadTickets();
    }
  }, [user]);

  const loadTickets = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/tickets/${user.userEmail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Example header
          },
        }
      );
      const jsonData = await response.json();
      if (jsonData.ticketsData.length == 0) {
        setTickets(null);
      } else {
        setTickets(jsonData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (user && tickets) {
    console.log(tickets);
    console.log(tickets.ticketsData[0].passengerData[0].passenger.imie);
    return (
      <>
        <Container>
          <Stack direction="row" sx={{ mt: "30px" }} alignItems="center">
            <Item>
              <Typography variant="h3">Bilety</Typography>
            </Item>
            <Item>
              <Button
                variant="contained"
                startIcon={<UndoIcon />}
                onClick={() => {
                  navigate("/");
                }}
              >
                Strona główna
              </Button>
            </Item>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ height: "700px" }} className="hideOnScroll">
            <Grid container spacing={4} maxWidth="lg">
              {tickets.ticketsData.map((ticket, key) => (
                <Grid item xs={12} sm={6} md={6} key={key}>
                  <Grid item>
                    <Card sx={{ border: "1px solid black" }}>
                      <CardHeader title={"Bilet nr. " + (key + 1)} />

                      <Divider />
                      <CardContent>
                        <Typography variant="h5">
                          {tickets.ticketsData[key].flightData.l1 +
                            " -> " +
                            tickets.ticketsData[key].flightData.l2 +
                            "  [" +
                            tickets.ticketsData[key].flightData.data_wylotu +
                            ", " +
                            tickets.ticketsData[key].flightData.data_przylotu +
                            "]"}
                        </Typography>
                        {ticket.passengerData.map((person, index) => {
                          return (
                            <>
                              <Typography variant="h4">
                                {"Pasażer " + (index + 1)}
                              </Typography>
                              <Grid container direction="row">
                                <Grid item>
                                  <Typography variant="body1">
                                    Imie:{" "}
                                    <span
                                      style={{
                                        fontWeight: "bold",
                                        marginRight: "5px",
                                      }}
                                    >
                                      {person.passenger.imie}
                                    </span>{" "}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography variant="body1">
                                    {" "}
                                    Nazwisko:{" "}
                                    <span
                                      style={{
                                        fontWeight: "bold",
                                        marginRight: "5px",
                                      }}
                                    >
                                      {person.passenger.nazwisko}
                                    </span>
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography variant="body1">
                                    {" "}
                                    Wiek:{" "}
                                    <span
                                      style={{
                                        fontWeight: "bold",
                                        marginRight: "5px",
                                      }}
                                    >
                                      {person.passenger.wiek}
                                    </span>
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography variant="body1">
                                    {" "}
                                    Siedzenie:{" "}
                                    <span
                                      style={{
                                        fontWeight: "bold",
                                        marginRight: "5px",
                                      }}
                                    >
                                      {person.seat.nazwa_siedzenia}
                                    </span>
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Typography variant="body1">
                                  Bagaze:{" "}
                                  <span style={{ fontWeight: "bold" }}>
                                    {person.luggage.map((el) => {
                                      return (
                                        <>
                                          {el.typ_bagazu +
                                            ", waga: " +
                                            el.waga +
                                            ", wymiary: " +
                                            el.wymiary +
                                            ", "}
                                        </>
                                      );
                                    })}
                                  </span>
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant="body1">
                                  Uslugi dodatkowe:{" "}
                                  <span style={{ fontWeight: "bold" }}>
                                    {person.service.map((el) => {
                                      return <>{el.nazwa + ", "}</>;
                                    })}
                                  </span>
                                </Typography>
                              </Grid>
                            </>
                          );
                        })}

                        <Typography variant="body1">
                          Cena: {"  "}
                          <span
                            style={{
                              fontSize: "1.5rem",
                              color: red[700],
                              fontWeight: "bold",
                            }}
                          >
                            {ticket.ticketPrice + ".00zł"}
                          </span>
                        </Typography>
                        <Typography variant="body1">
                          Status: {"  "}
                          <span
                            style={{
                              fontSize: "1.5rem",
                              color: red[700],
                              fontWeight: "bold",
                            }}
                          >
                            {ticket.ticketStatus}
                          </span>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </>
    );
  } else {
    return (
      <div>
        <Button
          variant="contained"
          startIcon={<UndoIcon />}
          onClick={() => {
            navigate("/");
          }}
        >
          Strona główna
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Box>
        <Typography variant="h1">Brak biletów</Typography>
      </div>
    );
  }
}
