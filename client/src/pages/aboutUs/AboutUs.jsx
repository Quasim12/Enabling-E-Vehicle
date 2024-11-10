import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import erikshaw from "../../images/About.jpg";

export const AboutUs = () => {
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12}></Grid>
          <Grid item xs={12} md={6}>
            <Box p={2}>
              <Typography
                variant="h6"
                component="h1"
                gutterBottom
                style={{ color: "green", fontFamily: "roboto" }}
              >
                Welcome To
              </Typography>
              <Typography
                variant="h5"
                component="h1"
                gutterBottom
                style={{
                  fontFamily: "roboto",
                  color: "red",
                  borderBottom: "3px solid green",
                  paddingBottom: "5px",
                  display: "inline-block",
                }}
              >
                Enabling E-Vehicle PVT. Ltd
              </Typography>
              <Typography
                variant="body1"
                paragraph
                style={{
                  textAlign: "justify",
                  fontFamily: "roboto",
                  fontSize: "1rem",
                }}
              >
                Welcome to ENABLING E-VEHICLE PVT. LTD., a pioneering force in
                the realm of eco-friendly transportation solutions. Our
                commitment to innovation and sustainability is embodied in our
                flagship product, the JHATPAT JIO electric rickshaw. Founded
                with a vision to transform urban mobility, ENABLING E-VEHICLE
                PVT. LTD. stands at the forefront of the electric vehicle
                revolution. Our journey began in 2013, driven by a passion for
                creating advanced transportation solutions that not only enhance
                the commuting experience but also contribute to a greener
                planet. At ENABLING E-VEHICLE PVT. LTD., we believe that
                transportation should be efficient, reliable, and
                environmentally responsible. The JHATPAT JIO electric rickshaw
                is a testament to our dedication to these values. Designed with
                state-of-the-art technology, the JHATPAT JIO offers a seamless
                blend of performance, comfort, and sustainability.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box p={2}>
              <img
                src={erikshaw}
                alt="E-Rikshaw 1"
                style={{ width: "100%", borderRadius: "8px", marginTop: "5vh" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default AboutUs;