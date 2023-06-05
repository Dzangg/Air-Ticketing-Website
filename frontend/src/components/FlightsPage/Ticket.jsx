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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.handleClose();
    setOpen(false);
  };
  useEffect(() => {
    handleClickOpen();
  }, []);

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Rezerwacja lotu nr: "} {props.flightInfo.kod_lotu}
        </DialogTitle>
        <DialogContent>
          <StepperDialog />
        </DialogContent>
      </Dialog>
    </>
  );
}
