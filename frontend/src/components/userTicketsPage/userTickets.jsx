import React from "react";

import {
  Container,
  Stack,
  Typography,
  Button,
  Divider,
  Box,
  Grid,
  CardContent,
  CardHeader,
} from "@mui/material";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function userTIckets() {
  return (
    <Container sx={{ overflow: "hidden" }}>
      <Stack direction="row" sx={{ mt: "30px" }} alignItems="center">
        <Item>
          <Typography variant="h3">Bilety:</Typography>
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
          {flightsData.map((flight, key) => (
            <Grid item xs={12} sm={6} md={6} key={key}>
              <Grid item>
                <Card sx={{ border: "1px solid black" }}>
                  <CardHeader title={"Lot nr. " + flight.kod_lotu} />
                  <Divider />

                  <CardContent>
                    <Grid container direction="row">
                      <Grid item>
                        <Typography variant="body1">
                          Z:{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {flight.m_pocz}
                          </span>{" "}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          -{">"} Do:{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {flight.m_doc}
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="body1">
                      Data wylotu:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {flight.data_wylotu}
                      </span>
                      {" - "}
                      Data przylotu:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {flight.data_przylotu}
                      </span>{" "}
                    </Typography>
                    <Grid item>
                      <Typography variant="body1">
                        Czas wylotu:{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {flight.czas_wylotu}
                        </span>
                        {" - "}
                        Czas przylotu:{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {flight.czas_przylotu}
                        </span>{" "}
                      </Typography>
                    </Grid>
                    <Typography variant="body1">
                      Cena bazowa: {"  "}
                      <span
                        style={{
                          fontSize: "1.5rem",
                          color: red[700],
                          fontWeight: "bold",
                        }}
                      >
                        {flight.cena + ".00zł / os"}
                      </span>
                    </Typography>{" "}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={openDialog}
                    >
                      Wybierz
                    </Button>
                    {openTicketDialog ? (
                      <Ticket
                        open={openTicketDialog}
                        handleClose={closeDialog}
                        flight={flight}
                        passengers={passengersInfo}
                        user={user}
                      />
                    ) : (
                      ""
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
