import React, { useState, useRef } from "react";
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
  const navigate = useNavigate();
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [destinationDate, setDestinationDate] = useState("");

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

  const handleStartChange = (event) => {
    setStart(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    console.log(startDate);
  };

  const handleDestinationDateChange = (event) => {
    setDestinationDate(event.target.value);
  };

  const locations = ["Warszawa", "Gdańsk", "Kraków"];

  const locationsData = locations.map((location, index) => ({
    id: index + 1,
    label: location,
  }));

  const passengerNames = ["adults", "teenagers", "kids", "toddlers"];

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
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Skąd"
                      name="startPlace"
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
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Dokąd"
                      name="destinationPlace"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/* Data wylotu */}
            <Grid item>
              <FormControl fullWidth>
                <DatePicker label="Wylot" fullWidth onChange={setStartDate} />
              </FormControl>
            </Grid>
            {/* Data powrotu */}
            <Grid item>
              <FormControl fullWidth>
                <DatePicker
                  label="Powrót"
                  fullWidth
                  onChange={setDestinationDate}
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
                onClick={() => navigate("/flights")}
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
