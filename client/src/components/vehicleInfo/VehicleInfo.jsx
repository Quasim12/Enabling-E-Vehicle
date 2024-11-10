import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormHelperText,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

// Function to determine the API URL based on the environment
const getApiUrl = (endpoint) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.enablingev.com"
      : "http://localhost:5001";
  return `${baseUrl}${endpoint}`;
};

export const VehicleInfo = () => {
  const [dealerCode, setDealerCode] = useState("");
  const [open, setOpen] = useState(false);
  const [chassisMid1, setChassisMid1] = useState("");
  const [chassisMid2, setChassisMid2] = useState("");
  const fixedPart1 = "ME9EBCR";
  const fixedPart2 = "H268";
  const chassisNumber = `${fixedPart1}${chassisMid1}${fixedPart2}${chassisMid2}`;

  const [dealerOptions, setDealerOptions] = useState([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedBatteryVolt, setSelectedBatteryVolt] = useState("");
  const [selectedBatteryCompany, setSelectedBatteryCompany] = useState("");
  const [selectedBatteryAH, setSelectedBatteryAH] = useState("");
  const [selectedBatteryWarIM, setSelectedBatteryWarIM] = useState("");
  const [selectedCharger, setSelectedCharger] = useState("");

  // Error states
  const [errors, setErrors] = useState({});

  const bodyTypeOptions = ["SS", "MS"];
  const colorOptions = ["RED", "BLUE", "SKY BLUE", "SEA GREEN", "GRAY"];
  const modelOptions = ["F1", "F2", "JIO FINE"];
  const batteryVoltOptions = ["48", "60"];
  const batteryCompanyOptions = ["EASTMAN", "LEADER", "LIV GUARD"];
  const batteryAHOptions = ["130", "135", "140", "145", "150"];
  const batteryWarIMOptions = ["12", "15", "18", "24"];
  const chargerOptions = ["UTL", "EASTMAN", "LIV GUARD"];

  const validateInputs = () => {
    const newErrors = {};

    if (!dealerCode) newErrors.dealerCode = "Dealer code is required.";
    if (chassisMid1.length < 3) newErrors.chassisMid1 = "First part of chassis number must be 3 characters.";
    if (chassisMid2.length < 3) newErrors.chassisMid2 = "Second part of chassis number must be 3 characters.";
    if (!selectedBodyTypes) newErrors.selectedBodyTypes = "Body type is required.";
    if (!selectedColor) newErrors.selectedColor = "Color is required.";
    if (!selectedModel) newErrors.selectedModel = "Model is required.";
    if (!selectedBatteryVolt) newErrors.selectedBatteryVolt = "Battery volt is required.";
    if (!selectedBatteryCompany) newErrors.selectedBatteryCompany = "Battery company is required.";
    if (!selectedBatteryAH) newErrors.selectedBatteryAH = "Battery AH is required.";
    if (!selectedBatteryWarIM) newErrors.selectedBatteryWarIM = "Battery warranty is required.";
    if (!selectedCharger) newErrors.selectedCharger = "Charger is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChassisInput = (setter) => (e) => {
    const value = e.target.value.toUpperCase(); // Convert to uppercase
    setter(value);
    if (value.length >= 3) {
      setErrors((prev) => ({ ...prev, [setter.name]: "" })); // Clear error message
    }
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      // alert("Please correct the errors.");
      return;
    }

    const vehicleData = {
      dealerNameDealerCode: dealerCode,
      chassisNumber,
      bodyType: selectedBodyTypes,
      color: selectedColor,
      model: selectedModel,
      batteryVolt: selectedBatteryVolt,
      batteryCompany: selectedBatteryCompany,
      batteryAH: selectedBatteryAH,
      batteryWarranty: selectedBatteryWarIM,
      charger: selectedCharger,
    };

    try {
      const response = await axios.post(
        getApiUrl("/VehicleTable"),
        vehicleData
      );
      if (response.status === 201) {
        console.log("Vehicle data submitted successfully:", response.data);
        handleClose();
      }
    } catch (error) {
      console.error("Error submitting vehicle data:", error);
      alert("Please Fill Correct Chassis Number Make Sure Chassis Number is Unique Or Not Duplicate");
    }
  };

  useEffect(() => {
    const fetchDealerData = async () => {
      try {
        const response = await axios.get(getApiUrl("/dealer"));
        const dealers = response.data;
        const options = dealers.map((dealer) => ({
          dealerName: dealer.name,
          dealerCode: dealer.dealerCode,
        }));
        setDealerOptions(options);
      } catch (error) {
        console.error("Failed to fetch dealer data:", error);
      }
    };

    fetchDealerData();
  }, []);

  const handleClose = () => {
    setOpen(false);
    // Reset form data
    setDealerCode("");
    setChassisMid1("");
    setChassisMid2("");
    setSelectedBodyTypes("");
    setSelectedColor("");
    setSelectedModel("");
    setSelectedBatteryVolt("");
    setSelectedBatteryCompany("");
    setSelectedBatteryAH("");
    setSelectedBatteryWarIM("");
    setSelectedCharger("");
    setErrors({});
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
        Vehicle Information
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
          Vehicle Information
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
                mb: 2,
              }}
            >
              <FormControl fullWidth sx={{ marginBottom: "10px" }} error={!!errors.dealerCode}>
                <InputLabel>Dealer Name | Code</InputLabel>
                <Select
                  label="Dealer Name | Code"
                  value={dealerCode}
                  onChange={(e) => {
                    setDealerCode(e.target.value);
                    if (e.target.value) {
                      setErrors((prev) => ({ ...prev, dealerCode: "" })); // Clear error message
                    }
                  }}
                  sx={{ borderRadius: "8px", backgroundColor: "#fff" }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  {dealerOptions.map((option, index) => (
                    <MenuItem
                      key={index}
                      value={`${option.dealerName} | ${option.dealerCode}`}
                    >
                      {`${option.dealerName} | ${option.dealerCode}`}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.dealerCode}</FormHelperText>
              </FormControl>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Enter Chassis No :
                </Typography>
                <Typography sx={{ marginLeft: "10px" }}>
                  {fixedPart1}
                </Typography>
                <Box
                  component="input"
                  type="text"
                  maxLength={3}
                  onInput={(e) => {
                    const value = e.target.value.slice(0, 3).toUpperCase();
                    setChassisMid1(value);
                    if (value.length > 0) {
                      setErrors((prev) => ({ ...prev, chassisMid1: "" })); // Clear error message
                    }
                  }}
                  sx={{
                    border: "none",
                    borderBottom: "1px solid #000",
                    width: "40px",
                    textAlign: "center",
                    marginRight: "10px",
                    fontFamily: "roboto",
                    outline: "none",
                    fontSize: "18px",
                    "&:focus": {
                      borderBottom: "1px solid #000",
                    },
                  }}
                  value={chassisMid1}
                />
                <Typography>{fixedPart2}</Typography>
                <Box
                  component="input"
                  type="text"
                  maxLength={3}
                  onInput={(e) => {
                    const value = e.target.value.slice(0, 3).toUpperCase();
                    setChassisMid2(value);
                    if (value.length > 0) {
                      setErrors((prev) => ({ ...prev, chassisMid2: "" })); // Clear error message
                    }
                  }}
                  sx={{
                    border: "none",
                    borderBottom: "1px solid #000",
                    width: "40px",
                    textAlign: "center",
                    marginRight: "10px",
                    fontFamily: "roboto",
                    outline: "none",
                    fontSize: "18px",
                    "&:focus": {
                      borderBottom: "1px solid #000",
                    },
                  }}
                  value={chassisMid2}
                />
              </Box>
              <FormHelperText error>{errors.chassisMid1 || errors.chassisMid2}</FormHelperText>
            </Box>

            {/* Remaining Form Controls with Validation Messages */}
            <FormControl fullWidth sx={{ marginBottom: "15px", marginTop: "25px" }} error={!!errors.selectedBodyTypes}>
              <InputLabel>Body Type</InputLabel>
              <Select
                label="Body Type"
                value={selectedBodyTypes}
                onChange={(e) => {
                  setSelectedBodyTypes(e.target.value);
                  if (e.target.value) setErrors((prev) => ({ ...prev, selectedBodyTypes: "" })); // Clear error message
                }}
                sx={{ borderRadius: "8px", backgroundColor: "#fff" }}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {bodyTypeOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.selectedBodyTypes}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: "15px" }} error={!!errors.selectedColor}>
              <InputLabel>Color</InputLabel>
              <Select
                label="Color"
                value={selectedColor}
                onChange={(e) => {
                  setSelectedColor(e.target.value);
                  if (e.target.value) setErrors((prev) => ({ ...prev, selectedColor: "" })); // Clear error message
                }}
                sx={{ borderRadius: "8px", backgroundColor: "#fff" }}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {colorOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.selectedColor}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: "15px" }} error={!!errors.selectedModel}>
              <InputLabel>Model</InputLabel>
              <Select
                label="Model"
                value={selectedModel}
                onChange={(e) => {
                  setSelectedModel(e.target.value);
                  if (e.target.value) setErrors((prev) => ({ ...prev, selectedModel: "" })); // Clear error message
                }}
                sx={{ borderRadius: "8px", backgroundColor: "#fff" }}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {modelOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.selectedModel}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: "15px" }} error={!!errors.selectedBatteryVolt}>
              <InputLabel>Battery Volt</InputLabel>
              <Select
                label="Battery Volt"
                value={selectedBatteryVolt}
                onChange={(e) => {
                  setSelectedBatteryVolt(e.target.value);
                  if (e.target.value) setErrors((prev) => ({ ...prev, selectedBatteryVolt: "" })); // Clear error message
                }}
                sx={{ borderRadius: "8px", backgroundColor: "#fff" }}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {batteryVoltOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.selectedBatteryVolt}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: "15px" }} error={!!errors.selectedBatteryCompany}>
              <InputLabel>Battery Company</InputLabel>
              <Select
                label="Battery Company"
                value={selectedBatteryCompany}
                onChange={(e) => {
                  setSelectedBatteryCompany(e.target.value);
                  if (e.target.value) setErrors((prev) => ({ ...prev, selectedBatteryCompany: "" })); // Clear error message
                }}
                sx={{ borderRadius: "8px", backgroundColor: "#fff" }}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {batteryCompanyOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.selectedBatteryCompany}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: "15px" }} error={!!errors.selectedBatteryAH}>
              <InputLabel>Battery AH</InputLabel>
              <Select
                label="Battery AH"
                value={selectedBatteryAH}
                onChange={(e) => {
                  setSelectedBatteryAH(e.target.value);
                  if (e.target.value) setErrors((prev) => ({ ...prev, selectedBatteryAH: "" })); // Clear error message
                }}
                sx={{ borderRadius: "8px", backgroundColor: "#fff" }}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {batteryAHOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.selectedBatteryAH}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: "15px" }} error={!!errors.selectedBatteryWarIM}>
              <InputLabel>Battery Warranty (Months)</InputLabel>
              <Select
                label="Battery Warranty (Months)"
                value={selectedBatteryWarIM}
                onChange={(e) => {
                  setSelectedBatteryWarIM(e.target.value);
                  if (e.target.value) setErrors((prev) => ({ ...prev, selectedBatteryWarIM: "" })); // Clear error message
                }}
                sx={{ borderRadius: "8px", backgroundColor: "#fff" }}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {batteryWarIMOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.selectedBatteryWarIM}</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: "15px" }} error={!!errors.selectedCharger}>
              <InputLabel>Charger</InputLabel>
              <Select
                label="Charger"
                value={selectedCharger}
                onChange={(e) => {
                  setSelectedCharger(e.target.value);
                  if (e.target.value) setErrors((prev) => ({ ...prev, selectedCharger: "" })); // Clear error message
                }}
                sx={{ borderRadius: "8px", backgroundColor: "#fff" }}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {chargerOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.selectedCharger}</FormHelperText>
            </FormControl>
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
              marginRight: 4.3,
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
