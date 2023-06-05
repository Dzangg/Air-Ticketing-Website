import React, { useState } from "react";
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
import { green } from "@mui/material/colors";

export default function StepperDialog(props) {
  const passengers = [
    {
      imie: "Jan",
      nazwisko: "Nowak",
      wiek: 35,
    },
  ];

  const numberOfPassengers = 3;

  for (let i = 0; i < numberOfPassengers; i++) {
    passengers.push({ imie: "", nazwisko: "", wiek: "" });
  }

  const [passengerData, setPassengerData] = useState(passengers);

  const steps = [
    {
      label: "Wypełnij dane pasażerów",
      content: (
        <>
          {passengers.map((passenger, index) => {
            if (index == 0) {
              return (
                <>
                  <Typography variant="subtitle1">
                    Pasażer nr {index + 1}{" "}
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
                        value={passengerData[index].imie}
                      />
                      <TextField
                        label="Nazwisko"
                        disabled
                        value={passengerData[index].nazwisko}
                      />
                      <TextField
                        type="number"
                        label="Wiek"
                        disabled
                        value={passengerData[index].wiek}
                      />
                    </Box>
                  </FormControl>
                </>
              );
            } else {
              return (
                <>
                  <Typography variant="subtitle2">
                    Pasażer nr {index + 1}
                  </Typography>
                  <FormControl>
                    <Box style={{ display: "flex", flexDirection: "row" }}>
                      <TextField
                        label="Imie"
                        defaultValue=""
                        value={passengerData[index].imie}
                        onChange={(e) => {
                          const updatedPassengers = [...passengerData];
                          updatedPassengers[index].imie = e.target.value;
                          setPassengerData(updatedPassengers);
                        }}
                      />
                      <TextField
                        label="Nazwisko"
                        defaultValue=""
                        value={passengerData[index].nazwisko}
                        onChange={(e) => {
                          const updatedPassengers = [...passengerData];
                          updatedPassengers[index].nazwisko = e.target.value;
                          setPassengerData(updatedPassengers);
                        }}
                      />
                      <TextField
                        type="number"
                        label="Wiek"
                        defaultValue=""
                        value={passengerData[index].wiek}
                        onChange={(e) => {
                          const updatedPassengers = [...passengerData];
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
      label: "Wybierz bagaż i usługi",
      content: "Step 2 content goes here",
    },
    {
      label: "Zarezerwuj i zapłać",
      content: "Step 3 content goes here",
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = async () => {
    const result = await validate();
    if (result) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const validate = async () => {
    for (const el of passengerData) {
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
            {/* <Button color="inherit" onClick={props.handleClose}>
              close
            </Button> */}
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
