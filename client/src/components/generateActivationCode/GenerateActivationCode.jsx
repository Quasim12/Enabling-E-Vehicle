import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import eventBus from "../eventBus/EventBus"; // Correct import path

// Function to determine the API URL based on the environment
const getApiUrl = (endpoint) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.enablingev.com"
      : "http://localhost:5001";
  return `${baseUrl}${endpoint}`;
};

export const GenerateActivationCode = () => {
  const [selectedSeries, setSelectedSeries] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [generatedCodes, setGeneratedCodes] = useState([]);
  const [seriesOptions, setSeriesOptions] = useState([]);
  const [disabledSeries, setDisabledSeries] = useState(new Set());
  const [open, setOpen] = useState(false); // State to handle dialog visibility

  const resetForm = () => {
    setSelectedSeries("");
    setSelectedNumber("");
    // No need to reset generatedCodes here to show the codes.
  };

  const storeActivationCode = async (activationCode) => {
    try {
      await axios.post(getApiUrl("/ActivationCode"), {
        code: activationCode,
      });
    } catch (error) {
      console.error("Error storing activation code:", error);
      alert("Failed to store activation code");
    }
  };

  const generateActivationCodes = async () => {
    if (!selectedSeries) {
      alert("Please select a series before generating the activation code.");
      return;
    }

    if (!selectedNumber) {
      alert("Please select how many activation codes you want to generate.");
      return;
    }

    if (disabledSeries.has(selectedSeries)) {
      alert("The selected series is disabled. Please enable it first.");
      return;
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

    const newCodes = [];

    for (let i = 0; i < Number(selectedNumber); i++) {
      // Generate random 5-digit number
      const randomFiveDigits = Math.floor(10000 + Math.random() * 90000); // Ensures the number is between 10000 and 99999
      
      // Construct the activation code
      const activationCode = `${selectedSeries}${day}${month}${year}${seconds}${milliseconds}${randomFiveDigits}`;
      
      newCodes.push(activationCode);
    }
    
    setGeneratedCodes(newCodes); // Set the generated codes

    await Promise.all(newCodes.map((code) => storeActivationCode(code)));

    eventBus.dispatch("activationCodesUpdated"); // Dispatch event to notify code update

  // Optionally, you can close the dialog here if needed
    setOpen(false);
  };

  const handleNumberChange = (event) => {
    setSelectedNumber(event.target.value);
  };

  const handleSeriesChange = (event) => {
    setSelectedSeries(event.target.value);
  };

  const toggleSeries = () => {
    if (selectedSeries) {
      setDisabledSeries((prev) => {
        const updated = new Set(prev);
        if (updated.has(selectedSeries)) {
          updated.delete(selectedSeries); // Enable series
        } else {
          updated.add(selectedSeries); // Disable series
        }
        return updated;
      });
    }
  };

  const fetchSeriesNames = async () => {
    try {
      const response = await axios.get(getApiUrl("/SeriesList"));
      setSeriesOptions(response.data);
    } catch (error) {
      console.error("Error fetching series names:", error);
    }
  };

  useEffect(() => {
    fetchSeriesNames();

    const handleSeriesListUpdated = () => {
      fetchSeriesNames();
    };

    eventBus.subscribe("seriesListUpdated", handleSeriesListUpdated);

    return () => {
      eventBus.unsubscribe("seriesListUpdated", handleSeriesListUpdated);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
    resetForm(); // Reset form fields when closing the dialog
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
        Generate Activation Codes
      </Typography>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
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
          Generate Activation Codes
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
            {generatedCodes.length > 0 ? (
              <List sx={{ marginLeft: "90px" }} >
                {generatedCodes.map((code, index) => (
                  <ListItem key={index}>{code}</ListItem>
                ))}
              </List>
            ) : (
              <Typography
                sx={{
                  padding: "8px",
                  width: "50%",
                  marginBottom: "20px",
                  textAlign: "center",
                  marginLeft: "105px" ,
                }}
              >
                No codes generated yet.
              </Typography>
            )}

            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Select number</InputLabel>
                  <Select
                    value={selectedNumber}
                    onChange={handleNumberChange}
                    label="Select number"
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Series</InputLabel>
                  <Select
                    value={selectedSeries}
                    onChange={handleSeriesChange}
                    label="Select Series"
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    {seriesOptions.map((option, index) => (
                      <MenuItem key={index} value={option.seriesName}>
                        {option.seriesName}{" "}
                        {disabledSeries.has(option.seriesName) ? "(Disabled)" : ""}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
              <Button
                variant="contained"
                onClick={generateActivationCodes}
                disabled={!selectedNumber || !selectedSeries}
                sx={{
                  background: "linear-gradient(45deg, #5dbea3 30%, #5dbea3 90%)",
                  color: "white",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #5dbea3 30%, #5dbea3 90%)",
                  },
                }}
              >
                Generate
              </Button>
              <Button
                variant="contained"
                onClick={toggleSeries}
                sx={{
                  background: disabledSeries.has(selectedSeries)
                    ? "linear-gradient(45deg, #5dbea3 30%, #5dbea3 90%)"
                    : "linear-gradient(45deg, #dd7973 30%, #dd7973 90%)",
                  color: "white",
                  "&:hover": {
                    background: disabledSeries.has(selectedSeries)
                      ? "linear-gradient(45deg,  #5dbea3 30%, #5dbea3 90%)"
                      : "linear-gradient(45deg, #dd7973 30%, #dd7973 90%)",
                  },
                }}
              >
                {disabledSeries.has(selectedSeries) ? "Enable" : "Disable"} Series
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};