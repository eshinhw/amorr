import FullCalendar from '@fullcalendar/react'
import React, { useEffect, useRef } from 'react'
import useAuth from '../Authentication/useAuth';
import '../css/Calendar.css'
import moment from 'moment';

//plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// TODO: not it fetches all the events in db, it should not work that way.
// suggestion:
// https://stackoverflow.com/questions/43863997/loading-events-to-fullcalendar
// https://fullcalendar.io/docs/events-json-feed


// calendar of provider for customer to view
const CustomerCalendar = ({ providerId, setScheduleData }) => {
  const { auth } = useAuth();
  let customerId = auth?._id;
  const inputEl = useRef(null);

  useEffect(() => {
    async function fetchCalendar() {
      await fetch("/api/calendars/calendar/" + providerId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res => res.json())
      .then(res => {
        for (var i = 0; i < res.length; i++) {
          // only add events that no customer reserved
          if (res[i].customerId == undefined && new Date(moment.utc(new Date()).format("DD MMMM YYYY")) <= new Date(moment.utc(res[i].startTime).format("DD MMMM YYYY"))) {
            let title = res[i].title;
            let startTime = res[i].startTime;
            let endTime = res[i].endTime;
            let calendarApi = inputEl.current.getApi();
            calendarApi.addEvent({
              title: title,
              start: startTime,
              end: endTime,
              color: '#ff6b6b'
            });
          }
        }
      })
    }
    fetchCalendar()
  }, [providerId])


  const handleBook = async (e) => {
    if (window.confirm("Do you want to reserve this booking?")) {
      setScheduleData({"customerId":customerId, "start":e.event.startStr});
    }
  };

  return (
    <FullCalendar
      ref={inputEl}
      aspectRatio={2}
      plugins={[timeGridPlugin, interactionPlugin]}
      allDaySlot={false}
      initialView="timeGridWeek"
      eventClick={handleBook}
      selectable={false}
      contentHeight='auto'
      timeZone={false}
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
        meridiem: true,
      }}
      eventOverlap={false}
    />
  );
};

export default CustomerCalendar;
