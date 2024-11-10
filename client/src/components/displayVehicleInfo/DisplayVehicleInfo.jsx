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
import CloseIcon from "@mui/icons-material/Close";

// Function to determine the API URL based on the environment
const getApiUrl = (endpoint) => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://api.enablingev.com' 
    : 'http://localhost:5001';
  return `${baseUrl}${endpoint}`;
};

export const DisplayVehicleInfo = ({
  showDeleteButton = true,
  showLabel = true,
  lastTenDigits,
}) => {
  const [showActivationCodeInfo, setShowActivationCodeInfo] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activationCodes, setActivationCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // State to handle dialog visibility

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Helper function to check if the search term matches any field in the object
  const matchesSearchTerm = (code) => {
    const fields = [
      code.dealerNameDealerCode,
      code.chassisNumber,
      code.bodyType,
      code.color,
      code.model,
      code.batteryVolt,
      code.batteryCompany,
      code.batteryAH,
      code.batteryWarranty,
      code.charger,
      code.isUsed ? "Yes" : "No",
    ];

    return fields.some((field) =>
      field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Filter the codes based on search term across all fields
  const filteredCodes = activationCodes.filter((code) =>
    matchesSearchTerm(code)
  );

  const fetchActivationCodes = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(getApiUrl("/VehicleTable"));
      if (response.status === 200) {
        let data = response.data;
      
        // Check the original response data
        console.log("Original Data:", data);
      
        // Filter the data by last ten digits
        if (lastTenDigits) {
          data = data.filter((code) =>
            code.dealerNameDealerCode.endsWith(lastTenDigits)
          );
        }
      
        // Check the filtered data
        console.log("Filtered Data:", data);
      
        setActivationCodes(data);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching activation codes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showActivationCodeInfo) {
      fetchActivationCodes();
    }
  }, [showActivationCodeInfo]); // Fetch when showActivationCodeInfo changes

  const handleDelete = async (codeToDelete) => {
    try {
      await axios.delete(getApiUrl(`/VehicleTable/${encodeURIComponent(codeToDelete)}`));
      setActivationCodes((prevCodes) =>
        prevCodes.filter((codeObj) => codeObj.id !== codeToDelete)
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
        Display Vehicle Information
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

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          Display Vehicle Information
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
            <TextField
              label="Search by any field..."
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
                      <Typography fontWeight="bold" fontSize={15}>
                        Dealer Name | Dealer Code
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        Chassis Number
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        Body Type
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        Color
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        Model
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        Battery Volt
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        Battery Company
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        Battery AH
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        Battery Warranty (Months)
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        Charger
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        isUsed
                      </Typography>
                    </TableCell>
                    {showLabel && (
                      <TableCell align="center">
                        <Typography fontSize={15} fontWeight="bold">
                          Delete
                        </Typography>
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCodes.map((code) => (
                    <TableRow key={code.code || code.id}>
                      <TableCell align="center">
                        {code.dealerNameDealerCode}
                      </TableCell>
                      <TableCell align="center">{code.chassisNumber}</TableCell>
                      <TableCell align="center">{code.bodyType}</TableCell>
                      <TableCell align="center">{code.color}</TableCell>
                      <TableCell align="center">{code.model}</TableCell>
                      <TableCell align="center">{code.batteryVolt}</TableCell>
                      <TableCell align="center">
                        {code.batteryCompany}
                      </TableCell>
                      <TableCell align="center">{code.batteryAH}</TableCell>
                      <TableCell align="center">
                        {code.batteryWarranty}
                      </TableCell>
                      <TableCell align="center">{code.charger}</TableCell>
                      <TableCell align="center">
                        {code.isUsed ? "Yes" : "No"}
                      </TableCell>
                      {showDeleteButton && (
                        <TableCell align="center">
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
                            onClick={() => handleDelete(code.code || code.id)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      )}
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