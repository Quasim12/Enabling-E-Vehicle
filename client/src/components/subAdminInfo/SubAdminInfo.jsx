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
  IconButton,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

const getApiUrl = (endpoint) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.enablingev.com"
      : "http://localhost:5001";
  return `${baseUrl}${endpoint}`;
};

export const SubAdminInfo = ({ showDeleteButton = true, showLabel = true }) => {
  const location = useLocation();
  const userId = location.state?.userId; // Retrieve userId from location state

  const [showActivationCodeInfo, setShowActivationCodeInfo] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activationCodes, setActivationCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const matchesSearchTerm = (code) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      code.fullName?.toLowerCase().includes(searchValue) ||
      code.mobileNumber?.toLowerCase().includes(searchValue) ||
      code.email?.toLowerCase().includes(searchValue) ||
      code.address?.toLowerCase().includes(searchValue) ||
      code.city?.toLowerCase().includes(searchValue) ||
      code.district?.toLowerCase().includes(searchValue) ||
      code.pincode?.toLowerCase().includes(searchValue) ||
      code.state?.toLowerCase().includes(searchValue) ||
      code.userId?.toLowerCase().includes(searchValue)
    );
  };

  const filteredCodes = activationCodes.filter(matchesSearchTerm);

  const fetchActivationCodes = async () => {
    if (loading) return;
    setLoading(true);
    try {
      let endpoint;
      let response;

      if (userId) {
        // Fetch specific user data
        endpoint = `/CreateProfile?userId=${userId}`;
        response = await axios.get(getApiUrl(endpoint));

        if (response.status === 200) {
          setActivationCodes(response.data);
          console.log("Fetched specific user data:", response.data);
        }
      } else {
        // Fetch all profiles for admin
        endpoint = `/CreateProfile/all`;
        response = await axios.get(getApiUrl(endpoint));

        if (response.status === 200) {
          setActivationCodes(response.data);
          console.log("Fetched all profiles for admin:", response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching activation codes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showActivationCodeInfo) {
      fetchActivationCodes(); // Fetch codes when showing info
    }
  }, [showActivationCodeInfo]);

  const handleDelete = async (codeToDelete) => {
    try {
      await axios.delete(
        getApiUrl(`/CreateProfile/${encodeURIComponent(codeToDelete)}`)
      );
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
        Subadmin Information
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          if (!showActivationCodeInfo) {
            setShowActivationCodeInfo(true);
            fetchActivationCodes(); // Fetch codes only when showing info
          }
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
          Subadmin Information
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
                      <Typography fontSize={15} fontWeight="bold">
                        Full Name
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
                        City
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        District
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
                        UserId
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={15} fontWeight="bold">
                        Password
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
                      <TableCell align="center">{code.fullName}</TableCell>
                      <TableCell align="center">{code.mobileNumber}</TableCell>
                      <TableCell align="center">{code.email}</TableCell>
                      <TableCell align="center">{code.address}</TableCell>
                      <TableCell align="center">{code.city}</TableCell>
                      <TableCell align="center">{code.district}</TableCell>
                      <TableCell align="center">{code.pincode}</TableCell>
                      <TableCell align="center">{code.state}</TableCell>
                      <TableCell align="center">{code.userId}</TableCell>
                      <TableCell align="center">{code.password}</TableCell>

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
                            onClick={() => handleDelete(code.id)}
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
