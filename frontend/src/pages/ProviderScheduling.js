import React, { useState, useEffect, useRef } from 'react'
import ProviderCalendar from '../components/ProviderCalendar';
import {
  Card,
} from "reactstrap";
import { Dropdown } from 'react-dropdown-now';

import 'react-dropdown-now/style.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField } from '@mui/material'
import useAuth from '../Authentication/useAuth';
import moment from 'moment';
import '../css/ProviderScheduling.css';
import '../css/providerRegister.css'
import alerting from "../components/Alerting";

// TODO have bug of drag create schedule and delete would not refresh the calendar of removing
const ProviderScheduling = () => {

  const { auth } = useAuth();
  let providerId = auth?._id;
  const [addedEvent, setAddedEvent] = useState("");
  const [clickStartTime, setClickStartTime] = useState("");
  const ref = useRef(null);

  // add event
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [duration, setDuration] = useState("1 Hr");
  async function postTimeslot() {
    if (date == "" || hour == "") {
      alerting("please select both date and time(hour)", "danger");
    }
    else {
      let detail = moment.utc(date).format('DD-MMM-YYYY') + " " + moment(hour).format('HH:mm');
      var start = moment.utc(detail).toDate();
      var end = moment.utc(detail).add(parseInt(duration.charAt(0)), 'hours').toDate();

      // store in db
      let event = {
        providerId: providerId, title: "Available", startTime: start,
        endTime: end
      }

      await fetch("/api/calendars", {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res.ok) {
          alerting(`Server Error`);
        } else {
          setAddedEvent(start);
          alerting('Successfully scheduled available times');
        }
      })

    }
  }


  async function deleteTimeslot() {
    await fetch(`/api/calendars/timeslot/${providerId}/${clickStartTime}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(async (res) => {
        if (res._id) {
          await fetch("/api/calendars/timeslot", {
            method: "DELETE",
            body: JSON.stringify(res),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            if (!res.ok) {
              alerting(`Server Error`);
            } else {
              alerting('Successfully deleted timeslot');
              let calendarApi = ref.current.getApi();
              calendarApi.getEventById(providerId + clickStartTime).remove();
              setClickStartTime("");
            }
          })
        } else {
          alerting(`Server Error`);
        }
      })
  }

  // helper of useeffect below retireve customer info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
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
        setEmail(res.email)
        setAddress("Address: " + res?.defaultAddress)
        if (res?.defaultAddress == "") {
          setAddress("Hasn't set the address... Email contact?")
        }
      })
      .catch(err => {

      })
  }

  // usage: show customer info
  useEffect(() => {
    const handleGetInfo = async (e) => {
      await fetch(`/api/calendars/timeslot/${providerId}/${clickStartTime}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => res.json())
        .then((res) => {
          setTime(moment.utc(res?.startTime).format('HH:mm') + " to " + moment.utc(res?.endTime).format('HH:mm on MMMM DD, YYYY'));
          setTitle(res.title);
          if (res.customerId != undefined) {
            getCustomer(res.customerId);
          } else {
            setFirstName("")
            setLastName("")
            setEmail("")
            setAddress("")
          }
        })
    }
    // prevent throw error when just entered to the page
    if (clickStartTime != "")
      handleGetInfo();
  }, [clickStartTime])

  return (
    <div className={'provider-scheduling center'}>
      <div className='provider-scheduling-left'>
        {/* providerid for calendar to know who, addedEvent to refresh event when adding
            and refer to get api of event and delete when decided to do so. */}
        <ProviderCalendar providerId={providerId} addedEvent={addedEvent} ref={ref} setClickStartTime={setClickStartTime} setAddedEvent={setAddedEvent} />
      </div>
      <div className='provider-scheduling-right'>
        <Card className={'scheduleCard all-width'}>

          <h1 >Set Available Time</h1>
          <h5 className='no-margin'>note1: you can directly click and hold cursor to set available time</h5>
          <h5 className='no-margin'>note2: one timeslot - one customer to reserve</h5>
          <div className='fixed-width'>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
              <TimePicker
                value={hour}
                onChange={(newValue) => {
                  setHour(newValue);
                }}
                renderInput={(params) => <TextField size="small"{...params} />}
              />
            </LocalizationProvider>
            <div className={'provider-scheduling center'}>

              <h2 className='no-margin'>For: </h2>
              <Dropdown
                className='no-margin'
                placeholder="1 Hr"
                options={["1 Hr", "2 Hrs", "3 Hrs", "4 Hrs", "5 Hrs", "6 Hrs"]}
                value={duration}
                onChange={(option) => setDuration(option.value)}
              />
            </div>

            <div className='center'>
              <button className='Button' onClick={postTimeslot}>add</button>
            </div>
          </div>


          {clickStartTime ? (
            <div className='to-left'>
              {firstName ? (
                <>
                  <h1>Reservation Info:</h1>
                  <h2>{title}</h2>
                  <h2>{"Customer: " + firstName + " " + lastName}</h2>
                  <h2>{"Email: " + email}</h2>
                  <h2>{address}</h2>
                  <h2>{time}</h2>
                </>
              ) : (
                <>
                  <h1>Reservation Info:</h1>
                  <h2>{title}</h2>
                  <h2>{time}</h2>
                  <h5>no one reserved yet.</h5>
                </>
              )}
              <button className='Button' onClick={deleteTimeslot}>cancel this one?</button>
            </div>
          ) : <div></div>
          }
        </Card>

      </div>
    </div>

  )



};


export default ProviderScheduling;