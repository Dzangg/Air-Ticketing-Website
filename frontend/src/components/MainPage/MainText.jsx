import React from "react";
import Typography from "@mui/material/Typography";
import { orange, blue } from "@mui/material/colors";
import "@fontsource/roboto/400.css";

export default function MainText() {
  return (
    <>
      <Typography
        variant="h1"
        component="h1"
        align="center"
        sx={{
          // marginTop: "50px",
          color: "text.primary",
          minHeight: "100px",
          maxHeight: "200px",
        }}
        fontSize="4rem"
      >
        Port Lotniczy Gdańsk
        <Typography variant="subtitle2" align="center">
          Fly now with
          <span style={{ fontWeight: "bold" }}>
            <span style={{ color: orange[600] }}> IDA'KA</span> SYSTEMS{" "}
          </span>
        </Typography>
      </Typography>

      <Typography
        variant="h2"
        align="center"
        sx={{ marginTop: "50px" }}
        fontSize="3rem"
      >
        Wyszukaj loty
      </Typography>
    </>
  );
}
