import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AddFlights() {
  const [inputsError, setInputsError] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleAlertOn = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const action = (
    <>
      <Button color="primary" size="small" onClick={handleAlertClose}>
        Ok
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleAlertClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const [flightInfo, setFlightInfo] = useState({
    cennik_id: "",
    zaloga_id: "",
    od: "",
    do: "",
    status: "",
    data_wylotu: "",
    data_przylotu: "",
    czas_wylotu: "",
    czas_przylotu: "",
    kod_lotu: "",
  });

  const handleFlightInfoChange = (event) => {
    const { name, value } = event.target;
    setFlightInfo((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  const validateInputs = async () => {
    for (let key in flightInfo) {
      if (flightInfo.hasOwnProperty(key) && flightInfo[key] === "") {
        return false;
      }
    }
    if (flightInfo.od == flightInfo.do) {
      return false;
    }
    return true;
  };

  const addFlight = async () => {
    if (!validateInputs()) {
      setInputsError(true);
      return;
    }

    try {
      const result = await validateInputs();
      if (!result) {
        console.log("Fill the inputs.");
        return;
      }

      const response = await fetch("http://localhost:3000/flights/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flightInfo),
      });

      if (!response.ok) {
        throw new Error("Error fetching data: " + response.status);
      }
      handleAlertOn();
      const jsonData = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log(flightInfo);
    setInputsError(false);
  }, [flightInfo]);

  return (
    <>
      <Typography variant="h3">Dodaj lot</Typography>
      {"*Wartości lotu sczegołów, samolotu, siedzeń są ustawiane na sztywno."}
      <Grid container direction="row" fullWidth sx={{ mt: "10px" }}>
        <Grid item>
          <TextField
            name="cennik_id"
            label="cennik_id"
            helperText={"1-4"}
            onChange={handleFlightInfoChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="zaloga_id"
            label="zaloga_id"
            helperText={"1-5"}
            onChange={handleFlightInfoChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="od"
            label="od"
            helperText={"miasto"}
            onChange={handleFlightInfoChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="do"
            label="do"
            helperText={"miasto"}
            onChange={handleFlightInfoChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="status"
            label="status"
            helperText={"Zaplanowany"}
            onChange={handleFlightInfoChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="data_wylotu"
            label="data_wylotu"
            helperText={"YYYY-MM-DD"}
            onChange={handleFlightInfoChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="data_przylotu"
            label="data_przylotu"
            helperText={"YYYY-MM-DD"}
            onChange={handleFlightInfoChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="czas_wylotu"
            label="czas_wylotu"
            helperText={"00:00"}
            onChange={handleFlightInfoChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="czas_przylotu"
            label="czas_przylotu"
            helperText={"00:00"}
            onChange={handleFlightInfoChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="kod_lotu"
            label="kod_lotu"
            helperText={"AA000"}
            onChange={handleFlightInfoChange}
          />
        </Grid>
      </Grid>
      <Button variant="contained" onClick={addFlight}>
        Dodaj
      </Button>
      {inputsError ? <div>Złe dane</div> : ""}

      {isAlertOpen ? (
        <Snackbar
          open={isAlertOpen}
          autoHideDuration={2000}
          onClose={handleAlertClose}
          message="Dodane lot"
          action={action}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      ) : (
        ""
      )}
    </>
  );
}
