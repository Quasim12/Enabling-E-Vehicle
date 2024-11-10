import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, TextField, Button, Typography, Box, Paper } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

// Fix for marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Function to determine the API URL based on the environment
const getApiUrl = (endpoint) => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://api.enablingev.com' 
    : 'http://localhost:5001';
  return `${baseUrl}${endpoint}`;
};

const SetViewOnMount = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 13);
  }, [map, coords]);
  return null;
};

const generateCaptcha = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    pincode: "",
    captcha: "",
  });

  const [captchaError, setCaptchaError] = useState(false);
  const [generatedCaptcha, setGeneratedCaptcha] = useState(generateCaptcha());

  useEffect(() => {
    const interval = setInterval(() => {
      setGeneratedCaptcha(generateCaptcha());
    }, 60000); // Update captcha every 1 minute

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      e.target.value = value.replace(/[^a-zA-Z\s]/g, "");
    } else if (name === "contact") {
      e.target.value = value.replace(/[^0-9]/g, "").slice(0, 10);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.captcha !== generatedCaptcha) {
      setCaptchaError(true);
    } else {
      setCaptchaError(false);
      try {
        const response = await axios.post(getApiUrl('/contact'), formData);
        console.log("Form submitted", response.data);
        // Redirect to home page
        window.location.href = "/";
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  const fetchLocationData = async (pincode) => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = response.data[0];
      if (data.Status === "Success") {
        const { State, District } = data.PostOffice[0];
        setFormData((prevData) => ({
          ...prevData,
          state: State,
          district: District,
        }));
      } else {
        console.error("Invalid Pincode");
      }
    } catch (error) {
      console.error("Error fetching location data", error);
    }
  };

  useEffect(() => {
    if (formData.pincode.length === 6) {
      fetchLocationData(formData.pincode);
    }
  }, [formData.pincode]);

  const officeLocations = [
    {
      coords: [28.6692, 77.4538],
      address: "10A/21, Vasundhara, Ghaziabad, Uttar Pradesh (201012)",
    },
    {
      coords: [28.6762, 77.4126],
      address:
        "3/1/11, Site 4, Sahibabad Industrial Area, Ghaziabad, Uttar Pradesh (201012)",
    },
    {
      coords: [25.611, 85.104],
      address:
        "Alam Plaza, Opposite Bharat Petrol Pump, Beside St. Xavier's College Gate no. 2, Digha Ashiana Road Digha Patna Bihar (800011)",
    },
  ];

  const mixedColorTextStyle = {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 4, backgroundColor: "#f0f2f5" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              background: "linear-gradient(135deg, #ece9e6, #ffffff)",
              border: "1px solid #ddd",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                ...mixedColorTextStyle,
                fontSize: "38px",
                fontFamily: "Roboto",
                borderBottom: "3px solid #ddd",
              }}
            >
              Company Details
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <LocationOnIcon sx={{ marginRight: 1, color: "#1976d2" }} />
              <Typography>
                <strong>Reg. Office Address:</strong> 10A/21, Vasundhara,
                Ghaziabad, Uttar Pradesh (201012),
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <LocationOnIcon sx={{ marginRight: 1, color: "#1976d2" }} />
              <Typography>
                <strong>Factory Address:</strong> 3/1/11, Site 4, Sahibabad
                Industrial Area, Ghaziabad, Uttar Pradesh (201012),
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <LocationOnIcon sx={{ marginRight: 1, color: "#1976d2" }} />
              <Typography>
                <strong>Bihar Office Address:</strong> Alam Plaza, Opposite
                Bharat Petrol Pump,
                <br />
                Beside St. Xavier's College Gate no. 2,
                <br />
                Digha Ashiana Road Digha Patna Bihar (800011)
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <PhoneIcon sx={{ marginRight: 1, color: "#1976d2" }} />
              <Typography>
                <strong>Mobile No:</strong> +91 9334616939, +91 9911713590
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <EmailIcon sx={{ marginRight: 1, color: "#1976d2" }} />
              <Typography>
                <strong>Email:</strong> enablingev@gmail.com
              </Typography>
            </Box>
            <MapContainer
              center={officeLocations[0].coords}
              zoom={1}
              style={{ height: "313px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {officeLocations.map((office, index) => (
                <Marker key={index} position={office.coords}>
                  <Popup>{office.address}</Popup>
                </Marker>
              ))}
              <SetViewOnMount coords={officeLocations[0].coords} />
            </MapContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              background: "linear-gradient(135deg, #ece9e6, #ffffff)",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                ...mixedColorTextStyle,
                fontSize: "38px",
                fontFamily: "Roboto",
                borderBottom: "3px solid #ddd",
              }}
            >
              Contact Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onInput={handleInput}
                placeholder="Enter your name (letters and spaces only)"
                sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email (e.g., example@example.com)"
                sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                onInput={handleInput}
                placeholder="Enter your contact number (10 digits)"
                sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter your pincode"
                sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Captcha"
                name="captcha"
                value={formData.captcha}
                onChange={handleChange}
                placeholder="Enter the captcha"
                sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
              />
              {captchaError && (
                <Typography color="error" variant="body2">
                  Captcha does not match.
                </Typography>
              )}
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Generated Captcha: {generatedCaptcha}
              </Typography>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  marginTop: 2,
                  background:
                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  },
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
                  transition: "background-color 0.3s, transform 0.3s",
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                }}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};