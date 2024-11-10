import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';

const Heading = ({ children }) => (
  <Box mb={2}>
    <Typography
      variant="h4"
      gutterBottom
      style={{
        background: 'linear-gradient(45deg, #3f51b5, #ff4081)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {children}
      <Box
        component="span"
        sx={{
          position: 'absolute',
          bottom: -4, // Adjusted to accommodate thicker underline
          left: 0,
          width: '100%',
          height: '3px', // Increased height for thicker underline
          background: 'linear-gradient(45deg, #3f51b5, #ff4081)', // Gradient background for mixed color
        }}
      />
    </Typography>
  </Box>
);

export const MissionVision = () => {
  const paperStyle = { padding: '20px', marginBottom: '20px' };

  return (
    <Container>
      <Typography
        variant="h3"
        gutterBottom
        style={{
          marginBottom: '40px',
          marginTop: '60px',
          textAlign: 'center',
          background: 'linear-gradient(45deg, #3f51b5, #ff4081)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Mission & Vision
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={3} style={paperStyle}>
            <Heading>Our Mission</Heading>
            <Typography variant="body1" paragraph>
              Our mission is to lead the transition towards cleaner transportation by providing innovative electric rickshaws that meet the needs of modern urban environments. We are committed to reducing carbon emissions, lowering operational costs, and enhancing the quality of life for our customers.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={paperStyle}>
            <Heading>Our Vision</Heading>
            <Typography variant="body1" paragraph>
              We envision a future where electric mobility is the norm, not the exception. Through continuous research and development, we aim to introduce cutting-edge technologies that make electric rickshaws a preferred choice for businesses and individuals alike.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};