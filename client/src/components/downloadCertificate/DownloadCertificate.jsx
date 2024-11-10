import React, { useRef } from "react";
import { Container, Box, Typography, IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";
import certificateImage from "../../images/Certificate.jpg";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const DownloadCertificate = () => {
  const location = useLocation();
  const { finalContent_CERT } = location.state || { finalContent_CERT: "" };
  const certificateRef = useRef();

  const handleDownload = async () => {
    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("certificate.pdf");
  };

  return (
    <Container>
      <Box sx={{ mt: 5, position: "relative", textAlign: "center" }} ref={certificateRef}>
        <img
          src={certificateImage}
          alt="Certificate"
          style={{ width: "70%", height: "auto", marginTop: "20px" }}
        />
        <Box
          sx={{
            textAlign: "justify",
            position: "absolute",
            top: "60%", // Adjusted from 55% to 60% for more space
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 2,
            width: "70%",
          }}
        >
          <Typography component="pre" sx={{ whiteSpace: "pre-wrap" }}>
            {finalContent_CERT}
          </Typography>
        </Box>
      </Box>
      <IconButton
        sx={{
          position: "absolute",
          top: "60px",
          right: "10px",
          backgroundColor: "white",
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