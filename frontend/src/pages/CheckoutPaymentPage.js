import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import {
  Box,
  Button,
  Container,
  createTheme,
  Input,
  MenuItem,
  Paper,
  Step,
  StepLabel,
  Stepper,
  ThemeProvider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { months } from "../constants/creditCardmonths";
import { years } from "../constants/creditCardYears";
import alerting from "../components/Alerting";

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

export default function CheckoutPaymentPage() {
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;



  const resetInput = () => {
    setNameOnCard("");
    setCardNumber("");
    setCvv("");
    setExpiryMonth("");
    setExpiryYear("");
  };

  function handleChange(e) {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    if (onlyNums.length < 16) {
      this.setState({ value: onlyNums });
    } else if (onlyNums.length === 16) {
      const number = onlyNums.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4");
      this.setState({ value: number });
    }
  }

  const handleProceedPaypal = () => {
    navigate("/checkout-paypal", { state: { data: data } });
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (!nameOnCard || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      alerting("there's empty field!");
      return;
    }

    // input validation
    if (/\d/.test(nameOnCard) || isNaN(cardNumber) || isNaN(cvv)) {
      alerting("your name has number or card number has not number value!")
      return;
    }

    const payment = { nameOnCard, cardNumber, expiryMonth, expiryYear, cvv };

    data.payment = payment;

    resetInput();
    navigate("/checkout-review", { state: { data: data } });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <React.Fragment>
            <Stepper activeStep={1} sx={{ pt: 3, pb: 5 }}>
              <Step>
                <StepLabel>Mailing Address</StepLabel>
              </Step>
              <Step>
                <StepLabel>Payment details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Review your order</StepLabel>
              </Step>
            </Stepper>
            <Typography variant="h6" gutterBottom>
              Payment method
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardName"
                  label="Name on card"
                  fullWidth
                  autoComplete="cc-name"
                  variant="standard"
                  onChange={(e) => setNameOnCard(e.target.value)}
                  value={nameOnCard}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardNumber"
                  label="Card number"
                  fullWidth
                  autoComplete="cc-number"
                  variant="standard"
                  onChange={(e) => setCardNumber(e.target.value)}
                  value={cardNumber}
                  inputProps={{ maxLength: 16 }}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  required
                  select
                  id="expMonth"
                  label="Month"
                  fullWidth
                  autoComplete="cc-exp-month"
                  variant="standard"
                  onChange={(e) => setExpiryMonth(e.target.value)}
                  value={expiryMonth}
                >
                  {months.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  required
                  select
                  id="expYear"
                  label="Year"
                  fullWidth
                  autoComplete="cc-exp-year"
                  variant="standard"
                  onChange={(e) => setExpiryYear(e.target.value)}
                  value={expiryYear}
                >
                  {years.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cvv"
                  label="CVV"
                  helperText="Last three digits on signature strip"
                  fullWidth
                  autoComplete="cc-csc"
                  variant="standard"
                  onChange={(e) => setCvv(e.target.value)}
                  value={cvv}
                  inputProps={{ maxLength: 3 }}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                  label="Remember credit card details for next time"
                />
              </Grid> */}
            </Grid>
            <React.Fragment>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  className="checkout"
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                  style={{ color: "white" }}
                  onClick={handleProceedPaypal}
                >
                  Or Proceed with Paypal
                </Button>
                <Button
                  className="checkout"
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                  style={{ color: "white" }}
                  onClick={handleNext}
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
