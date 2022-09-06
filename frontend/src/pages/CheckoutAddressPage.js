import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  Container,
  createTheme,
  MenuItem,
  Paper,
  Step,
  StepLabel,
  Stepper,
  ThemeProvider,
} from "@mui/material";
import CheckoutPayment from "./CheckoutPaymentPage.js";
import { useLocation, useNavigate } from "react-router-dom";
import { provinces } from "../constants/provinces.js";
import { countries } from "../constants/countries.js";


export default function CheckoutAddressPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  

  const orderName = location.state.service.name;
  const orderDesc = location.state.service.desc;
  const orderPrice = location.state.service.price;
  const serviceId = location.state.service.serviceId;
  const reservedDetail = location.state.appointmentTime;
  const providerId = location.state.providerId;

  const handleNext = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !addressOne || !city || !province || !postalCode || !country) {
      return;
    }

    let addressCombined = addressOne;
    if (addressTwo !== "") {
      addressCombined = addressCombined + " " + addressTwo;
    }

    const address = {addressOne, addressTwo, addressCombined, city, province, postalCode, country};
    const service = {orderName, orderDesc, orderPrice, serviceId};

    const order = { firstName, lastName, address, service, reservedDetail, providerId };

    // use navigate hook to direct users to next page with data stored as state
    // navigate allows us to send data from one component to another component if they are serializable
    navigate("/checkout-payment", {state: {data: order}});

  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#e27b7b",
      },
      secondary: {
        main: "#e27b7b",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <React.Fragment>
            <Stepper activeStep={0} sx={{ pt: 3, pb: 5 }}>
              <Step>
                <StepLabel>Billing Address</StepLabel>
              </Step>
              <Step>
                <StepLabel>Payment details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Review your order</StepLabel>
              </Step>
            </Stepper>
            <Typography variant="h6" gutterBottom>
              Billing address
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  value={addressOne}
                  onChange={(e) => setAddressOne(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name="address2"
                  label="Address line 2"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  value={addressTwo}
                  onChange={(e) => setAddressTwo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  variant="standard"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                >
                  {provinces.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="standard"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  inputProps={{ maxLength: 6, style: { textTransform: "uppercase" } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  select
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="shipping country"
                  variant="standard"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <React.Fragment>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    className="checkout"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    style={{ color: "white" }}
                  >
                    Next
                  </Button>
              </Box>
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
