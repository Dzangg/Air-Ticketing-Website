import React, { useState } from "react";
import { IconButton, FormControl, Box } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";

export default function Passenger(props) {
  return (
    <>
      <FormControl fullWidth>
        <Box fullWidth>
          <PersonIcon />
          {props.name}
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
