import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
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
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

// Function to determine the API URL based on the environment
const getApiUrl = (endpoint) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.enablingev.com"
      : "http://localhost:5001";
  return `${baseUrl}${endpoint}`;
};

export const DealerCustomerInfo = () => {
  const location = useLocation();
  const dealerCode = location.state?.dealerCode;
  const [showActivationCodeInfo, setShowActivationCodeInfo] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activationCodes, setActivationCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // State to handle dialog visibility

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  
  // Function to check if the search term matches any field in the code object

  const filteredCodes = activationCodes.filter((code) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      code.chassisNumber?.toLowerCase().includes(searchTermLower) ||
      code.dealerCode?.toLowerCase().includes(searchTermLower) ||
      code.name?.toLowerCase().includes(searchTermLower) ||
      code.mobileNumber?.toLowerCase().includes(searchTermLower) ||
      code.emailId?.toLowerCase().includes(searchTermLower) ||
      code.address?.toLowerCase().includes(searchTermLower) ||
      code.pincode?.toString().toLowerCase().includes(searchTermLower) || // Ensure numbers are converted to string
      code.state?.toLowerCase().includes(searchTermLower) ||
      code.dist?.toLowerCase().includes(searchTermLower)
    );
  });
  

  const fetchActivationCodes = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (dealerCode && dealerCode.length >= 7) {
        const response = await axios.get(getApiUrl(`/CustomerTable?dealerCode=${dealerCode}`));
        if (response.status === 200) {
          setActivationCodes(response.data);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } else {
        console.error("Dealer code must be at least 7 characters long");
      }
    } catch (error) {
      console.error("Error fetching activation codes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showActivationCodeInfo && dealerCode) {
      fetchActivationCodes();
    }
  }, [showActivationCodeInfo, dealerCode]);

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
        Dealer Customer Information
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setShowActivationCodeInfo((prev) => !prev);
          if (!showActivationCodeInfo) fetchActivationCodes();
          setOpen(true); // Open the dialog
        }}
        sx={{
          mt: 3,
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
        maxWidth="md"
      >
        <DialogTitle>
          Dealer Customer Information
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
              label="Search by chassis number..."
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
                        Chassis Number
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        Dealer Name | Dealer Code
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        Mobile Number
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        Email ID
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        Address
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        Pincode
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        State
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        District
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCodes.map((code) => (
                    <TableRow key={code.code || code.id}>
                      <TableCell align="center">{code.chassisNumber}</TableCell>
                      <TableCell align="center">{code.dealerCode}</TableCell>
                      <TableCell align="center">{code.name}</TableCell>
                      <TableCell align="center">{code.mobileNumber}</TableCell>
                      <TableCell align="center">{code.emailId}</TableCell>
                      <TableCell align="center">{code.address}</TableCell>
                      <TableCell align="center">{code.pincode}</TableCell>
                      <TableCell align="center">{code.state}</TableCell>
                      <TableCell align="center">{code.dist}</TableCell>
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