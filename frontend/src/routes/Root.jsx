import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Main from "../components/MainPage/Main";
import Header from "../components/Header";
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
      //   backgroundImage: "url(/img/samolot.jpg)",
      //   height: "100vh",
      //   overflowY: "hidden",
      //   position: "fixed",
      //   width: "100%",
      //   backgroundSize: "170%", // Scale the background image to cover the entire div
      //   // backgroundPosition: "right 10% bottom 40%", // Center the background image
      //   backgroundSize: "cover",
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
