import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import eventBus from "../eventBus/EventBus"; // Correct import path

// Function to determine the API URL based on the environment
const getApiUrl = (endpoint) => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://api.enablingev.com' 
    : 'http://localhost:5001';
  return `${baseUrl}${endpoint}`;
};

export const DisplayActivationCode = () => {
  const [showActivationCodeInfo, setShowActivationCodeInfo] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activationCodes, setActivationCodes] = useState([]);
  const [open, setOpen] = useState(false); // State to handle dialog visibility

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCodes = activationCodes.filter((code) =>
    code.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchActivationCodes = async () => {
    try {
      const response = await axios.get(getApiUrl("/ActivationCode"));
      if (response.status === 200) {
        setActivationCodes(response.data);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching activation codes:", error);
    }
  };

  useEffect(() => {
    if (showActivationCodeInfo) {
      fetchActivationCodes();
    }

    const handleActivationCodesUpdated = () => {
      fetchActivationCodes();
    };

    eventBus.subscribe("activationCodesUpdated", handleActivationCodesUpdated);

    return () => {
      eventBus.unsubscribe(
        "activationCodesUpdated",
        handleActivationCodesUpdated
      );
    };
  }, [showActivationCodeInfo]);

  const handleDelete = async (codeToDelete) => {
    try {
      await axios.delete(getApiUrl(`/ActivationCode/${encodeURIComponent(codeToDelete)}`));
      setActivationCodes((prevCodes) =>
        prevCodes.filter((codeObj) => codeObj.code !== codeToDelete)
      );
    } catch (error) {
      console.error("Error deleting activation code:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      <Typography
        variant="h4"
        sx={{
          color: "#3f51b5",
          textDecoration: "underline",
          fontFamily: "Roboto",
          fontWeight: "bold",
        }}
      >
        Display Activation Codes
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setShowActivationCodeInfo((prev) => !prev);
          if (!showActivationCodeInfo) fetchActivationCodes(); // Fetch codes only when showing info
          setOpen(true); // Open the dialog
        }}
        sx={{
          mt: 2,
          width: "35%",
          fontSize: "1.1rem",
          fontWeight: "bold",
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          color: "white",
          "&:hover": {
            background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
          },
        }}
      >
        Click Here
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          Display Activation Codes
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 3 }}>
            <TextField
              label="Search by code..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              fullWidth
              sx={{ mb: 3, width: "100%" }}
            />

            <TableContainer component={Paper}>
              <Table sx={{ width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography variant="h6" fontWeight="bold">
                        Code
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" fontWeight="bold">
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCodes.map((code) => (
                    <TableRow key={code.code}>
                      <TableCell align="center">{code.code}</TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 1,
                          }}
                        >
                          <IconButton
                            sx={{
                              background:
                                "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                              color: "white",
                              "&:hover": {
                                background:
                                  "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
                              },
                            }}
                            onClick={() => handleDelete(code.code)}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};