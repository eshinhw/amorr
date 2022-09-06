import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment';
import alerting from "../components/Alerting";


const ProviderOrderCard = ({ order, completed, setCompletedClicked }) => {
  let calendar_id = order?.calendar_id;
  let service_id = order?.service_id;
  let order_id = order?._id;

  // helper of useeffect below retireve customer info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addr, setAddr] = useState("");
  const [email, setEmail] = useState("");
  async function getCustomer(customerId) {
    await fetch(`/api/customers/${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then((res) => {
        setFirstName(res.firstName)
        setLastName(res.lastName)
        setAddr(res?.defaultAddress)
        setEmail(res?.email)
      })
  }
  // helper of useeffect below retireve service info
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

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
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
          setEndTime(moment.utc(res?.endTime).format('HH:mm on DD MMM, YYYY'));
          getCustomer(res?.customerId);
          getService(service_id);
        })
    }
    handleGetInfo();
  }, [])



  async function updateCompleted(serviceId) {
    await fetch(`/api/orders/completed/` + serviceId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then((res) => {
        alerting("completed this order!")
        setCompletedClicked(res?._id)
      })
  }

  return (
    <div id="order-history-card">
      <div className="order-history-elem">
        <div className="search-result-text">
          <h3>{startTime} to {endTime}</h3>
          <p className='no-margin-bottom'>customer: {firstName} {lastName}</p>
          {/* only in progress orders showing */}
          {completed ? <></> :
            <>
              <p className='no-margin-bottom'>
                contact: {email}
              </p>
              {addr == "" ?
                <p className='no-margin-bottom'>
                  This customer has not provided the address.
                </p>
                :
                addr
              }
            </>
          }
          <p>service: {serviceName}, price: {servicePrice}$(CAD)</p>
        </div>
        {completed ? (
          <></>
        ) : (
          <button id="view-reservation" onClick={() => updateCompleted(order_id)} style={{ border: "none", cursor: "pointer" }}>
            Order Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default ProviderOrderCard;
