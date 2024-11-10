import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Function to determine the API URL based on the environment
const getApiUrl = (endpoint) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.enablingev.com"
      : "http://localhost:5001";
  return `${baseUrl}${endpoint}`;
};

export const CustomerForm = () => {
  const [chassisMid1, setChassisMid1] = useState("");
  const [chassisMid2, setChassisMid2] = useState("");
  const [open, setOpen] = useState(false);
  const [isChassisValid, setIsChassisValid] = useState(true);
  const fixedPart1 = "ME9EBCR";
  const fixedPart2 = "H268";
  const [formData, setFormData] = useState({
    chassisNumber: "",
    dealerCode: "",
    name: "",
    mobileNumber: "",
    emailId: "",
    address: "",
    pincode: "",
    state: "",
    dist: "",
  });
  const [errors, setErrors] = useState({});
  const [counter, setCounter] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const storedCounter = localStorage.getItem("counter");
    if (storedCounter) {
      setCounter(parseInt(storedCounter, 10));
    }
    window.scrollTo(0, 0);
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error message for the changed field
    }));
  };

  const validateChassisNumber = async (chassisNumber) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        getApiUrl("/VehicleTable/chassis-validate"),
        { chassisNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the chassis validity state based on the response
      setIsChassisValid(response.data.exists);
      return response.data.exists; // Return the validity status
    } catch (error) {
      console.error(
        "Error validating chassis number:",
        error.response ? error.response.data : error
      );
      setIsChassisValid(false);
      return false; // Return false if an error occurs
    }
  };

  const validate = () => {
    const tempErrors = {};
    const mobilePattern = /^[6-9]\d{9}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) tempErrors.name = "This field is required.";
    if (!formData.mobileNumber) {
      tempErrors.mobileNumber = "This field is required.";
    } else if (!mobilePattern.test(formData.mobileNumber)) {
      tempErrors.mobileNumber = "Invalid mobile number.";
    }
    if (!formData.emailId) {
      tempErrors.emailId = "This field is required.";
    } else if (!emailPattern.test(formData.emailId)) {
      tempErrors.emailId = "Invalid email address.";
    }
    if (!formData.address) tempErrors.address = "This field is required.";
    if (!formData.state) tempErrors.state = "This field is required.";
    if (!formData.dist) tempErrors.dist = "This field is required.";
    if (!formData.pincode) tempErrors.pincode = "This field is required.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the chassis number
    const chassisNumber = `${fixedPart1}${chassisMid1}${fixedPart2}${chassisMid2}`.toUpperCase();

    // Validate the form fields first
    if (!validate()) {
      return; // Stop submission if form validation fails
    }

    // Validate chassis number after form fields are validated
    const isValidChassis = await validateChassisNumber(chassisNumber);

    // Check if the chassis number is valid
    if (!isValidChassis) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        chassisNumber: "Invalid or already registered chassis number.",
      }));
      alert("Invalid or already registered chassis number.");
      return; // Stop submission if chassis number is invalid
    }

    // No errors, proceed to submit form
    try {
      const dealerResponse = await axios.get(
        getApiUrl(`/VehicleTable/dealerCode?chassisNumber=${chassisNumber}`)
      );

      if (dealerResponse.status === 200) {
        const { dealerNameDealerCode } = dealerResponse.data;

        const payload = {
          ...formData,
          chassisNumber,
          dealerCode: dealerNameDealerCode,
        };

        const customerResponse = await axios.post(
          getApiUrl("/CustomerTable"),
          payload
        );

        if (customerResponse.status === 201) {
          setIsSubmitted(true);
          resetForm();  // Clear the form
          handleClose(); // Close dialog
        }
      } else {
        alert("Dealer information not found for this chassis number.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form.");
    }
  };

  const handleChassisMid1Change = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "").slice(0, 3).toUpperCase(); // Allow only numbers, limit to 3 digits, and convert to uppercase
    setChassisMid1(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      chassisNumber: "", // Clear the error message for chassis number
    }));
  };

  const handleChassisMid2Change = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "").slice(0, 3).toUpperCase(); // Allow only numbers, limit to 3 digits, and convert to uppercase
    setChassisMid2(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      chassisNumber: "", // Clear the error message for chassis number
    }));
  };

  const handleMobileChange = (e) => {
    const { value } = e.target;
    if (/^[0-9]*$/.test(value) && value.length <= 10) {
      setFormData((prevData) => ({
        ...prevData,
        mobileNumber: value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobileNumber: "", // Clear the error message for mobile number
      }));
    }
  };

  const handlePinCodeChange = async (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        pincode: value, // Corrected consistent field name
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        pincode: "", // Clear the error message for pin code
      }));
      if (value.length === 6) {
        try {
          const response = await axios.get(
            `https://api.postalpincode.in/pincode/${value}`
          );
          if (response.data[0].Status === "Success") {
            const { State, District } = response.data[0].PostOffice[0];
            setFormData((prevData) => ({
              ...prevData,
              state: State,
              dist: District,
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              pincode: "Invalid pin code.", // Consistent field name in error handling
            }));
          }
        } catch (error) {
          console.error("Error fetching location details:", error);
          setErrors((prevErrors) => ({
            ...prevErrors,
            pincode: "Error fetching location details.", // Consistent field name
          }));
        }
      }
    }
  };

  const resetForm = () => {
    setFormData({
      chassisNumber: "",
      dealerCode: "",
      name: "",
      mobileNumber: "",
      emailId: "",
      address: "",
      pincode: "",
      state: "",
      dist: "",
    });
    setChassisMid1("");
    setChassisMid2("");
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      <Typography
        variant="h4"
        sx={{
          color: "#3f51b5",
          textAlign: "center",
          textDecoration: "underline",
          fontFamily: "Roboto",
          fontWeight: "bold",
        }}
      >
        Customer Form
      </Typography>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
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
        maxWidth="xs" // Reduced width
      >
        <DialogTitle>
          Customer Form
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
          <Box
            component="form"
            noValidate
            autoComplete="off"
            key={isSubmitted ? "submitted" : "notSubmitted"}
            onSubmit={handleSubmit}
          >
            <Box sx={{ mt: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 2,
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ mb: 0.5 }} >Chassis Number:</Typography>
                <Typography sx={{ marginLeft: "10px" }}>
                  {fixedPart1}
                </Typography>

                <Box
                  component="input"
                  type="text"
                  maxLength={3} // Limit to 3 characters
                  onInput={handleChassisMid1Change}
                  sx={{
                    border: "none", // Remove rectangle box
                    borderBottom: "1px solid #000", // Only bottom border
                    width: "40px",
                    textAlign: "center",
                    marginRight: "10px",
                    fontFamily: "roboto",
                    outline: "none",
                    fontSize:"18px",
                    "&:focus": {
                      borderBottom: "1px solid #000", // Keep bottom border on focus
                    },
                  }}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, "").toUpperCase(); // Allow alphanumeric and special characters, convert to uppercase
                    setChassisMid1(value);
                  }}
                  value={chassisMid1} // Controlled input
                />

                <Typography>{fixedPart2}</Typography>

                <Box
                  component="input"
                  type="text"
                  maxLength={3} // Limit to 3 characters
                  onInput={handleChassisMid2Change}
                  sx={{
                    border: "none", // Remove rectangle box
                    borderBottom: "1px solid #000", // Only bottom border
                    width: "40px",
                    textAlign: "center",
                    fontFamily: "roboto",
                    outline: "none",
                    fontSize:"18px",
                    "&:focus": {
                      borderBottom: "1px solid #000", // Keep bottom border on focus
                    },
                  }}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, "").toUpperCase(); // Allow alphanumeric and special characters, convert to uppercase
                    setChassisMid2(value);
                  }}
                  value={chassisMid2} // Controlled input
                />
              </Box>
            </Box>

            {/* Name Field */}
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#888" },
                  "&.Mui-focused fieldset": { borderColor: "#28a745" },
                },
              }}
            />

            {/* Mobile Number Field */}
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleMobileChange}
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#888" },
                  "&.Mui-focused fieldset": { borderColor: "#28a745" },
                },
              }}
            />

            {/* Email Field */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              error={!!errors.emailId}
              helperText={errors.emailId}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#888" },
                  "&.Mui-focused fieldset": { borderColor: "#28a745" },
                },
              }}
            />

            {/* Address Field */}
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#888" },
                  "&.Mui-focused fieldset": { borderColor: "#28a745" },
                },
              }}
            />

            {/* Pin Code Field */}
            <TextField
              label="Pin Code"
              variant="outlined"
              fullWidth
              margin="normal"
              name="pincode"
              value={formData.pincode}
              onChange={handlePinCodeChange}
              error={!!errors.pincode}
              helperText={errors.pincode}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#888" },
                  "&.Mui-focused fieldset": { borderColor: "#28a745" },
                },
              }}
            />

            {/* State Field */}
            <TextField
              label="State"
              variant="outlined"
              fullWidth
              margin="normal"
              name="state"
              value={formData.state}
              onChange={handleChange}
              error={!!errors.state}
              helperText={errors.state}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#888" },
                  "&.Mui-focused fieldset": { borderColor: "#28a745" },
                },
              }}
            />

            {/* District Field */}
            <TextField
              label="District"
              variant="outlined"
              fullWidth
              margin="normal"
              name="dist"
              value={formData.dist}
              onChange={handleChange}
              error={!!errors.dist}
              helperText={errors.dist}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#888" },
                  "&.Mui-focused fieldset": { borderColor: "#28a745" },
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              padding: "12px 24px",
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              color: "white",
              marginRight: 4.3, // Add margin from the right
              "&:hover": {
                background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
              },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};