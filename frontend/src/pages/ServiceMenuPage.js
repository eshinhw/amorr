import {
  Box,
  Button,
  Container,
  createTheme,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import FormControl from "@mui/material/FormControl";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CustomerCalendar from "../components/CustomerCalendar";

// const services = [
//   {
//     name: "Men's Hair Cut",
//     price: 19.99,
//   },
//   {
//     name: "Women's Hair Cut",
//     price: 29.99,
//   },
//   {
//     name: "Women's Perm",
//     price: 79.99,
//   },
//   {
//     name: "Basic Makeup",
//     price: 15.99,
//   },
//   {
//     name: "Facial Massage",
//     price: 39.99,
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

const ServiceMenuPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const providerName = location.state.name;
  const providerId = location.state.id;
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);

  const onClickButton = () => {
    navigate("/checkout-address", {
      state: { service: selectedService, appointmentTime: scheduleData, providerId: providerId },
    });
  };

  const onClickCheckbox = (e) => {
    const selectedServiceName = e.target.value;
    services.forEach((service) => {
      if (service.name === selectedServiceName) {
        const dateTime = new Date();
        const date = dateTime.getDate();
        const month = dateTime.getMonth();
        const year = dateTime.getFullYear();
        const hour = dateTime.getHours();
        const minutes = dateTime.getMinutes();

        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        service.desc = `Scheduled at ${hour}:${minutes} on ${months[month + 1]} ${date}, ${year}`;

        setSelectedService({ name: service.name, price: service.price, serviceId:service._id });
      }
    });
  };

  useEffect(() => {
    async function fetchService() {
      await fetch('/api/services/provider/' + providerId, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setServices(data);
        });
    }
    fetchService();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container md={6}>
          <Typography variant="h2">{providerName}</Typography>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid
              container
              component="main"
              // maxWidth="md"
              sx={{ mb: 4 }}
              spacing={20}
              justifyContent={"center"}
            >
              <Grid item>
                <Typography variant="h6" gutterBottom align="center">
                  Available Services
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup>
                    {services.length == 0 ? (
                      <h4>
                        This service provider has not added any service yet, come back another day?
                      </h4>
                    ) : (
                      <>
                        {services.map((service) => (
                          <FormControlLabel
                            className="formControlLabelStyle"
                            value={service.name}
                            control={<Radio onClick={onClickCheckbox} />}
                            label={`${service.name} - $${service.price}`}
                            labelPlacement="start"
                          />
                        ))}
                      </>
                    )}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            {scheduleData && selectedService ? (
              <React.Fragment>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    className="checkout"
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    style={{ color: "white" }}
                    onClick={onClickButton}
                  >
                    Checkout
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    className="checkout"
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    style={{ color: "white" }}
                    onClick={onClickButton}
                    disabled
                  >
                    Checkout Disabled, enable when selected a time and service
                  </Button>
                </Box>
              </React.Fragment>
            )}
            <br/>
            <CustomerCalendar
              providerId={providerId}
              setScheduleData={setScheduleData}
              className="customerCalendar"
            />
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default ServiceMenuPage;

///////////////////////////////////////////////////////////////////////////////////
/*
import {
  Box,
  Button,
  Container,
  createTheme,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";
import FormControl from "@mui/material/FormControl";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CustomerCalendar from "../components/CustomerCalendar";

const services = [
  {
    name: "Men's Hair Cut",
    price: 19.99,
  },
  {
    name: "Women's Hair Cut",
    price: 29.99,
  },
  {
    name: "Women's Perm",
    price: 79.99,
  },
  {
    name: "Basic Makeup",
    price: 15.99,
  },
  {
    name: "Facial Massage",
    price: 39.99,
  },
];

// Mock Date and Time Data
const availableDateTime = [
  {
    startTime: "8:00AM",
    endTime: "11:00AM",
    date: "July 25, 2022"
  },
  {
    startTime: "5:30AM",
    endTime: "7:30AM",
    date: "July 26, 2022"
  }

];

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

const ServiceMenuPage = () => {
  const mockProviderId = "62cfba412377caca02c6d2ec";
  const navigate = useNavigate();
  const location = useLocation();
  const providerName = location.state.name;
  const providerId = location.state.id;
  const [selectedService, setSelectedService] = useState({});
  const [selectedTime, setSelectedTime] = useState({});
  const [dateTime, setDateTime] = useState(new Date());
  const [calendarData, setCalendarData] = useState(null);

  // const availableDateTime = [];

  useEffect(() => {
    async function fetchAvailableSpots() {
      await fetch("/api/calendars/calendar/" + mockProviderId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("first fetch ");
          // console.log(res);
          setCalendarData(res);
          console.log("calendarData: ", calendarData);
        });
    }
    fetchAvailableSpots();
    // if (calendarData) {
    //   for (var i = 0; i < calendarData.length; i++) {
    //     // retrieve startTime and endTime for available slots
    //     if (calendarData[i].customerId != undefined) {
    //       let startTime = calendarData[i].startTime;
    //       let endTime = calendarData[i].endTime;
    //       const startTimeObj = new Date(startTime);
    //       const endTimeObj = new Date(endTime);
    //       console.log(startTimeObj.getDate(), endTimeObj);
    //       availableDateTime.push({ startTime: startTimeObj, endTime: endTimeObj });
    //       console.log(availableDateTime);
    //       console.log(availableDateTime[0].startTime.getHours());
    //     }
    //   }
    // }
  }, []);

  const onClickButton = () => {
    navigate("/checkout-address", {
      state: { service: selectedService, appointmentTime: selectedTime },
    });
  };

  const onClickCheckbox = (e) => {
    const selectedServiceName = e.target.value;
    services.forEach((service) => {
      if (service.name === selectedServiceName) {
        const date = dateTime.getDate();
        const month = dateTime.getMonth();
        const year = dateTime.getFullYear();
        const hour = dateTime.getHours();
        const minutes = dateTime.getMinutes();

        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        service.desc = `Scheduled at ${hour}:${minutes} on ${months[month + 1]} ${date}, ${year}`;

        setSelectedService({ name: service.name, price: service.price });
      }
    });
  };

  const onClickDateCheckbox = (e) => {
    setSelectedTime({ time: e.target.value });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container md={6}>
          <Typography variant="h2">{providerName}</Typography>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid
              container
              component="main"
              // maxWidth="md"
              sx={{ mb: 4 }}
              spacing={20}
              justifyContent={"center"}
            >
              <Grid item>
                <Typography variant="h6" gutterBottom align="center">
                  Available Services
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup>
                    {services.map((service) => (
                      <FormControlLabel
                        className="formControlLabelStyle"
                        value={service.name}
                        control={<Radio onClick={onClickCheckbox} />}
                        label={`${service.name} - $${service.price}`}
                        labelPlacement="start"
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item>
                <Typography variant="h6" gutterBottom align="center">
                  Available Date and Time
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup>
                    {availableDateTime.map((date) => (
                      <FormControlLabel
                        className="formControlLabelStyle"
                        value={`Schedueld on ${date.startTime} - ${date.endTime} on ${date.date}`}
                        control={<Radio onClick={onClickDateCheckbox} />}
                        label={`${date.startTime} - ${date.endTime} on ${date.date}`}
                        // label={`${date.startTime.getHours()}:${date.startTime.getMinutes()} - ${date.endTime.getHours()}:${date.endTime.getMinutes()} on ${date.startTime.getMonth()} ${date.startTime.getDate()}, ${date.startTime.getFullYear()}`}
                        labelPlacement="start"
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <CustomerCalendar providerId={providerId} className="customerCalendar" />
            <React.Fragment>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  className="checkout"
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                  style={{ color: "white" }}
                  onClick={onClickButton}
                >
                  Checkout
                </Button>
              </Box>
            </React.Fragment>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default ServiceMenuPage;


*/
