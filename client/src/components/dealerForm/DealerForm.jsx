import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

// Function to determine the API URL based on the environment
const getApiUrl = (endpoint) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.enablingev.com"
      : "http://localhost:5001";
  return `${baseUrl}${endpoint}`;
};

export const DealerForm = () => {
  const [counter, setCounter] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const storedCounter = localStorage.getItem("counter");
    if (storedCounter) {
      setCounter(parseInt(storedCounter, 10));
    }
  }, []);

  const [formData, setFormData] = useState({
    activationCode: "",
    name: "",
    mobileNo: "",
    emailId: "",
    gstin: "",
    address: "",
    state: "",
    dist: "",
    pinCode: "",
    rtoOffice: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error for the specific field
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    let tempErrors = {};
    const gstinPattern = /^[0-9A-Z]{15}$/; // Updated pattern
    const mobilePattern = /^[6-9]\d{9}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    tempErrors.activationCode = formData.activationCode
      ? ""
      : "This field is required.";
    tempErrors.name = formData.name ? "" : "This field is required.";
    tempErrors.mobileNo = formData.mobileNo
      ? mobilePattern.test(formData.mobileNo)
        ? ""
        : "Invalid mobile number."
      : "This field is required.";
    tempErrors.emailId = formData.emailId
      ? emailPattern.test(formData.emailId)
        ? ""
        : "Invalid email address."
      : "This field is required.";
    tempErrors.gstin = formData.gstin
      ? gstinPattern.test(formData.gstin)
        ? ""
        : "Invalid GSTIN."
      : "This field is required.";
    tempErrors.address = formData.address ? "" : "This field is required.";
    tempErrors.state = formData.state ? "" : "This field is required.";
    tempErrors.dist = formData.dist ? "" : "This field is required.";
    tempErrors.pinCode = formData.pinCode ? "" : "This field is required.";
    tempErrors.rtoOffice = formData.rtoOffice ? "" : "This field is required.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const checkActivationCode = async (activationCode) => {
    try {
      const response = await axios.get(
        getApiUrl(`/ActivationCode/verify/${activationCode}`)
      );
      return response.data.isValid;
    } catch (error) {
      console.error("Error checking activation code:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before submitting
    if (validate()) {
      try {
        // Check if the activation code is valid
        const isActivationCodeValid = await checkActivationCode(
          formData.activationCode
        );
        if (!isActivationCodeValid) {
          setErrors({
            ...errors,
            activationCode: "Wrong activation code.",
          });
          return;
        }

        // Submit form data if activation code is valid
        const submitResponse = await axios.post(
          getApiUrl("/dealer/"),
          formData
        );

        // Check if submission was successful (status 201)
        if (submitResponse.status === 201) {
          // Reset form data after successful submission
          setFormData({
            activationCode: "",
            name: "",
            mobileNo: "",
            emailId: "",
            gstin: "",
            address: "",
            state: "",
            dist: "",
            pinCode: "",
            rtoOffice: "",
          });
          setErrors({});

          // Increment counter and store it in localStorage
          const newCounter = counter + 1;
          setCounter(newCounter);
          localStorage.setItem("counter", newCounter);

          // Indicate successful submission
          setIsSubmitted(true);

          // Access dealerCode from the response
          const dealerCode = submitResponse.data.dealerCode; // Assuming dealerCode is returned in the response

          // Navigate to the Document page with submitted data.
          navigate("/document", {
            state: {
              submittedData: {
                ...submitResponse.data,
                dealerCode, // Use the dealerCode from the response
                mobileNo: formData.mobileNo, // Storing mobileNo
              },
            },
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert(
          "There was an error submitting the form. Please try again later."
        );
      }
    }
  };

  const handleMobileKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
      setErrors({
        ...errors,
        mobileNo: "Enter Only Numbers",
      });
    } else {
      setErrors({
        ...errors,
        mobileNo: "",
      });
    }
  };

  const handleMobileChange = (e) => {
    const { value } = e.target;
    if (value.length <= 10) {
      setFormData({
        ...formData,
        mobileNo: value,
      });
      if (!/^[6-9]\d{0,9}$/.test(value)) {
        setErrors({
          ...errors,
          mobileNo: "Invalid mobile number.",
        });
      } else {
        setErrors({
          ...errors,
          mobileNo: "",
        });
      }
    }
  };

  const handlePinCodeChange = async (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData({
        ...formData,
        pinCode: value,
      });

      if (value.length === 6) {
        try {
          const response = await axios.get(
            `https://api.postalpincode.in/pincode/${value}`
          );
          if (response.data[0].Status === "Success") {
            const { State, District } = response.data[0].PostOffice[0];
            setFormData({
              ...formData,
              state: State,
              dist: District,
              pinCode: value,
            });
            setErrors({
              ...errors,
              pinCode: "",
            });
          } else {
            setErrors({
              ...errors,
              pinCode: "Invalid pin code.",
            });
          }
        } catch (error) {
          console.error("Error fetching location details:", error);
          setErrors({
            ...errors,
            pinCode: "Error fetching location details.",
          });
        }
      }
    }
  };

  const handlePinCodeKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
      setErrors({
        ...errors,
        pinCode: "Enter Only Numbers",
      });
    } else {
      setErrors({
        ...errors,
        pinCode: "",
      });
    }
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    const upperCaseValue = value.toUpperCase();
    if (/^[A-Z\s]*$/.test(upperCaseValue)) {
      setFormData({
        ...formData,
        name: upperCaseValue,
      });
      setErrors({
        ...errors,
        name: "",
      });
    } else {
      setErrors({
        ...errors,
        name: "Invalid Name",
      });
    }
  };

  const handleGstinChange = (e) => {
    const { value } = e.target;
    const upperCaseValue = value.toUpperCase();
    if (upperCaseValue.length <= 15 && /^[0-9A-Z]*$/.test(upperCaseValue)) {
      setFormData({
        ...formData,
        gstin: upperCaseValue,
      });
      setErrors({
        ...errors,
        gstin: "",
      });
    } else {
      setErrors({
        ...errors,
        gstin: "Invalid GSTIN. Must be 15 characters only",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      {isSubmitted ? (
        <Box mt={2}>
          <Typography variant="h4" component="h2" gutterBottom>
            Document Page Content
          </Typography>
          {/* Add your document page content here */}
        </Box>
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Typography
              variant="h3"
              fontFamily={"roboto"}
              component="h1"
              gutterBottom
              sx={{
                borderBottom: "3px solid #ccc",
                pb: 1,
              }}
            >
              Dealer Form
            </Typography>
          </Box>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            key={isSubmitted ? "submitted" : "notSubmitted"}
            sx={{
              border: "1px solid #ccc",
              padding: 3,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#f9f9f9",
              mt: 4,
              mb: 4,
            }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={3}>
              {[
                { label: "Activation Code", name: "activationCode" },
                { label: "Name", name: "name", onChange: handleNameChange },
                {
                  label: "Mobile No",
                  name: "mobileNo",
                  inputProps: {
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: 10,
                  },
                  onKeyPress: handleMobileKeyPress,
                  onChange: handleMobileChange,
                },
                { label: "Email Id", name: "emailId" },
                { label: "GSTIN", name: "gstin", onChange: handleGstinChange },
                { label: "Address", name: "address" },
                {
                  label: "PinCode",
                  name: "pinCode",
                  onChange: handlePinCodeChange,
                  onKeyPress: handlePinCodeKeyPress,
                },
                { label: "State", name: "state" },
                { label: "Dist", name: "dist" },
                { label: "RTO Office", name: "rtoOffice" },
              ].map((field, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <TextField
                    fullWidth
                    label={field.label}
                    name={field.name}
                    variant="outlined"
                    required
                    value={formData[field.name]}
                    onChange={field.onChange || handleChange}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]}
                    inputProps={field.inputProps}
                    onKeyPress={field.onKeyPress}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button
                  size="large"
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                  sx={{
                    mt: 2,
                    mb: 2,
                    background:
                      "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    color: "white",
                  }}
                >
                  Submit
                </Button>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ mt: 1, fontFamily: "roboto", fontSize: "1.2rem" }}
                >
                  <Link
                    to="/dealerLogin"
                    style={{ textDecoration: "none", color: "#3f51b5" }}
                  >
                    Already Have An Account ??
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Container>
  );
};