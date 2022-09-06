import React, { useState } from "react";
import "../css/Home.css";
import { Box, Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import GlobalStyles from "@mui/material/GlobalStyles";

 const Home = () => {
  const [homeSearchInput, setHomeSearchInput] = useState("");
  const tiers = [
    {
      title: "Free",
      price: "0",
      description: [
        "10 Private Messages",
        "1 GB of Storage",
        "Help Center Access",
        "24/7 Email Support",
      ],
      buttonText: "Sign up for free",
      buttonVariant: "contained",
    },
    {
      title: "Standard",
      price: "15",
      description: [
        "Unlimited Private Messages",
        "10 GB of Storage",
        "Priority Help Center Access",
        "Priority Email Support",
      ],
      buttonText: "Get started",
      buttonVariant: "contained",
    },
    {
      title: "Corporate",
      price: "30",
      description: [
        "50 Experts Included",
        "100 GB of Storage",
        "Custom Ad Posting",
        "5 Free Service Delivery",
      ],
      buttonText: "Contact us",
      buttonVariant: "contained",
    },
  ];

  const onButtonClick = async (e) => {
    const currVal = e.currentTarget.value;
    if (currVal === "Sign up for free" || currVal === "Get started") {
      window.location.href = "/findjob";
    } else {
      window.location.href = "/contactus";
    }
  };

  const updateInput = (e) => {
    setHomeSearchInput(e.target.value);
  };

  function findBeauty(e) {
    e.preventDefault();
    if (homeSearchInput.trim()) {
      window.location.href = `/searchpage/${homeSearchInput}`;
    } else {
      window.location.href = "/searchpage";
    }
  }

  const onImageClickHairdressing = async (e) => {
    console.log("onImageClick");
    window.location.href = "/searchpage/Hairdressing";
  }

  const onImageClickMakeup = async (e) => {
    console.log("onImageClick");
    window.location.href = "/searchpage/Makeup";
  }

  const onImageClickNailTechnician = async (e) => {
    console.log("onImageClick");
    window.location.href = "/searchpage/Nail%20Tech";
  }
  
  return (
    <>
      {/* HomePage Search Container */}
      <div className="homepage-search">
        <div className="home-sb-container">
          <h1 className="search-header">
            <span>Find Your Beauty Today</span>
          </h1>
          <p className="search-body">Find Beauty Professionals with the help of Amorr</p>
          <form className="search-form" onSubmit={findBeauty}>
            <div className="sb-container-input">
              <input
                type="text"
                className="sb-input"
                autoComplete="off"
                placeholder="I am looking for..."
                onChange={updateInput}
              />
              <button type="button" className="btn sb-button" onClick={findBeauty}>
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Box mb={0} pb={0}>
          <Typography component="h1" variant="h3" align="center" color="#333" gutterBottom>
            Are you a customer?
          </Typography>
          <Typography variant="h6" align="center" color="#333" component="p">
            Choose one of the services below to find your beauty back today!
          </Typography>
        </Box>
      </Container>

      {/* Image Animations */}
      <div className="row">
        <div className="column">
          <div className="image" onClick={onImageClickHairdressing}>
            <img className="image__img" src={require("../images/haircut.jpg")} alt="Bricks" />
            <div className="image__overlay image__overlay--primary">
              <div className="image__title">Hair Designer</div>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="image" onClick={onImageClickNailTechnician}>
            <img className="image__img" src={require("../images/nail-polish.jpg")} alt="Bricks" />
            <div className="image__overlay image__overlay--primary">
              <div className="image__title">Nail Artist</div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="image" onClick={onImageClickMakeup}>
            <img className="image__img" src={require("../images/makeup.jpg")} alt="Bricks" />
            <div className="image__overlay image__overlay--primary">
              <div className="image__title">Makeup Artist</div>
            </div>
          </div>
        </div>
      </div>

      <React.Fragment>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }} />
        <CssBaseline />
        {/* Hero unit */}
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
          <Typography component="h1" variant="h3" align="center" color="#333" gutterBottom>
            Are you a beauty expert?
          </Typography>
          <Typography variant="h5" align="center" color="#333" component="p">
            Join Amorr today to expand your business!
          </Typography>
        </Container>
        {/* End hero unit */}

        <Container maxWidth="md" component="main">
          <Box mb={10}>
            <Grid container spacing={5} alignItems="flex-end">
              {tiers.map((tier) => (
                // Enterprise card is full width at sm breakpoint
                <Grid
                  item
                  key={tier.title}
                  xs={12}
                  sm={tier.title === "Enterprise" ? 12 : 6}
                  md={4}
                >
                  <Card>
                    <CardHeader
                      title={tier.title}
                      subheader={tier.subheader}
                      titleTypographyProps={{ align: "center", color: "white" }}
                      sx={{
                        backgroundColor: "#e27b7b",
                      }}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "baseline",
                          mb: 2,
                        }}
                      >
                        <Typography component="h2" variant="h3" color="text.primary">
                          ${tier.price}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          /mo
                        </Typography>
                      </Box>
                      <ul>
                        {tier.description.map((line) => (
                          <Typography component="li" variant="subtitle1" align="center" key={line}>
                            {line}
                          </Typography>
                        ))}
                      </ul>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        variant={tier.buttonVariant}
                        value={tier.buttonText}
                        sx={{
                          backgroundColor: "#e27b7b",
                          color: "white",
                          ":hover": {
                            bgcolor: "rgb(218, 82, 105)",
                            color: "white",
                          },
                        }}
                        onClick={onButtonClick}
                      >
                        {tier.buttonText}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    </>
  );
};

export default Home;
