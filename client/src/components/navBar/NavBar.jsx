import React, { useState } from "react";
import {
  AppBar,
  Tabs,
  Toolbar,
  Tab,
  useMediaQuery,
  useTheme,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import DrawerComp from "../drawer/DrawerComp";
import logo from "../../images/enablingLogo.jpg";

const PAGES = ["Home", "About Us", "Products", "Contact Us"];
const PATHS = ["/", "/about", "/products", "/contact"];

export const NavBar = () => {
  const [value, setValue] = useState(false);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" sx={{ background: "#063970" }}>
        <Toolbar>
          <img src={logo} alt="logo" style={{ width: "70px", height: "50px" }}/>
          {isMatch ? (
            <>
              <Typography sx={{ paddingLeft: '10%' }}>Enabling E-Vehicles</Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "5vw" }}
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
                indicatorColor="none"
              >
                {PAGES.map((page, index) => (
                  <Tab
                    label={page}
                    key={index}
                    component={Link}
                    to={PATHS[index]}
                    selected={value === index}
                  />
                ))}
                <Tab
                  label="Login"
                  onClick={handleClick}
                />
              </Tabs>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                  sx: {
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                  },
                }}
              >
                <MenuItem 
                  component={Link} 
                  to="/admin" 
                  onClick={handleClose}
                  sx={{
                    '&:hover': {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  Admin
                </MenuItem>
                <MenuItem 
                  component={Link} 
                  to="/subAdminLogin" 
                  onClick={handleClose}
                  sx={{
                    '&:hover': {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  SubAdmin
                </MenuItem>
                <MenuItem 
                  component={Link} 
                  to="/dealerLogin" 
                  onClick={handleClose}
                  sx={{
                    '&:hover': {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  Dealer
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};