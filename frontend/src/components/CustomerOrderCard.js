import { Card, CardBody } from 'reactstrap';
import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment';
import alerting from "./Alerting";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";


const CustomerOrderCard = ({ order, completed }) => {
  const navigate = useNavigate();
  let calendar_id = order?.calendar_id;
  let service_id = order?.service_id;
  let order_id = order?._id;
  let rated = order?.rated;

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // helper of useeffect below retrieve provider info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  async function getProvider(providerId) {
    await fetch(`/api/providers/${providerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then((res) => {
        setName(res?.name)
        setEmail(res?.email)
      })
  }
  // helper of useeffect below retrieve service info
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  async function getService(serviceId) {
    await fetch(`/api/services/` + serviceId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then((res) => {
        setServiceName(res?.name)
        setServicePrice(res?.price)
      })
  }

  // usage: show calendar info
  useEffect(() => {
    const handleGetInfo = async (e) => {
      await fetch(`/api/calendars/timeslot/` + calendar_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => res.json())
        .then((res) => {
          setStartTime(moment.utc(res?.startTime).format('HH:mm'));
          setEndTime(moment.utc(res?.endTime).format('HH:mm, DD MMM, YYYY'));
          getProvider(res?.providerId);
          getService(service_id);
        })
    }
    handleGetInfo();
  }, [])


  const onClickWriteReview = () => {
    navigate("/reviews", {
      state: { name: name, providerId: order?.provider_id, customerId: order?.customer_id, orderId: order?._id },
    });
  };

  return (
    <div id="order-history-card">
      <div className="order-history-elem">
        <div className="search-result-text">
          <h3>{startTime} to {endTime}</h3>
          <p className='no-margin-bottom'>provider: {name}</p>
          {completed ? <></> :
            <>
              <p className='no-margin-bottom'>
                contact: {email}
              </p>
            </>
          }
          <p>service: {serviceName}, price: {servicePrice}$(CAD)</p>
        </div>
        {rated ? (<></>) : (
          <button id="view-reservation" onClick={onClickWriteReview} style={{ border: "none", cursor: "pointer" }}>
            Write a Review
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomerOrderCard;
