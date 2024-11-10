import React, { useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"; // Import the arrow icon

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 6,
        background: "linear-gradient(to right, #3f51b5, #1a237e)",
        textAlign: "left",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              ENABLING E-VEHICLES
            </Typography>
            <Typography variant="body2">
              © 2023 Company Name. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Our Company
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                p: 1,
                "&:hover": { color: "#ffeb3b" },
              }}
              onClick={() => navigate("/")}
            >
              <ArrowForwardIosIcon
                fontSize="small"
                sx={{ mr: 1, transition: "transform 0.3s" }}
              />
              <Link
                color="inherit"
                underline="hover"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": { color: "#ffeb3b" },
                }}
              >
                Home
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                p: 1,
                "&:hover": { color: "#ffeb3b" },
              }}
              onClick={() => navigate("/about")}
            >
              <ArrowForwardIosIcon
                fontSize="small"
                sx={{ mr: 1, transition: "transform 0.3s" }}
              />
              <Link
                color="inherit"
                underline="hover"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": { color: "#ffeb3b" },
                }}
              >
                About
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                p: 1,
                "&:hover": { color: "#ffeb3b" },
              }}
              onClick={() => navigate("/products")}
            >
              <ArrowForwardIosIcon
                fontSize="small"
                sx={{ mr: 1, transition: "transform 0.3s" }}
              />
              <Link
                color="inherit"
                underline="hover"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": { color: "#ffeb3b" },
                }}
              >
                Products
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                "&:hover": { color: "#ffeb3b" },
              }}
              onClick={() => navigate("/contact")}
            >
              <ArrowForwardIosIcon
                fontSize="small"
                sx={{ mr: 1, transition: "transform 0.3s" }}
              />
              <Link
                color="inherit"
                underline="hover"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": { color: "#ffeb3b" },
                }}
              >
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Explore More
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                p: 1,
                "&:hover": { color: "#ffeb3b" },
              }}
              onClick={() => navigate("/blog")}
            >
              <ArrowForwardIosIcon
                fontSize="small"
                sx={{ mr: 1, transition: "transform 0.3s" }}
              />
              <Link
                color="inherit"
                underline="hover"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": { color: "#ffeb3b" },
                }}
              >
                Blog
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                p: 1,
                "&:hover": { color: "#ffeb3b" },
              }}
              onClick={() => navigate("/careers")}
            >
              <ArrowForwardIosIcon
                fontSize="small"
                sx={{ mr: 1, transition: "transform 0.3s" }}
              />
              <Link
                color="inherit"
                underline="hover"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": { color: "#ffeb3b" },
                }}
              >
                Careers
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                p: 1,
                "&:hover": { color: "#ffeb3b" },
              }}
              onClick={() => navigate("/faq")}
            >
              <ArrowForwardIosIcon
                fontSize="small"
                sx={{ mr: 1, transition: "transform 0.3s" }}
              />
              <Link
                color="inherit"
                underline="hover"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": { color: "#ffeb3b" },
                }}
              >
                FAQ
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                "&:hover": { color: "#ffeb3b" },
              }}
              onClick={() => navigate("/support")}
            >
              <ArrowForwardIosIcon
                fontSize="small"
                sx={{ mr: 1, transition: "transform 0.3s" }}
              />
              <Link
                color="inherit"
                underline="hover"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": { color: "#ffeb3b" },
                }}
              >
                Support
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <LocationOnIcon sx={{ marginRight: 1, color: "#ffeb3b" }} />
              <Typography>
                <strong>Bihar Office Address:</strong> Alam Plaza, Opposite
                Bharat Petrol Pump, Beside St. Xavier's College Gate no. 2,
                <br />
                Digha Ashiana Road Digha Patna Bihar (800011)
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <PhoneIcon sx={{ marginRight: 1, color: "#ffeb3b" }} />
              <Typography>
                <strong>Mobile No:</strong> +91 9334616939, +91 9911713590
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <EmailIcon sx={{ marginRight: 1, color: "#ffeb3b" }} />
              <Typography>
                <strong>Email:</strong> enablingev@gmail.com
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              <IconButton
                href="https://facebook.com"
                color="inherit"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: "linear-gradient(45deg, #3b5998, #ffeb3b)",
                  mx: 1,
                  transition: "background 0.3s",
                  "&:hover": {
                    background: "linear-gradient(45deg, #ffeb3b, #3b5998)",
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                color="inherit"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: "linear-gradient(45deg, #1da1f2, #ffeb3b)",
                  mx: 1,
                  transition: "background 0.3s",
                  "&:hover": {
                    background: "linear-gradient(45deg, #ffeb3b, #1da1f2)",
                  },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                color="inherit"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: "linear-gradient(45deg, #e1306c, #ffeb3b)",
                  mx: 1,
                  transition: "background 0.3s",
                  "&:hover": {
                    background: "linear-gradient(45deg, #ffeb3b, #e1306c)",
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};