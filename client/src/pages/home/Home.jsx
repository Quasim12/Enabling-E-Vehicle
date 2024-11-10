import React from 'react';
import { Container, Box } from '@mui/material';
import AboutUs from '../aboutUs/AboutUs';
import { MissionVision } from "../../components/mission&Vision/Mission&Vision";
import { CarouselComponent } from '../../components/carousel/Carousel';

export const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        minHeight="100%"
        textAlign="center"
        mt={2} // Add margin-top
        mb={3} // Add margin-bottom
      >
      </Box>
      <CarouselComponent />
      <AboutUs />      
      <MissionVision />
    </Container>
  );
};