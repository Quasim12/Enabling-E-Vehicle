import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { DisplayActivationCode } from "../../components/DisplayActivationCode/DisplayActivationCode";
import { GenerateActivationCode } from "../../components/generateActivationCode/GenerateActivationCode";
import { ModifyCNFCode } from "../../components/modifyCNFCode/ModifyCNFCode";
import { Form_22 } from "../../components/form_22/Form_22";
import { DisplayCustomerInfo } from "../../components/displayCustomerInfo/DisplayCustomerInfo";
import { DisplayVehicleInfo } from "../../components/displayVehicleInfo/DisplayVehicleInfo";
import { DealerInfo } from "../../components/dealerInfo/DealerInfo";
import { CreateProfileSubAdmin } from "../../components/createProfileSubAdmin/CreateProfileSubAdmin";
import { SubAdminInfo } from "../../components/subAdminInfo/SubAdminInfo";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "linear-gradient(to right, #d3d3d3, #87ceeb)", // Light grey and light sky blue gradient
    },
  },
  typography: {
    fontFamily: "Roboto",
    h4: {
      fontWeight: 600,
      color: "linear-gradient(to right, #ff7e5f, #feb47b)", // Colorful gradient text
      WebkitBackgroundClip: "text",
    },
  },
});

export const AdminDash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("authToken"); // Assuming 'authToken' is the name of the cookie
    navigate("/admin"); // Redirect to login page
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        style={{
          background: theme.palette.background.default,
          padding: "40px",
          borderRadius: "16px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          style={{ fontFamily: theme.typography.fontFamily }}
        >
          Admin Dashboard
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          style={{ marginBottom: "20px" }}
        >
          Logout
        </Button>
        <Grid
          container
          spacing={4}
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", marginBottom: "20px" }}
          >
            <Card
              style={{
                flexGrow: 1,
                padding: "20px",
                margin: "10px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px",
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <CardHeader action={<></>} />
              <CardContent>
                <Form_22 />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", marginBottom: "20px" }}
          >
            <Card
              style={{
                flexGrow: 1,
                padding: "20px",
                margin: "10px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px",
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <CardHeader action={<></>} />
              <CardContent>
                <CreateProfileSubAdmin />
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", marginBottom: "20px" }}
          >
            <Card
              style={{
                flexGrow: 1,
                padding: "20px",
                margin: "10px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px",
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <CardHeader action={<></>} />
              <CardContent>
                <DisplayActivationCode />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", marginBottom: "20px" }}
          >
            <Card
              style={{
                flexGrow: 1,
                padding: "20px",
                margin: "10px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px",
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <CardHeader action={<></>} />
              <CardContent>
                <GenerateActivationCode />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", marginBottom: "20px" }}
          >
            <Card
              style={{
                flexGrow: 1,
                padding: "20px",
                margin: "10px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px",
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <CardHeader action={<></>} />
              <CardContent>
                <ModifyCNFCode />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", marginBottom: "20px" }}
          >
            <Card
              style={{
                flexGrow: 1,
                padding: "20px",
                margin: "10px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px",
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <CardHeader action={<></>} />
              <CardContent>
                <DisplayCustomerInfo />
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", marginBottom: "20px" }}
          >
            <Card
              style={{
                flexGrow: 1,
                padding: "20px",
                margin: "10px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px",
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <CardHeader action={<></>} />
              <CardContent>
                <DisplayVehicleInfo />
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", marginBottom: "20px" }}
          >
            <Card
              style={{
                flexGrow: 1,
                padding: "20px",
                margin: "10px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px",
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <CardHeader action={<></>} />
              <CardContent>
                <DealerInfo />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", marginBottom: "20px" }}
          >
            <Card
              style={{
                flexGrow: 1,
                padding: "20px",
                margin: "10px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px",
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <CardHeader action={<></>} />
              <CardContent>
                <SubAdminInfo/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
