import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

// Function to determine the API URL based on the environment
const getApiUrl = (endpoint) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.enablingev.com"
      : "http://localhost:5001";
  return `${baseUrl}${endpoint}`;
};

export const CreateProfileSubAdmin = () => {
  const [open, setOpen] = useState(false); // State to handle dialog visibility
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    address: "",
    pincode: "",
    city: "",
    district: "",
    state: "",
    userId: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For mobile number: Allow only numeric values and limit to 10 digits
    if (name === "mobileNumber") {
      const onlyNums = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters

      // Allow numbers only up to 10 digits
      if (onlyNums.length <= 10) {
        setFormData({ ...formData, [name]: onlyNums });

        // Real-time validation for mobile number length and starting digit
        if (onlyNums.length === 10 && /^[6-9]/.test(onlyNums)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            mobileNumber: "", // Clear the error if input is valid
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            mobileNumber:
              "Mobile Number must be exactly 10 digits and start with a digit between 6-9",
          }));
        }
      }
    }
     // For pincode: Allow only numeric values and limit to 6 digits
  else if (name === 'pincode') {
    const onlyNums = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters

    if (onlyNums.length <= 6) {
      setFormData({ ...formData, [name]: onlyNums });

      // Real-time validation for pincode length
      if (onlyNums.length === 6) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          pincode: "", // Clear the error if input is valid
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          pincode: "Pin Code must be exactly 6 digits",
        }));
      }
    }
  }
    else {
      // For other fields
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation: cannot be empty
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    // Mobile Number validation: must be exactly 10 digits and only digits
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile Number is required";
    } else if (formData.mobileNumber.length < 10) {
      newErrors.mobileNumber = "Mobile Number must be exactly 10 digits";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile Number must start with 6, 7, 8, or 9";
    }

    const validTLDs = [
      "com",
      "org",
      "net",
      "co",
      "io",
      "gov",
      "edu",
      "info",
      "biz",
      "me",
      "us",
      "uk",
      "in",
      "ca",
      "de",
      "fr",
      "au",
      "jp",
      "cn",
      "ru",
      "it",
      "br",
      "za",
      "nl",
      "se",
      "no",
      "fi",
      "es",
      "pl",
      "ch",
      "at",
      "dk",
      "ie",
      "pt",
      "hk",
      "tw",
      "kr",
      "sg",
    ]; // Add more as needed

    // Email validation: must be in valid email format
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    } else {
      const tld = formData.email.split(".").pop();
      if (!validTLDs.includes(tld)) {
        newErrors.email = "Invalid email";
      }
    }
  
    // Address validation: cannot be empty
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    // Pincode validation: must be exactly 6 digits and only digits
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pin Code is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pin Code must be exactly 6 digits";
    }

    // City validation: cannot be empty
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // District validation: cannot be empty
    if (!formData.district.trim()) {
      newErrors.district = "District is required";
    }

    // State validation: cannot be empty
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    // UserId validation: cannot be empty
    if (!formData.userId.trim()) {
      newErrors.userId = "userId is required";
    }
    // Password validation: cannot be empty
    if (!formData.password.trim()) {
      newErrors.password = "password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const payload = {
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        address: formData.address,
        pincode: formData.pincode,
        city: formData.city,
        district: formData.district,
        state: formData.state,
        userId: formData.userId,
        password: formData.password,
      };

      try {
        const url = getApiUrl("/CreateProfile");
        const response = await axios.post(url, payload);
        console.log("Profile created successfully:", response.data);
        handleClose(); // Reset form data and close dialog upon successful submission
      } catch (error) {
        console.error("Error submitting profile:", error);
        if (error.response) {
          setSubmitError(
            error.response.data.error ||
              "Failed to create profile. Please try again."
          );
        } else {
          setSubmitError("An unexpected error occurred. Please try again.");
        }
      }
    } else {
      setErrors(newErrors);
      setSubmitError("");
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form data
    setFormData({
      fullName: "",
      mobileNumber: "",
      email: "",
      address: "",
      pincode: "",
      city: "",
      district: "",
      state: "",
      userId: "",
      password: "",
    });
    setErrors({});
    setSubmitError("");
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
        Create Profile SubAdmin
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
          Create Profile
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
            onSubmit={handleSubmit}
            sx={{
              width: "90%",
              maxWidth: "500px",
              padding: "10px",
              bgcolor: "white",
              borderRadius: 2,
              margin: "auto",
            }}
          >
            <TextField
              label="Full Name*"
              name="fullName"
              fullWidth
              margin="normal"
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
            <TextField
              label="Mobile Number*"
              name="mobileNumber"
              fullWidth
              margin="normal"
              value={formData.mobileNumber}
              onChange={handleChange}
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber}
              inputProps={{
                maxLength: 10, // Restrict input to 10 digits
                pattern: "[0-9]*", // Allow only numeric input
              }}
            />
            <TextField
              label="Email*"
              name="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Address*"
              name="address"
              fullWidth
              margin="normal"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
            />
            <TextField
              label="City*"
              name="city"
              fullWidth
              margin="normal"
              value={formData.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
            />
            <TextField
              label="District*"
              name="district"
              fullWidth
              margin="normal"
              value={formData.district}
              onChange={handleChange}
              error={!!errors.district}
              helperText={errors.district}
            />
            <TextField
              label="State*"
              name="state"
              fullWidth
              margin="normal"
              value={formData.state}
              onChange={handleChange}
              error={!!errors.state}
              helperText={errors.state}
            />
            <TextField
              label="Pin Code*"
              name="pincode"
              fullWidth
              margin="normal"
              value={formData.pincode}
              onChange={handleChange}
              error={!!errors.pincode}
              helperText={errors.pincode}
              inputProps={{
                maxLength: 6, // Restrict input to 06 digits
                pattern: "[0-9]*", // Allow only numeric input
              }}
            />
            <TextField
              label="UserId*"
              name="userId"
              fullWidth
              margin="normal"
              value={formData.userId}
              onChange={handleChange}
              error={!!errors.userId}
              helperText={errors.userId}
            />
            <TextField
              label="Password*"
              name="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            {submitError && (
              <Typography color="error">{submitError}</Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            sx={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              padding: "8px 20px",
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
