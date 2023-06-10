import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { useMediaQuery, useTheme } from "@mui/material";
import StepperDialog from "./StepperDialog";

export default function Ticket(props) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const passengers = props.passengers;

  console.log("ticket pasazerowie: " + JSON.stringify(passengers));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.handleClose();
    setOpen(false);
  };

  const [user, setUser] = useState();

  useEffect(() => {
    handleClickOpen();
    setUser(props.user);
  });

  const renderDialog = () => {
    return (
      <StepperDialog
        user={user}
        handleClose={handleClose}
        passengers={passengers}
        flightPrice={props.flight.cena}
        flightId={props.flight.lot_id}
      />
    );
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth
      >
        <DialogTitle id="responsive-dialog-title">
          {"Rezerwacja lotu nr: "} {props.flight.kod_lotu}
        </DialogTitle>
        <DialogContent>{user ? renderDialog() : ""}</DialogContent>
      </Dialog>
    </>
  );
}
