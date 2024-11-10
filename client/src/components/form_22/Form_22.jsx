import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import jsPDF from "jspdf";
import letterheadImage from "../../images/Form_22.jpg"; // Make sure to have the letterhead image in the specified path

export const Form_22 = () => {
  const [chassisMid1, setChassisMid1] = useState(""); // For first 3 digits
  const [chassisMid2, setChassisMid2] = useState(""); // For second 3 digits
  const [open, setOpen] = useState(false); // State to handle dialog visibility

  const fixedPart1 = "ME9EBCR";
  const fixedPart2 = "H268";

  const chassisNo = `${fixedPart1}${chassisMid1}${fixedPart2}${chassisMid2}`;

  // Handle chassis inputs with 3-character limit (numbers or letters)
  const handleChassisMid1Change = (event) => {
    const value = event.target.value.toUpperCase();
    // Allow any alphanumeric character and limit to 3 characters
    if (/^[A-Z0-9]{0,3}$/.test(value)) {
      setChassisMid1(value);
    }
  };

  const handleChassisMid2Change = (event) => {
    const value = event.target.value.toUpperCase();
    // Allow any alphanumeric character and limit to 3 characters
    if (/^[A-Z0-9]{0,3}$/.test(value)) {
      setChassisMid2(value);
    }
  };

  // Check if both chassis inputs are filled
  const isChassisFormValid =
    chassisMid1.length === 3 && chassisMid2.length === 3;

  // Paragraph content
  const paragraphContent = `
Certified  that JHATPAT  JIO ( Brand  name  of vehicle )  bearing  chassis no.
${chassisNo}  and  engine number or  motor  number  in  case of  battery
operated vehicles M000${chassisMid2} complies with the provision of motor vehicle acts 1998
and rules made there under.






ENABLING E-VEHICLE PRIVATE LTD





Authorized Signatory

Form-22  shall be issued  with the signature  of the manufacturer  /ENABLING  
E-VEHICLE PRIVATE LTD duly printed in the form itself by affixing facsimile signature in ink under the hand and seal of manufacturer/ ENABLING E-VEHICLE PRIVATE LTD.
`;

  // Handle PDF download
  const handleDownload = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const img = new Image();
    img.src = letterheadImage;
    img.onload = () => {
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(img, "JPEG", 0, 0, pdfWidth, pdfHeight);

      // Set the font size to a larger value
      pdf.setFontSize(13.5);

      // Add the provided content to the top center of the PDF with more margin from top
      pdf.text("FORM 22", pdfWidth / 2, 70, { align: "center" });
      pdf.text(
        "[See rules 47(g), 115(2), 115(6), 115(1), 124, 126(A) and 127]",
        pdfWidth / 2,
        80,
        { align: "center" }
      );
      pdf.text(
        "INITIAL CERTIFICATE OF COMPLIANCE WIITH POLLUTION, STANDARDS,",
        pdfWidth / 2,
        90,
        { align: "center" }
      );
      pdf.text(
        "SAFETY STANDARDS OF COMPONENT AND ROAD WORTHINESS",
        pdfWidth / 2,
        100,
        { align: "center" }
      );

      // Split the paragraph content into lines that fit within the PDF width
      const lines = pdf.splitTextToSize(paragraphContent, pdfWidth - 20);
      pdf.text(lines, 13, 130); // Add the lines to the PDF at coordinates (15, 120) to add more margin-top and margin-left

      pdf.save("form_22.pdf");

      // Reset form data and hide form
      setChassisMid1("");
      setChassisMid2("");
      setOpen(false);
    };
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
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
          Form 22
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            mt: 2,
            width: "40%",
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

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle>
            Form 22
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
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
                  maxLength={3} // Limit to 3 characters
                  onInput={handleChassisMid1Change}
                  sx={{
                    border: "none", // Remove rectangle box
                    borderBottom: "1px solid #000", // Only bottom border
                    width: "40px",
                    textAlign: "center",
                    marginRight: "10px",
                    fontFamily: "roboto",
                    outline: "none",
                    fontSize: "18px",
                    "&:focus": {
                      borderBottom: "1px solid #000", // Keep bottom border on focus
                    },
                  }}
                  value={chassisMid1} // Controlled input
                />
                <Typography>{fixedPart2}</Typography>
                <Box
                  component="input"
                  type="text"
                  maxLength={3} // Limit to 3 characters
                  onInput={handleChassisMid2Change}
                  sx={{
                    border: "none", // Remove rectangle box
                    borderBottom: "1px solid #000", // Only bottom border
                    width: "40px",
                    textAlign: "center",
                    marginRight: "10px",
                    fontFamily: "roboto",
                    outline: "none",
                    fontSize: "18px",
                    "&:focus": {
                      borderBottom: "1px solid #000", // Keep bottom border on focus
                    },
                  }}
                  value={chassisMid2} // Controlled input
                />
              </Box>
              <Button
                type="submit"
                onClick={handleDownload}
                sx={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "4px",
                  color: "white",
                  fontSize: "16px",
                  cursor: isChassisFormValid ? "pointer" : "not-allowed",
                  backgroundColor: isChassisFormValid ? "#28a745" : "#ccc",
                  marginTop: "20px",
                }}
                disabled={!isChassisFormValid}
              >
                Submit
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Container>
  );
};