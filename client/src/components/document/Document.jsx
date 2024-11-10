import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import certificateImage from "../../images/Certificate.jpg";
import letterOfIntentImage from "../../images/LetterOfIntent.jpg";
import requestLetterImage from "../../images/RequestLetter.jpg";

export const Document = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { submittedData } = location.state || {};

  if (!submittedData) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          No data available. Please submit the form first.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </Container>
    );
  }

  // Access dealerCode and mobileNo from submittedData
  const { dealerCode, mobileNo } = submittedData;

  const currentDate = new Date();
  const formattedDate = `${String(currentDate.getDate()).padStart(
    2,
    "0"
  )}-${String(currentDate.getMonth() + 1).padStart(
    2,
    "0"
  )}-${currentDate.getFullYear()}`;

  const finalContent_LOI = `
This is to certify that M/s ${submittedData.name}, located at ${submittedData.address}, ${submittedData.dist}, ${submittedData.state} - ${submittedData.pinCode}, and GSTIN ${submittedData.gstin}, has been duly authorized for the sale and service of our battery-operated e-Rickshaw model "JHATPAT-JIO." The aforementioned model is manufactured by M/s Enabling E-Vehicle Private Ltd., which has its registered office at 10A/21, Vasundhara, Ghaziabad, Uttar Pradesh 201012, bearing GSTIN 09AAHCE4716B1ZW.



This authorization is granted in accordance with the terms and conditions outlined in our dealer agreement for the JHATPAT-JIO model, as well as for any forthcoming models that may be introduced. We will provide necessary updates regarding any new models in due course.






For Enabling E-Vehicle Private Ltd.,






Authorized Signatory
      `;

  const finalContent_REQ = `
REF: ${submittedData.RQreferenceId}

To,
The Regional Transport Officer (RTO)
${submittedData.rtoOffice}, ${submittedData.state}

Subject: Authorization for “JHATPAT Jio”


Dear Sir/Madam,

We wish to inform you that M/s ${submittedData.name}, located at ${submittedData.address}, ${submittedData.dist}, ${submittedData.state} - ${submittedData.pinCode}, has been appointed as an authorized dealer for the sales and service of our eRickshaw model “JHATPAT Jio” within the Patna region.



In light of this, we kindly request your office to process the registration of the eRickshaw vehicles manufactured by ENABLING E-VEHICLE PRIVATE LIMITED, as presented by our authorized dealer.

We appreciate your cooperation in this matter.




Thank you.

Yours sincerely,






ENABLING E-VEHICLE PRIVATE LIMITED
      `;

  const finalContent_CERT = `
      This is to certify that M/S ${submittedData.name}, Address: ${submittedData.address}, GST Number: ${submittedData.gstin}, is an authorized dealer for JhatPat Jio e-rickshaws. The dealer is entitled to sell, promote, and provide after-sales service for JhatPat Jio products in the Patna region.
`;

  const handleGetCertificateClick = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(13);

    // Add Letter of Intent
    pdf.addImage(letterOfIntentImage, "JPEG", 0, 0, 210, 297);
    pdf.setFontSize(20);
    pdf.text("LETTER OF INTENT (LOI)", 105, 75, { align: "center" });
    pdf.setFontSize(16);
    pdf.text("TO WHOMSOEVER IT MAY CONCERN", 105, 85, { align: "center" });
    pdf.setFontSize(13);
    pdf.text(`Date: ${formattedDate}`, 163, 50); // Add date at the top right with margin
    pdf.text(finalContent_LOI, 10, 100, { maxWidth: 190 }); // Adjusted y coordinate for top margin
    pdf.addPage();

    // Add Certificate of Authorization
    pdf.addImage(certificateImage, "JPEG", 0, 0, 210, 160);
    pdf.text(`${formattedDate}`, 20, 130); // Add date at the top right with margin
    pdf.text(finalContent_CERT, 10, 70, { maxWidth: 190 }); // Adjusted y coordinate for top margin
    pdf.addPage();

    // Add Request Letter
    pdf.addImage(requestLetterImage, "JPEG", 0, 0, 210, 297);
    pdf.text(`Date: ${formattedDate}`, 163, 50); // Add date at the top right with margin
    pdf.text(finalContent_REQ, 10, 70, { maxWidth: 190 }); // Adjusted y coordinate for top margin

    // Save the PDF
    pdf.save("certificates.pdf");

    // Redirect to home page
    navigate("/");
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, backgroundColor: "#f5f5f5" }}>
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: "Roboto",
            background: "linear-gradient(45deg, #1e88e5, #ff4081)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome
        </Typography>
        <Typography
          sx={{ fontFamily: "Roboto" }}
          variant="h5"
          component="h2"
          gutterBottom
        >
          Thank you for joining us! Together with a trusted brand, we'll create
          new success stories!
        </Typography>

        {/* Display dealerCode and mobileNo below the welcome message */}
        <Typography
          variant="body1"
          sx={{
            marginTop: 3,
            marginLeft: -3,
            fontWeight: "600", // Semi-bold
            fontSize: "1.1rem", // Slightly larger font size
            color: "#333", // Dark grey color for text
            position: "relative",
            paddingBottom: "5px",
          }}
        >
          userId : {dealerCode}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "600", // Semi-bold
            fontSize: "1.1rem", // Slightly larger font size
            color: "#333", // Dark grey color for text
            position: "relative",
            paddingBottom: "5px",
          }}
        >
          password : {mobileNo}
        </Typography>

        <Box mt={4}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleGetCertificateClick}
            sx={{
              fontFamily: "Roboto",
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              "&:hover": {
                background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
              },
            }}
          >
            Get Certificate
          </Button>
        </Box>
      </Container>
    </Paper>
  );
};

export default Document;
