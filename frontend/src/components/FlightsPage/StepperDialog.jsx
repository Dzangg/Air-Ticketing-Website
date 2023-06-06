import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { StepLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { Form } from "react-router-dom";
import { green, red } from "@mui/material/colors";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import FormLabel from "@mui/material/FormLabel";

const flightSeats = [
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
  "B1",
  "B2",
  "B3",
  "B4",
  "B5",
  "C1",
  "C2",
  "C3",
  "C4",
  "C5",
];

export default function StepperDialog(props) {
  useEffect(() => {
    luggageData();
    servicesData();
  }, []);

  const luggageData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/luggages", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      const l = setLuggagesOptions(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const servicesData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/services", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();

      const s = setServices(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [luggagesOptions, setLuggagesOptions] = useState();
  const [services, setServices] = useState();

  const [luggages, setLuggages] = useState([]);

  const handleLuggageChange = (event, index) => {
    setSeats((prevLuggages) => {
      const updatedLuggages = [...prevLuggages];
      updatedLuggages.push();
      return updatedLuggages;
    });
  };

  console.log(services);

  const user = props.user;

  const passengersLabelsData = [
    {
      imie: "",
      nazwisko: "",
      wiek: "",
      miejsce: "",
      type: "",
      bagaz_podreczny: "",
      bagaz_rejestrowany: "",
    },
  ];

  const passengers = Object.values(props.passengers);
  let numberOfPassengers = 0;
  passengers.forEach((num) => (numberOfPassengers += num));

  if (numberOfPassengers > 1) {
    for (let i = 0; i < numberOfPassengers; i++) {
      if (passengers[i] > 0) {
        const type = {
          name: "",
        };
        if (i == 0) {
          type.name = "dorosły";
        } else if (i == 1) {
          type.name = "nastolatek";
        } else if (i == 2) {
          type.name = "dziecko";
        } else {
          type.name = "niemowle";
        }
        // Dorosly default + 1

        if (i == 0 && passengers[i] == 1) {
          continue;
        } else {
          if (passengers[i] > 1) {
            for (let j = 0; j < passengers[i]; j++) {
              passengersLabelsData.push({
                imie: "",
                nazwisko: "",
                wiek: "",
                bagaz_podreczny: "",
                bagaz_rejestrowany: "",
                type: type.name,
              });
            }
          } else {
            passengersLabelsData.push({
              imie: "",
              nazwisko: "",
              wiek: "",
              bagaz_podreczny: "",
              bagaz_rejestrowany: "",
              type: type.name,
            });
          }
        }
      }
    }
  }

  passengersLabelsData[0] = {
    imie: user.imie,
    nazwisko: user.nazwisko,
    wiek: user.wiek,
    type: "dorosły",
    miejsce: "",
    bagaz_podreczny: "",
    bagaz_rejestrowany: "",
  };

  const [passengersData, setPassengerData] = useState(passengersLabelsData);

  const [seats, setSeats] = useState([]);

  const handleSeatChange = (event, index) => {
    const updatedSeats = [...seats];
    updatedSeats[index] = event.target.value;
    setSeats(updatedSeats);
  };

  const steps = [
    {
      label: "Wypełnij dane pasażerów",
      content: (
        <>
          {passengersData.map((passenger, index) => {
            if (index == 0) {
              return (
                <>
                  <Typography variant="subtitle1">
                    Pasażer nr {index + 1} - użytkownik
                  </Typography>
                  <FormControl>
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        p: "40px",
                      }}
                    >
                      <TextField
                        label="Imie"
                        disabled
                        value={passengersData[index].imie}
                      />
                      <TextField
                        label="Nazwisko"
                        disabled
                        value={passengersData[index].nazwisko}
                      />
                      <TextField
                        type="number"
                        label="Wiek"
                        disabled
                        value={passengersData[index].wiek}
                      />
                    </Box>
                  </FormControl>
                </>
              );
            } else {
              return (
                <>
                  <Typography variant="subtitle1">
                    Pasażer nr {index + 1} - {passenger.type}
                  </Typography>
                  <FormControl>
                    <Box style={{ display: "flex", flexDirection: "row" }}>
                      <TextField
                        label="Imie"
                        defaultValue=""
                        value={passengersData[index].imie}
                        onChange={(e) => {
                          const updatedPassengers = [...passengersData];
                          updatedPassengers[index].imie = e.target.value;
                          setPassengerData(updatedPassengers);
                        }}
                      />
                      <TextField
                        label="Nazwisko"
                        defaultValue=""
                        value={passengersData[index].nazwisko}
                        onChange={(e) => {
                          const updatedPassengers = [...passengersData];
                          updatedPassengers[index].nazwisko = e.target.value;
                          setPassengerData(updatedPassengers);
                        }}
                      />
                      <TextField
                        type="number"
                        label="Wiek"
                        defaultValue=""
                        value={passengersData[index].wiek}
                        onChange={(e) => {
                          const updatedPassengers = [...passengersData];
                          updatedPassengers[index].wiek = e.target.value;
                          setPassengerData(updatedPassengers);
                        }}
                      />
                    </Box>
                  </FormControl>
                </>
              );
            }
          })}
        </>
      ),
    },
    {
      label: "Wybierz miejsce, bagaż i usługi",
      content: (
        <>
          {luggages && seats
            ? passengersData.map((passenger, index) => {
                return (
                  <>
                    <Typography variant="subtitle1">
                      Pasażer nr {index + 1} - {passenger.imie}
                    </Typography>

                    <Typography variant="body1">
                      Wybór miejsca -{" "}
                      <span style={{ fontWeight: "bold", color: red[500] }}>
                        {/* {services[2].cena}zł */}
                      </span>
                    </Typography>
                    <Box style={{ display: "flex", flexDirection: "row" }}>
                      <FormControl fullWidth>
                        <Select
                          labelId={"seat-select-label-" + index}
                          id={"seat-select-" + index}
                          value={seats[index]}
                          label="Miejsce"
                          onChange={(event) => {
                            handleSeatChange(event, index);
                          }}
                        >
                          {flightSeats.map((seat) => {
                            return <MenuItem value={seat}>{seat}</MenuItem>;
                          })}
                        </Select>
                        <RadioGroup
                          aria-labelledby="radio-luggage"
                          defaultValue="bagaz-podreczny"
                          name="radio-luggage-bagaz-podreczny"
                        >
                          <FormControlLabel
                            value="bagaz-podreczny"
                            control={<Radio />}
                            label="bagaż-podręczny"
                          />
                        </RadioGroup>
                        {/* <Select
                      labelId={"luggage-select-label-" + index}
                      id={"luggage-select-" + index}
                      value={passenger.bagaz_rejestrowany}
                      label="Miejsce"
                      onChange={(event) => {
                        handleSeatChange(event, index);
                      }}
                    >
                      {flightSeats.map((seat) => {
                        return <MenuItem value={seat}>{seat}</MenuItem>;
                      })}
                    </Select> */}
                      </FormControl>

                      {/* <TextField
                      label="miejsce"
                      defaultValue=""
                      value={passengersData[index].miejsce}
                      onChange={(e) => {
                        const updatedPassengers = [...passengersData];
                        updatedPassengers[index].miejsce = e.target.value;
                        setPassengerData(updatedPassengers);
                      }}
                    /> */}
                    </Box>
                  </>
                );
              })
            : ""}
        </>
      ),
    },
    {
      label: "Zarezerwuj i zapłać",
      content: "Step 3 content goes here",
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = async () => {
    const result = await validateStepOne();
    if (result) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const validateStepOne = async () => {
    for (const el of passengersData) {
      if (el.imie == "" || el.nazwisko == "" || el.wiek == "") {
        return false;
      }
    }
    return true;
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you finished
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Krok {activeStep + 1}</Typography>
          {steps[activeStep].content}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" onClick={props.handleClose}>
              Zamknij
            </Button>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Cofnij
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Potwierdź" : "Dalej"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
