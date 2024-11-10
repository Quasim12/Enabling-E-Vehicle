import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import Cookies from 'js-cookie'; // Import the Cookies module

// Function to dynamically get the API URL based on environment
const getApiUrl = (endpoint) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.enablingev.com"
      : "http://localhost:5001";
  return `${baseUrl}${endpoint}`;
};

export const DealerLogin = () => {
  const [dealerCode, setDealerCode] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        getApiUrl("/dealer/login"), // Using the dynamic API URL
        {
          dealerCode,
          mobileNo,
        }
      );

      if (response.status === 200) {
        // Store dealer information in local storage
        localStorage.setItem("dealerInfo", JSON.stringify(response.data.dealer));
        Cookies.set("authToken", response.data.token); // Store the token in cookies
        navigate("/dealerDash", { state: { dealerCode } });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials");
         // Reset the input fields on invalid login
         setDealerCode("");
         setMobileNo("");
      } else {
        console.error("Error:", error);
        alert("An error occurred while logging in");
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 9,
          mb: 4,
          p: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "2rem",
              textDecoration: "underline",
              fontFamily: "Roboto",
            }}
          >
            Dealer Login
          </Typography>
          <TextField
            margin="normal"
            required
            sx={{ width: "80%" }}
            id="dealerCode"
            label="User ID"
            name="dealerCode"
            placeholder="Enter Your Dealer Code..."
            autoComplete="dealerCode"
            autoFocus
            value={dealerCode}
            onChange={(e) => setDealerCode(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            sx={{ width: "80%" }}
            name="mobileNo"
            label="Password"
            placeholder="Enter Your Mobile Number..."
            type="password"
            id="mobileNo"
            autoComplete="current-password"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "80%",
              mt: 2,
              mb: 3,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "35%",
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                color: "white",
              }}
            >
              Login
            </Button>
            <Link to="/dealerForm" style={{ textDecoration: "none" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#3f51b5",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontFamily: "Roboto",
                  fontSize: "1.1rem",
                }}
              >
                Register New Dealer
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#3f51b5",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontFamily: "Roboto",
                  fontSize: "1.1rem",
                }}
              >
                Click Here .... !!
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};