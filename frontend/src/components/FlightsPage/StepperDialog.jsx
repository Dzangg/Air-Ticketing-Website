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
import { Stack, StepLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { Form } from "react-router-dom";
import { green, red } from "@mui/material/colors";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import FormLabel from "@mui/material/FormLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// const flightSeats = [
//   "A1",
//   "A2",
//   "A3",
//   "A4",
//   "A5",
//   "B1",
//   "B2",
//   "B3",
//   "B4",
//   "B5",
//   "C1",
//   "C2",
//   "C3",
//   "C4",
//   "C5",
// ];

export default function StepperDialog(props) {
  //console.log(props.user);
  const [user, setUser] = useState(null);
  const [steps, setSteps] = useState();
  const [flightSeats, setFlightSeats] = useState();
  const passengersLabelsData = [
    {
      imie: "",
      nazwisko: "",
      wiek: "",
      miejsce: "",
      miejsceWybrane: false,
      type: "",
      bagaz_podreczny: "",
      bagaz_rejestrowany: "",
      uslugi_dodatkowe: [],
      koszt: "",
    },
  ];

  const [passengersData, setPassengerData] = useState(passengersLabelsData);
  const [ticketCost, setTicketCost] = useState(null);

  useEffect(() => {
    luggageData();
    servicesData();
    s();
    generateSteps();
  }, []);

  useEffect(() => {
    if (props.user) {
      setUser(props.user);
      const updatedPassengers = [...passengersData];
      updatedPassengers[0].imie = props.user.userImie;
      updatedPassengers[0].nazwisko = props.user.userNazwisko;
      updatedPassengers[0].wiek = props.user.userWiek;
      updatedPassengers[0].email = props.user.userEmail;
      updatedPassengers[0].type = "dorosly";

      setPassengerData(updatedPassengers);
    }
  }, [props.user]);

  useEffect(() => {
    generateSteps();
    setPassengersCost();
    console.log(passengersData);
  }, [passengersData, ticketCost]);

  const generateSteps = () => {
    setSteps([
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
                          value={props.user.userImie}
                        />
                        <TextField
                          label="Nazwisko"
                          disabled
                          value={props.user.userNazwisko}
                        />
                        <TextField
                          type="number"
                          label="Wiek"
                          disabled
                          value={props.user.userWiek}
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
            {luggagesOptions && services
              ? passengersData.map((passenger, index) => {
                  return (
                    <>
                      <Typography variant="subtitle1">
                        Pasażer nr {index + 1} - {passenger.imie}
                      </Typography>

                      <Typography variant="body1">
                        Wybór miejsca -{" "}
                        <span style={{ fontWeight: "bold", color: red[500] }}>
                          {services[1].cena}zł
                        </span>
                      </Typography>
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          mt: "20px",
                        }}
                      >
                        <FormControl fullWidth>
                          <InputLabel id={"seat-select-label-" + index}>
                            Miejsce
                          </InputLabel>
                          <Select
                            labelId={"seat-select-label-" + index}
                            id={"seat-select-" + index}
                            value={
                              passengersData[index].miejsceWybrane
                                ? passengersData[index].miejsce
                                : ""
                            }
                            label="Miejsce"
                            onChange={(event) => {
                              handleSeatChange(event, index);
                            }}
                          >
                            <MenuItem value={""}>{"Brak"}</MenuItem>
                            {flightSeats.map((seat) => {
                              return <MenuItem value={seat}>{seat}</MenuItem>;
                            })}
                          </Select>
                        </FormControl>
                        <FormControl fullWidth>
                          <InputLabel id={"luggage-select-label-" + index}>
                            Bagaz rejestrowany
                          </InputLabel>
                          <Select
                            labelId={"luggage-select-label-" + index}
                            id={"luggage-select-" + index}
                            value={passengersData[index].bagaz_rejestrowany}
                            label="Bagaz rejestrowany"
                            onChange={(event) => {
                              handleLuggageChange(event, index);
                            }}
                          >
                            <MenuItem value={""}>{"Brak"}</MenuItem>
                            {luggagesOptions.map((luggage, key) => {
                              if (key != 0) {
                                return (
                                  <MenuItem value={luggage.bagaz_id}>
                                    {luggage.typ_bagazu +
                                      ", waga: " +
                                      luggage.waga +
                                      ", wymiary: " +
                                      luggage.wymiary +
                                      ", cena: " +
                                      luggage.cena +
                                      "zł"}
                                  </MenuItem>
                                );
                              }
                            })}
                          </Select>
                        </FormControl>
                      </Box>

                      <Stack direction="row">
                        <FormControl fullWidth>
                          <InputLabel id={"service-select-label-" + index}>
                            Usługi dodatkowe
                          </InputLabel>
                          <Select
                            labelId={"service-select-label-" + index}
                            id={"service-select-" + index}
                            value={passengersData[index].uslugi_dodatkowe}
                            label="Uslugi dodatkowe"
                            multiple
                            onChange={(event) => {
                              handleServiceChange(event, index);
                            }}
                          >
                            <MenuItem value={""}>{"Brak"}</MenuItem>
                            {services.map((service, index) => {
                              if (index != 1) {
                                return (
                                  <MenuItem
                                    value={service.id_uslugi}
                                    key={service.id_uslugi}
                                  >
                                    {service.nazwa +
                                      ", cena: " +
                                      service.cena +
                                      "zł"}
                                  </MenuItem>
                                );
                              }
                            })}
                          </Select>
                        </FormControl>
                        <FormControl
                          fullWidth
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <RadioGroup
                            aria-labelledby="radio-luggage"
                            defaultValue="bagaz-podreczny"
                            name="radio-luggage-bagaz-podreczny"
                          >
                            <FormControlLabel
                              value="bagaz-podreczny"
                              control={<Radio />}
                              label="bagaż-podręczny 0zł"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Stack>
                    </>
                  );
                })
              : ""}
          </>
        ),
      },
      {
        label: "Zarezerwuj i zapłać",
        content: (
          <>
            <Typography variant="h3">Podsumowanie</Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nr pasażera</TableCell>
                    <TableCell align="right">Imie</TableCell>
                    <TableCell align="right">Nazwisko</TableCell>
                    <TableCell align="right">miejsce</TableCell>
                    <TableCell align="right">bagaz_rejestrowany</TableCell>
                    <TableCell align="right">uslugi_dodatkowe</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {passengersData.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="right">{row.imie}</TableCell>

                      <TableCell align="right">{row.nazwisko}</TableCell>
                      <TableCell align="right">
                        {!row.miejsceWybrane ? "domyślne" : row.miejsce}
                      </TableCell>

                      <TableCell align="right">
                        {!row.bagaz_rejestrowany
                          ? "brak"
                          : luggagesOptions[row.bagaz_rejestrowany - 1]
                              .typ_bagazu +
                            " " +
                            luggagesOptions[row.bagaz_rejestrowany - 1].waga +
                            " " +
                            luggagesOptions[row.bagaz_rejestrowany - 1].wymiary}
                      </TableCell>
                      <TableCell align="right">
                        {row.uslugi_dodatkowe.length != 0
                          ? row.uslugi_dodatkowe.map((id) => {
                              return services[id - 1].nazwa + ", ";
                            })
                          : ""}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {ticketCost ? (
              <Typography variant="body1">
                Cena końcowa: {"  "}
                <span
                  style={{
                    fontSize: "1.5rem",
                    color: red[700],
                    fontWeight: "bold",
                  }}
                >
                  {ticketCost + ".00zł"}
                </span>
              </Typography>
            ) : (
              <></>
            )}
          </>
        ),
      },
    ]);
  };

  const luggageData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/luggages", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      setLuggagesOptions(jsonData);
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

      setServices(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const bookTicket = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ passengersData, flightId: props.flightId }),
      });
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const s = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/flights/${props.flightId}/seats`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const seats = await response.json();
      console.log(seats);

      setFlightSeats(seats);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
                miejsce: "",
                miejsceWybrane: false,
                bagaz_podreczny: "",
                bagaz_rejestrowany: "",
                type: type.name,
                uslugi_dodatkowe: [],
                koszt: "",
              });
            }
          } else {
            passengersLabelsData.push({
              imie: "",
              nazwisko: "",
              wiek: "",
              miejsce: "",
              miejsceWybrane: false,
              bagaz_podreczny: "",
              bagaz_rejestrowany: "",
              type: type.name,
              uslugi_dodatkowe: [],
              koszt: "",
            });
          }
        }
      }
    }
  }

  const handleSeatChange = (event, index) => {
    const updatedPassengers = [...passengersData];
    updatedPassengers[index].miejsce = event.target.value;
    if (event.target.value == "") {
      updatedPassengers[index].miejsceWybrane = false;
    } else {
      updatedPassengers[index].miejsceWybrane = true;
    }
    setPassengerData(updatedPassengers);
  };

  const handleSeatClose = (event, index) => {
    if (event.target.value == "") {
      const updatedPassengers = [...passengersData];
      updatedPassengers[index].miejsce = event.target.value;
    }
    setPassengerData(updatedPassengers);
  };

  const [luggagesOptions, setLuggagesOptions] = useState();

  const handleLuggageChange = (event, index) => {
    const updatedPassengers = [...passengersData];
    updatedPassengers[index].bagaz_rejestrowany = event.target.value;
    setPassengerData(updatedPassengers);
  };

  const [services, setServices] = useState();

  const handleServiceChange = (event, index) => {
    const updatedPassengers = [...passengersData];

    if (event.target.value.includes("")) {
      updatedPassengers[index].uslugi_dodatkowe = [];
      setPassengerData(updatedPassengers);
      return;
    }

    updatedPassengers[index].uslugi_dodatkowe =
      typeof event.target.value === "string"
        ? value.split(",")
        : event.target.value;
    setPassengerData(updatedPassengers);
  };

  const setPassengersCost = async () => {
    let sum = 0;
    passengersData.forEach((passenger) => {
      let subSum = 0;
      const seat = passenger.miejsceWybrane ? 64 : 0;
      const luggage =
        passenger.bagaz_rejestrowany != ""
          ? luggagesOptions[passenger.bagaz_rejestrowany - 1].cena
          : 0;
      // const usluga =
      //   passenger.uslugi_dodatkowe != []
      //     ? services[passenger.uslugi_dodatkowe - 1].cena
      //     : 0;

      let usluga = 0;

      if (passenger.uslugi_dodatkowe.length != 0) {
        passenger.uslugi_dodatkowe.forEach((id) => {
          usluga += services[id - 1].cena;
        });
      }

      subSum += seat + luggage + usluga;
      sum += subSum;
      passenger.koszt = subSum + props.flightPrice;

      // console.log("seat " + seat);
      // console.log("luggage " + luggage);
      // console.log("usluga " + usluga);
      // console.log(subSum);
    });
    setTicketCost(sum + props.flightPrice * numberOfPassengers);
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = async () => {
    if (activeStep == 0) {
      const result = await validateStepOne();
      if (result) {
        return setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
    if (activeStep == 1) {
      const result = await validateStepTwo();
      if (result) {
        return setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
    if (activeStep == 2) {
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

  const validateStepTwo = async () => {
    const result = !passengersData.some((passenger, index) => {
      const currentSeat = passenger.miejsce;
      return passengersData.some((passengerTwo, otherIndex) => {
        if (currentSeat != "") {
          return currentSeat === passengerTwo.miejsce && index !== otherIndex;
        }
      });
    });

    if (result) {
      const updatedPassengers = [...passengersData];

      const indexes = updatedPassengers
        .map((_, index) => index)
        .filter((index) => updatedPassengers[index].miejsce === "");

      indexes.forEach((index) => {
        // Find the first available seat
        const availableSeat = flightSeats.find(
          (seat) =>
            !updatedPassengers.some((passenger) => passenger.miejsce === seat)
        );

        // If an available seat is found, assign it to the passenger
        if (availableSeat) {
          updatedPassengers[index].miejsce = availableSeat;
        }
      });

      setPassengerData(updatedPassengers);
    }
    return result;
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (user) {
    return (
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {user &&
            steps.map((step, index) => {
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
              <Button
                onClick={() => {
                  if (activeStep === steps.length - 1) {
                    bookTicket();
                  } else {
                    handleNext();
                  }
                }}
              >
                {activeStep === steps.length - 1 ? "Potwierdź" : "Dalej"}
              </Button>
              <Button
                onClick={() => {
                  console.log(passengersData);
                  s();
                }}
              >
                test
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    );
  } else {
    return <div>loading...</div>;
  }
}
