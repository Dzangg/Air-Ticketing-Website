import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Main from "../components/MainPage/Main";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function Root() {
  // const userEmail = location.state.jsonData.userEmail;
  // const userName = location.state.jsonData.userName;

  // const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // const [user, setUser] = useState();

  // const authUser = async () => {
  //   try {
  //     const headers = new Headers();
  //     headers.append("Authorization", "Bearer " + token);
  //     const response = await fetch("http://localhost:3000/auth", {
  //       method: "GET",
  //       headers: headers,
  //     });

  //     if (!response.ok) {
  //       throw new Error("Error fetching data: " + response.status);
  //     }
  //     const jsonData = await response.json();
  //     setUser(jsonData.user);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     navigate("/login");
  //   }
  // };

  // useEffect(() => {
  //   authUser();
  // }, []);

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
