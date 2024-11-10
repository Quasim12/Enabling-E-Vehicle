import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Box from '@mui/material/Box'; // Import Box from Material-UI

// Importing images from the images folder
import image1 from '../../images/About.jpg';
import image2 from '../../images/Rikshaw1.jpg';
import image3 from '../../images/Rikshaw3.jpg';

const items = [
    {
        name: "Image 1",
        url: image1
    },
    {
        name: "Image 2",
        url: image2
    },
    {
        name: "Image 3",
        url: image3
    },
];

export function CarouselComponent() {
    return (
        <Carousel autoPlay interval={2000} infiniteLoop showThumbs={false}>
            {items.map((item, i) => (
                <div key={i}>
                    <Box
                        component="img"
                        src={item.url}
                        alt={item.name}
                        sx={{
                            height: 400, // Adjust the height as needed
                            objectFit: 'cover', // This ensures the image covers the area without distortion
                            width: '100%' // Ensures the image takes the full width of the container
                        }}
                    />
                </div>
            ))}
        </Carousel>
    );
}