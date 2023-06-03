import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Main from "../components/MainPage/Main";
import { Outlet, Link } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function Root() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Main />
        <Link to={"flights"}>click - Flights</Link>
      </ThemeProvider>
    </>
  );
}

export default Root;
