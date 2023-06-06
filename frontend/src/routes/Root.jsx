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
      <div
      // style={{
      //   backgroundImage: "url(/img/background-airplane.jpg)",
      //   height: "100vh",
      //   overflowY: "hidden",
      //   position: "fixed",
      //   width: "100%",
      //   backgroundSize: "cover", // Scale the background image to cover the entire div
      //   backgroundPosition: "center", // Center the background image
      //   left: 0,
      // }}
      >
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Main />
        </ThemeProvider>
      </div>
    </>
  );
}

export default Root;
