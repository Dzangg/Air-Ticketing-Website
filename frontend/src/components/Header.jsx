import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import { orange } from "@mui/material/colors";

import {
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";

function Header(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [anchorEl, setAnchorEl] = useState(0);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (props) => {
    setAnchorEl(null);
  };

  const [user, setUser] = useState();

  useEffect(() => {
    setUser(props.user);
  }, []);

  return (
    <AppBar position="static" color="inherit">
      <Toolbar
        sx={{ display: "flex !important", justifyContent: "right !important" }}
      >
        {user && user.userImie}
        <IconButton color="inherit" size="large" onClick={handleClick}>
          <AccountCircleIcon fontSize="large" />
        </IconButton>

        <Divider />

        <Menu anchorEl={anchorEl} open={open} onClick={handleClose}>
          {token ? (
            <>
              <MenuItem
                onClose={handleClose}
                onClick={() => {
                  navigate("/account");
                }}
              >
                <AccountCircleIcon /> Konto
              </MenuItem>

              <Divider />

              <MenuItem
                onClose={handleClose}
                onClick={() => {
                  navigate("/login");
                }}
              >
                <LogoutIcon /> Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                onClose={handleClose}
                onClick={() => {
                  navigate("/login");
                }}
              >
                <LoginIcon /> Login
              </MenuItem>

              <MenuItem
                onClose={handleClose}
                onClick={() => {
                  navigate("/register");
                }}
              >
                <AppRegistrationIcon /> Register
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
