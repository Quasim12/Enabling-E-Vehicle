import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import eventBus from "../eventBus/EventBus"; // Import the event bus

// Function to determine the API URL based on the environment
const getApiUrl = (endpoint) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.enablingev.com"
      : "http://localhost:5001";
  return `${baseUrl}${endpoint}`;
};

export const ModifyCNFCode = () => {
  const [oldSeriesName, setOldSeriesName] = useState("");
  const [newSeriesName, setNewSeriesName] = useState("");
  const [seriesName, setSeriesName] = useState("");
  const [showModifyAct, setShowModifyAct] = useState(false);
  const [formType, setFormType] = useState("");
  const [open, setOpen] = useState(false); // State to handle dialog visibility

  const handleButtonClick = (form) => {
    setFormType(form);
  
    // Reset only the relevant input fields based on form type
    if (form === "Add" || form === "Delete") {
      setSeriesName("");  // Reset series name for Add/Delete
    } else if (form === "Update") {
      setOldSeriesName("");  // Reset old and new names for Update
      setNewSeriesName("");
    }
  
    setOpen(true); // Open the dialog
  };
  

  const resetForm = () => {
    setOldSeriesName("");
    setNewSeriesName("");
    setSeriesName("");
    setShowModifyAct(false);
  };

  const handleAddCNF = async () => {
    if (!seriesName.trim()) {
      alert("Please enter a series name before adding.");
      return;
    }

    try {
      const response = await axios.post(getApiUrl("/SeriesList"), {
        seriesName,
        isValid: true,
      });

      if (response.status === 201) {
        alert("CNF added successfully");
        resetForm();
        eventBus.dispatch("seriesListUpdated"); // Dispatch event
      } else {
        alert("Failed to add CNF");
      }
    } catch (error) {
      console.error("Error adding CNF:", error);
      alert("Failed to add CNF");
    }
  };

  const handleUpdateCNF = async () => {
    if (!oldSeriesName.trim() || !newSeriesName.trim()) {
      alert("Please fill both old and new series names before updating.");
      return;
    }

    try {
      const response = await axios.put(
        getApiUrl(`/SeriesList/${encodeURIComponent(oldSeriesName)}`),
        {
          newSeriesName,
          isValid: true,
        }
      );

      if (response.status === 200) {
        alert("CNF updated successfully");
        resetForm();
        eventBus.dispatch("seriesListUpdated"); // Dispatch event
      } else {
        alert("Failed to update CNF");
      }
    } catch (error) {
      console.error("Error updating CNF:", error);
      alert("Failed to update CNF");
    }
  };

  const handleDeleteCNF = async () => {
    if (!seriesName.trim()) {
      alert("Please enter a series name before deleting.");
      return;
    }

    try {
      const response = await axios.delete(
        getApiUrl(`/SeriesList/${encodeURIComponent(seriesName)}`)
      );

      if (response.status === 204) {
        alert("CNF deleted successfully");
        resetForm();
        eventBus.dispatch("seriesListUpdated"); // Dispatch event
      } else {
        alert("Failed to delete CNF");
      }
    } catch (error) {
      console.error("Error deleting CNF:", error);
      alert("Failed to delete CNF");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (setter) => (e) => {
    const regex = /^[A-Z]*$/; // Regular expression to allow only uppercase A-Z
    if (regex.test(e.target.value)) {
      setter(e.target.value);
    }
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
        CNF Code
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

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>
          CNF Code Modification
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
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
            <Button
              variant="contained"
              onClick={() => handleButtonClick("Add")}
              sx={{
                background: "linear-gradient(45deg, #5dbea3 30%, #5dbea3 90%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #5dbea3 30%, #5dbea3 90%)",
                },
                mr: 2,
                mt: 2,
              }}
            >
              Add
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonClick("Update")}
              sx={{
                background: "linear-gradient(45deg, #5dbea3 30%, #5dbea3 90%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #5dbea3 30%, #5dbea3 90%)",
                },
                mr: 2,
                mt: 2,
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              onClick={() => handleButtonClick("Delete")}
              sx={{
                background: "linear-gradient(45deg, #dd7973 30%, #dd7973 90%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #dd7973 30%, #dd7973 90%)",
                },
                mt: 2,
              }}
            >
              Delete
            </Button>

            {formType === "Add" && (
              <Box sx={{ mt: 3 }}>
                <TextField
                  label="Series Name"
                  variant="outlined"
                  value={seriesName}
                  onChange={handleInputChange(setSeriesName)}
                  sx={{ mb: 2, width: "85%" }}
                />

                <Button
                  variant="contained"
                  onClick={handleAddCNF}
                  sx={{
                    background:
                      "linear-gradient(45deg, #5dbea3 30%, #5dbea3 90%)",
                    color: "white",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #5dbea3 30%, #5dbea3 90%)",
                    },
                  }}
                >
                  Add CNF
                </Button>
              </Box>
            )}

            {formType === "Update" && (
              <Box sx={{ mt: 3 }}>
                <TextField
                  label="Old Series Name"
                  variant="outlined"
                  value={oldSeriesName}
                  onChange={handleInputChange(setOldSeriesName)}
                  sx={{ mb: 2, width: "85%" }}
                />
                <TextField
                  label="New Series Name"
                  variant="outlined"
                  value={newSeriesName}
                  onChange={handleInputChange(setNewSeriesName)}
                  sx={{ mb: 2, width: "85%" }}
                />
                <Button
                  variant="contained"
                  onClick={handleUpdateCNF}
                  sx={{
                    background:
                      "linear-gradient(45deg, #5dbea3 30%, #5dbea3 90%)",
                    color: "white",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #5dbea3 30%, #5dbea3 90%)",
                    },
                  }}
                >
                  Update CNF
                </Button>
              </Box>
            )}

            {formType === "Delete" && (
              <Box sx={{ mt: 3 }}>
                <TextField
                  label="Series Name"
                  variant="outlined"
                  value={seriesName}
                  onChange={handleInputChange(setSeriesName)}
                  sx={{ mb: 2, width: "85%" }}
                />
                <Button
                  variant="contained"
                  onClick={handleDeleteCNF}
                  sx={{
                    background:
                      "linear-gradient(45deg, #dd7973 30%, #dd7973 90%)",
                    color: "white",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #dd7973 30%, #dd7973 90%)",
                    },
                  }}
                >
                  Delete CNF
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
