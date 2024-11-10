import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import Cookies from "js-cookie"; // Import the Cookies module

// Function to determine the API URL based on the environment
const getApiUrl = (endpoint) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.enablingev.com"
      : "http://localhost:5001";
  return `${baseUrl}${endpoint}`;
};

export const SubAdminLogin = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(getApiUrl("/CreateProfile/login"), {
        userId,
        password,
      });

      if (response.status === 200) {
        // Store userId information in local storage
        localStorage.setItem(
          "CreateProfile",
          JSON.stringify(response.data.user)
        );

        // Navigate to subAdminDash
        Cookies.set("authToken", response.data.token); // Store the token in cookies
        navigate("/subAdminDash", { state: { userId } });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials");
        // Reset the input fields on invalid login
        setUserId("");
        setPassword("");
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
            Sub Admin Login
          </Typography>
          <TextField
            margin="normal"
            required
            sx={{ width: "80%" }}
            id="userId"
            label="User ID"
            name="userId"
            autoComplete="userId"
            autoFocus
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            sx={{ width: "80%" }}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              mb: 3,
              width: "30%",
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              color: "white",
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
