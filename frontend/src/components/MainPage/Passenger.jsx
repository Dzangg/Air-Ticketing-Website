import React, { useState } from "react";
import { IconButton, FormControl, Box } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";

export default function Passenger(props) {
  const pName = {
    name: "",
  };
  if (props.name == "adults") {
    pName.name = "dorosly(18>)";
  } else if (props.name == "teenagers") {
    pName.name = "nastolatek(17-13)";
  } else if (props.name == "kids") {
    pName.name = "dziecko(12-3)";
  } else {
    pName.name = "niemowle(2-0)";
  }

  return (
    <>
      <FormControl fullWidth>
        <Box fullWidth>
          <PersonIcon />
          {pName.name}
          <IconButton
            color="inherit"
            size="small"
            name={props.name}
            onClick={() => props.handlePassengersDecreaseChange(props.name)}
          >
            <RemoveIcon />
          </IconButton>
          {props.passengers[props.name]}
          <IconButton
            color="inherit"
            size="small"
            name={props.name}
            onClick={() => props.handlePassengersIncreaseChange(props.name)}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </FormControl>
    </>
  );
}
