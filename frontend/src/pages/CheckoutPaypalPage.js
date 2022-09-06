import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  Container,
  createTheme,
  Paper,
  Step,
  StepLabel,
  Stepper,
  ThemeProvider,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import Loader from "../components/Loader";
import moment from 'moment';

// const products = [
//   {
//     name: "Amorr Salon",
//     desc: "Man's Haircut booked on July 23, 2022",
//     price: "$18.99",
//   },
//   {
//     name: "Fresh Massage",
//     desc: "Woman's Manicure booked on July 25, 2022",
//     price: "$21.99",
//   },
//   {
//     name: "Lily Makeup Shop",
//     desc: "Womans Makeup booked on August 5, 2022",
//     price: "$45.99",
//   },
// ];

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

export default function CheckoutPaypalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.data;
  const [services, setServices] = useState({});

  const [sdk, setSdk] = useState('');

  const handleSubmitOrder = async () => {
    await fetch("/api/orders/save-order", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.json();
    });
  };

  const addresses = [
    data.address.addressOne,
    data.address.addressTwo,
    data.address.city,
    data.address.postalCode,
    data.address.province,
    data.address.country,
  ];

  // dynamically load the paypal script
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      // console.log("clientId 👉️", clientId);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;

      script.onload = () => {
        setSdk(true);
      };
      document.body.appendChild(script);
    };
    addPaypalScript();

    setServices({name:data?.service?.orderName, desc:moment.utc(data?.reservedDetail?.start).format('HH:mm on MMM DD, YYYY'), price:data?.service?.orderPrice});
  }, []);

  const handlePaymentSuccess = (paymentResult) => {
    // should go to the next page after payment
    // console.log("paymentResult 👉️", paymentResult);
    navigate("/checkout-review", { state: { data: data } });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <React.Fragment>
            <Stepper activeStep={2} sx={{ pt: 3, pb: 5 }}>
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
              Order summary
            </Typography>
            <List disablePadding>
              {/* {products.map((product) => (
                <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                  <ListItemText primary={product.name} secondary={product.desc} />
                  <Typography variant="body2">{product.price}</Typography>
                </ListItem>
              ))} */}
              <ListItem key={services.name} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={services.name} secondary={"scheduled on "+services.desc} />
                <Typography variant="body2">{services.price}</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {services.price} $(CAD)
                </Typography>
              </ListItem>
            </List>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Service Address
                </Typography>
                <Typography gutterBottom>
                  {data.firstName} {data.lastName}{" "}
                </Typography>
                <Typography gutterBottom>{addresses.join(", ")}</Typography>
              </Grid>
            </Grid>
            <React.Fragment>
              {!sdk ? (
                <Loader />
              ) : (
                <PayPalButton amount="999" onSuccess={handlePaymentSuccess}>
                  {' '}
                </PayPalButton>
              )}
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
