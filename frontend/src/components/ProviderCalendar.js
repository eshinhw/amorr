import FullCalendar from '@fullcalendar/react'
import React, { useEffect, forwardRef } from 'react'
import '../css/Calendar.css'
import moment from 'moment';
import alerting from "../components/Alerting";

//plugins
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// TODO: not it fetches all the events in db, it should not work that way.
// suggestion:
// https://stackoverflow.com/questions/43863997/loading-events-to-fullcalendar
// https://fullcalendar.io/docs/events-json-feed

// calendar for provider to view
const ProviderCalendar = forwardRef(({ providerId, addedEvent, setClickStartTime, setAddedEvent }, ref) => {

  // one thing is update event when provider adding it, 
  // so I encode event id to be providerid + starttime then check if it's inside
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
            let title = res[i].title;
            let startTime = res[i].startTime;
            let endTime = res[i].endTime;
            let calendarApi = ref.current.getApi();
            // only events not added and from today and after are displayed
            if (calendarApi.getEventById(providerId + startTime) == null && new Date(moment(new Date()).format("DD MMMM YYYY")) <= new Date(moment.utc(startTime).format("DD MMMM YYYY"))) {
              if(res[i]?.customerId != null){
                // notify provider that is reserved. with diff color
                calendarApi.addEvent({
                  id: providerId + startTime,
                  title: "reserved!\n" + title,
                  start: startTime,
                  end: endTime,
                  color: '#6b6bff'
                });  
              } else {
                // add event normally
                calendarApi.addEvent({
                  id: providerId + startTime,
                  title: title,
                  start: startTime,
                  end: endTime,
                  color: '#ff6b6b'
                });  
              }
            }
          }
        })
    }
    fetchCalendar()
  }, [addedEvent])

  // drag add event
  const handleDateSelect = async (e) => {
    let title = prompt('Please enter a title for your booking: ')

    let calendarApi = e.view.calendar
    calendarApi.unselect() // clear date selection
    
    var start = moment.utc(e.startStr).toDate();
    var end = moment.utc(e.endStr).toDate();
    if (title) {
      calendarApi.addEvent({
        title,
        start: providerId + start,
        end: end,
        allDay: e.allDay,
        color: '#ff6b6b',
        editable: false,            //set to false (difficult to handle dragging)
      })
      // store in db
      let event = {
        providerId: providerId, title: title, startTime: start,
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
          setClickStartTime(moment.utc(e.startStr).toDate().toISOString());
          setAddedEvent(start);
          alerting('Successfully scheduled available times');
        }
      })
    }
  }

  // if no toISOString, it would not match the data retrieve from mongodb, which cause search event by id failed.
  function click(e) {
    setClickStartTime(moment.utc(e.event.startStr).toDate().toISOString());
  }
  return (
    <div className={"providerSchedule"}>
      <FullCalendar
        ref={ref}
        aspectRatio={2}
        plugins={[timeGridPlugin, interactionPlugin]}
        allDaySlot={false}
        initialView="timeGridWeek"
        eventClick={click}
        selectable={true}
        contentHeight="auto"
        timeZone={false}
        select={handleDateSelect}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: true
        }}
        eventOverlap={false}
      />
    </div>

  )



});


export default ProviderCalendar;