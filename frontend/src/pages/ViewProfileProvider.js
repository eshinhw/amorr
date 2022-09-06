import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, Container } from "reactstrap";
import { listProviderDetails } from "../actions/providerAction";
import ReactStars from "react-stars";
import SampleGallery from "../components/SampleGallery";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import CustomerCalendar from "../components/CustomerCalendar";

function roundHalf(num1, num2) {
  if (num2 === 0) return 0;
  return Math.round((num1 / num2) * 2) / 2;
}

const ViewProfileProvider = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const providerDetails = useSelector((state) => state.providerDetails);
  const { provider, loading, error } = providerDetails;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listProviderDetails(id));
  }, [dispatch, id]);

  const onClickBookAppointment = () => {
    navigate("/service-list", { state: { name: provider.name, id: provider._id } });
  };

  const rating = {
    size: 30,
    value: roundHalf(provider.totalRating, provider.ratingPopulation),
    edit: false,
  };

  return (
    <div
      className="profile"
      style={{
        display: "flex",
        justifyContent: "left",
        width: "100%",
        paddingTop: "10pt",
        paddingBottom: "30pt",
      }}
    >
      <Box marginLeft={5} marginRight={5} width={1000}>
        <Paper>
          <div>
            <Typography variant="h3" align="center">
              {provider.name}
            </Typography>

            <div className="profile-image">
              <img src={require("../images/barber.jpg")} className="profileImage" />
            </div>

            <div className="provider-stars">
              Current Rating: {roundHalf(provider.totalRating, provider.ratingPopulation)}
            </div>

            <div className="provider-stars">
              <ReactStars alignItems={"center"} {...rating} />
            </div>
            <p className="displayProfileLine">{provider.name}</p>
            <div>
              {/* should pass service info base on _id in db  */}
              <p className="displayProfileLine">{provider.name}</p>
              <p className="displayProfileLine">Service provided two</p>
            </div>
            <br></br>
            <p className="displayProfileLine">{provider.title}</p>
            <p className="displayProfileLine">{provider.address}</p>
            <p className="displayProfileLine">{provider.city}</p>
            <p className="displayProfileLine">{provider.state}</p>
            <p className="displayProfileLine">{provider.country}</p>
          </div>
        </Paper>
      </Box>
      <Container>
        <SampleGallery />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            className="checkout"
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
            style={{ color: "white", backgroundColor: "#e27b7b" }}
            onClick={onClickBookAppointment}
          >
            Book an appointment
          </Button>
        </Box>
      </Container>
    </div>
  );
};
export default ViewProfileProvider;
