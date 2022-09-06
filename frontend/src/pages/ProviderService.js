import React, { useState, useEffect, useRef } from 'react'
import {
  Card,
  Form
} from "reactstrap";
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import useAuth from '../Authentication/useAuth';
import moment, { duration } from 'moment';
import '../css/ProviderService.css';
import alerting from "../components/Alerting";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faTrash } from '@fortawesome/free-solid-svg-icons';
// TODO have bug of drag create schedule and delete would not refresh the calendar of removing
const ProviderService = () => {
  const [data, setData] = useState({
    provider: "",
    name: "",
    description: "",
    price: "",
    duration: "1 Hr"
  });

  const { auth } = useAuth();
  let providerId = auth?._id;

  // list of services retrieve from db
  const [services, setServices] = useState([]);

  // increment when add service or delete service
  const [count, setCount] = useState(0);

  // used on exclamation mark
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };
  const onLeave = () => {
    setHover(false);
  };

  const handleChange = (input, fieldName) => {
    setData({ ...data, [fieldName]: input });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(data.price)) {
      alerting("please filled price with only number", "danger")
    } else {
      await fetch("/api/services/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => res.json())
        .then((res) => {
          if (!res?._id) {
            alerting(res?.message, "danger")
          } else {
            alerting("successfully added");
            setCount(addService => addService + 1);
          }
        });
    }
  }


  const handleDelete = async (providerId) => {
    await fetch("/api/services/" + providerId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then((res) => {
        alerting(res.message)
        setCount(count => count + 1)
      })
  }

  useEffect(() => {
    handleChange(providerId, "provider");
    async function fetchService() {
      await fetch('/api/services/provider/' + providerId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
  }, [count]);

  return (
    <div className={'provider-service '}>
      <div className='provider-service-half'>
        <Card className={'serviceCard service-background-color'}>
          <FontAwesomeIcon
            icon={faExclamation}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className="provider-service-icon"
          />
          <h1 style={{ marginBottom: 0 }} >Your Services: </h1>
          {hover ? <div>note: customer select one of the services then order</div> : ""}
          {services.length == 0 ?
            <div>please add some services...</div>
            :
            <>
              {services.map((service) => {
                return (
                  <div key={service?._id} className={"service-block center"}>
                    <div className="service-block-text">
                      <h3>name: {service?.name}</h3>
                      <p>{service?.description}</p>
                      <p>{service?.price} $(CAD), {service?.duration}</p>
                    </div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDelete(service?._id)}
                      className="provider-service-icon"
                    />
                  </div>
                );
              })}
            </>
          }
        </Card>
      </div>
      <div className='provider-service-half'>
        <Card className={'serviceCard'}>
          <Form onSubmit={handleSubmit.bind(this)}>
            <h1 style={{ marginBottom: 0 }} >add a service </h1>
            <input
              className={"In In90"}
              type="text"
              placeholder="Enter Service Name"
              onChange={(e) => handleChange(e.target.value, "name")}
              required
            />
            <input
              className={"In In90"}
              type="text"
              placeholder="Enter Service Description"
              onChange={(e) => handleChange(e.target.value, "description")}
              required
            />
            <input
              className={"In In90"}
              type="text"
              placeholder="Enter Service Price (canada dollar)"
              onChange={(e) => handleChange(e.target.value, "price")}
              required
            />
            <div className={"center"} style={{ width: "100%", marginTop: "10pt" }}>
              <Dropdown
                style={{ width: "100%" }}
                placeholder="1 Hr"
                options={['1 Hr', '2 Hrs', '3 Hrs', '4 Hrs', '5 Hrs', '6 Hrs', '7 Hrs', '8 Hrs', '9 Hrs', '10 Hrs', '11 Hrs', '12 Hrs', 'more than 12 Hrs']}
                value={data.duration}
                onChange={(option) => handleChange(option.value, "duration")}
              />
            </div>
            <button type="submit" className={"Button"}>
              Add Service
            </button>
          </Form>
        </Card>
      </div>
    </div>
  )
};


export default ProviderService;