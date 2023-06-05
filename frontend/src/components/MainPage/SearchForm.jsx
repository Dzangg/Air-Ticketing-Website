import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Passenger from "./Passenger";
import {
  Grid,
  TextField,
  Button,
  Box,
  Container,
  Typography,
  FormControl,
  MenuItem,
  IconButton,
  Menu,
  Autocomplete,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PeopleIcon from "@mui/icons-material/People";
import InputAdornment from "@mui/material/InputAdornment";

function SearchForm() {
  const validateInputs = async () => {
    const result =
      source != "" &&
      destination != "" &&
      sourceDate != "" &&
      destinationDate != "" &&
      (passengers.adults != 0 ||
        passengers.teenagers != 0 ||
        passengers.kids != 0 ||
        passengers.toddlers != 0);

    if (result) {
      return true;
    }
    return false;
  };

  const formatDate = (date) => {
    const formattedDate = date["$y"] + "-" + date["$M"] + "-" + date["$D"];
    return formattedDate;
  };

  const [locationsData, setLocationsData] = useState(null);
  const [flightsData, setFlightsData] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    airportData();
  }, []);

  const airportData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/airports", {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Example header
        },
      });
      const jsonData = await response.json();
      setLocationsData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const searchFlights = async () => {
    try {
      const result = validateInputs();
      if (!result) {
        console.log("Fill the inputs.");
        return;
      }

      const inputData = {
        source: source,
        destination: destination,
        sourceDate: formatDate(sourceDate),
        destinationDate: formatDate(destinationDate),
        numberOfPassengers:
          passengers.adults +
          passengers.teenagers +
          passengers.kids +
          passengers.toddlers,
      };

      const response = await fetch("http://localhost:3000/flights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        throw new Error("Error fetching data: " + response.status);
      }

      const jsonData = await response.json();
      setFlightsData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const passengerNames = ["adults", "teenagers", "kids", "toddlers"];

  const navigate = useNavigate();
  const [source, setSource] = useState();
  const [destination, setDestination] = useState();
  const [sourceDate, setSourceDate] = useState();
  const [destinationDate, setDestinationDate] = useState();
  const [dateError, setDateError] = useState(false);

  const handleSourceDateChange = (date) => {
    if (date < new Date()) {
      setDateError(true);
    } else {
      setDateError(false);
      setSourceDate(date);
    }
  };

  const handleDestinationDateChange = (date) => {
    if (date < new Date()) {
      setDateError(true);
    } else {
      setDateError(false);
      setDestinationDate(date);
    }
  };

  const [autocompeleteOne, setAutocompleteOne] = useState(null);
  const handleAutocompleteOne = (v) => {
    setAutocompleteOne(v);
  };

  const [autocompeleteTwo, setAutocompleteTwo] = useState(null);
  const handleAutocompleteTwo = (v) => {
    setAutocompleteTwo(v);
  };

  const handleSourceChange = (v) => {
    setSource(v);
  };

  const handleDestinationChange = (v) => {
    setDestination(v);
  };

  const [passengers, setPassengers] = useState({
    adults: 0,
    teenagers: 0,
    kids: 0,
    toddlers: 0,
  });

  const handlePassengersIncreaseChange = (name) => {
    setPassengers((prevValues) => {
      return {
        ...prevValues,
        [name]: prevValues[name] + 1,
      };
    });
  };

  const handlePassengersDecreaseChange = (name) => {
    setPassengers((prevValues) => {
      if (prevValues[name] == 0) {
        return {
          ...prevValues,
          [name]: 0,
        };
      }
      return {
        ...prevValues,
        [name]: prevValues[name] - 1,
      };
    });
  };

  const [anchorEl, setAnchorEl] = useState(0);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const buttonRef = useRef(null);

  // Function to calculate the button width
  const calculateButtonWidth = () => {
    if (buttonRef.current) {
      return buttonRef.current.clientWidth;
    }
    return 0;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container sx={{ maxWidth: "420px", marginTop: "50px" }} maxWidth={false}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          // minHeight="60vh"
        >
          <Grid container spacing={2} direction="column">
            {/* Lotnisko poczatkowe */}
            <Grid item>
              <FormControl fullWidth>
                <Autocomplete
                  options={locationsData}
                  getOptionLabel={(option) => option.nazwa}
                  value={autocompeleteOne}
                  inputValue={source}
                  onChange={(event, newValue) => {
                    handleAutocompleteOne(newValue);
                  }}
                  onInputChange={(event, newInputValue) => {
                    handleSourceChange(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Skąd"
                      name="source"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            {/*           


            {/* Lotnisko koncowe */}
            <Grid item>
              <FormControl fullWidth>
                <Autocomplete
                  options={locationsData}
                  getOptionLabel={(option) => option.nazwa}
                  value={autocompeleteTwo}
                  inputValue={destination}
                  onChange={(event, newValue) => {
                    handleAutocompleteTwo(newValue);
                  }}
                  onInputChange={(event, newInputValue) => {
                    handleDestinationChange(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Dokąd"
                      name="destination"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/* Data wylotu */}
            <Grid item>
              <FormControl fullWidth>
                <DatePicker
                  disablePast
                  label="Wylot"
                  fullWidth
                  value={sourceDate}
                  onChange={handleSourceDateChange}
                  error={dateError}
                />
              </FormControl>
            </Grid>
            {/* Data powrotu */}
            <Grid item>
              <FormControl fullWidth>
                <DatePicker
                  disablePast
                  label="Powrót"
                  fullWidth
                  value={destinationDate}
                  onChange={handleDestinationDateChange}
                  error={dateError}
                />
              </FormControl>
            </Grid>

            {/* Pasazerowie */}

            <Grid item>
              <FormControl fullWidth>
                <TextField
                  ref={buttonRef}
                  id="input-with-icon-textfield"
                  label="Pasażerowie"
                  onClick={handleClick}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          color="inherit"
                          size="large"
                          onClick={handleClick}
                          sx={{ padding: "0px" }}
                        >
                          <PeopleIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                <Menu
                  marginThreshold={0}
                  PaperProps={{
                    style: {
                      width: calculateButtonWidth(), // Set the menu width dynamically
                    },
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  {passengerNames.map((name) => {
                    return (
                      <MenuItem>
                        <Passenger
                          name={name}
                          handlePassengersIncreaseChange={(name) =>
                            handlePassengersIncreaseChange(name)
                          }
                          handlePassengersDecreaseChange={(name) =>
                            handlePassengersDecreaseChange(name)
                          }
                          passengers={passengers}
                        />
                      </MenuItem>
                    );
                  })}
                </Menu>
              </FormControl>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={searchFlights}
              >
                Wyszukaj
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}

export default SearchForm;
