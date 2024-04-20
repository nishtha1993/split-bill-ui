import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([
    {
      id: 0,
      title: 'Team Meeting',
      start: moment().startOf('month').add(7, 'days').toDate(),
      end: moment().startOf('month').add(7, 'days').toDate(),
      allDay: true
    },
    {
      id: 1,
      title: 'Doctor Appointment',
      start: moment().startOf('month').add(14, 'days').toDate(),
      end: moment().startOf('month').add(14, 'days').toDate(),
      allDay: true
    }
  ]);

  const handleAddEvent = (title: string, date: Date): void => {
    const newEvent = {
      id: events.length,
      title,
      start: date,
      end: date,
      allDay: true
    };
    setEvents([...events, newEvent]);
  };

  return (
    <div style={{ height: 700 , marginTop:'3em'}}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;
