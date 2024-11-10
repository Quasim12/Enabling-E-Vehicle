import React, { useRef } from "react";
import { Container, Box, Typography, IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";
import letterOfIntentImage from "../../images/LetterOfIntent.jpg";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const LetterOfIntent = () => {
  const location = useLocation();
  const { finalContent_LOI } = location.state || { finalContent_LOI: "" };
  const letterOfIntentRef = useRef();

  const handleDownload = async () => {
    const canvas = await html2canvas(letterOfIntentRef.current, {
      scale: 2,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("letter_of_intent.pdf");
  };

  const currentDate = new Date();
  const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;

  return (
    <Container>
      <Box
        sx={{
          mt: 5,
          position: "relative",
          textAlign: "center",
          width: "100%",
          height: 0,
          paddingBottom: "141.42%", // Aspect ratio for A4 size (210mm / 297mm * 100%)
          overflow: "hidden",
        }}
        ref={letterOfIntentRef}
      >
        <img
          src={letterOfIntentImage}
          alt="Letter Of Intent"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "25%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 2,
            textAlign: "center",
            width: "80%",
          }}
        >
          <Typography variant="h5" component="div" sx={{ marginBottom: 4 }}>
            LETTER OF INTENT(LOI)
          </Typography>
          <Typography variant="h6" component="div" sx={{ textDecoration: "underline" }}>
            TO WHOMSOEVER IT MAY CONCERN
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            fontWeight: "bold",
            fontfamily: "Arial",
            top: "260px",
            right: "65px",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          <Typography>Date :- {formattedDate}</Typography>
        </Box>
        <Box
          sx={{
            fontSize: "1.6rem",
            textAlign: "justify",
            position: "absolute",
            top: "49%",
            left: "49%",
            transform: "translate(-50%, -50%)",
            padding: 2,
            width: "87%",
          }}
        >
          <Typography component="pre" sx={{ whiteSpace: "pre-wrap" }}>
            {finalContent_LOI}
          </Typography>
        </Box>
      </Box>
      <IconButton
        sx={{
          position: "absolute",
          top: "60px",
          right: "10px",
          zIndex: 1000, // Ensure it is on top of other elements
          "&:hover": {
            backgroundColor: "lightgray",
          },
        }}
        onClick={handleDownload}
      >
        <DownloadIcon />
      </IconButton>
    </Container>
  );
};