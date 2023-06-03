import React, { useState } from "react";
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

function Header() {
  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState(false);

  const [anchorEl, setAnchorEl] = useState(0);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static" color="inherit">
      <Toolbar
        sx={{ display: "flex !important", justifyContent: "right !important" }}
      >
        <IconButton color="inherit" size="large" onClick={handleClick}>
          <AccountCircleIcon fontSize="large" />
        </IconButton>

        <Divider />

        <Menu anchorEl={anchorEl} open={open} onClick={handleClose}>
          {loginStatus ? (
            <>
              <MenuItem onClose={handleClose}>
                <AccountCircleIcon /> Account
              </MenuItem>

              <Divider />

              <MenuItem onClose={handleClose}>
                <LogoutIcon /> Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                onClose={handleClose}
                onClick={() => navigate("/login")}
              >
                <LoginIcon /> Login
              </MenuItem>

              <MenuItem onClose={handleClose} onClick={() => navigate("/sign")}>
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
