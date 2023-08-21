import React from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Przykładowe wydarzenie',
    start: new Date(),
    end: new Date(),
  },
  // ... więcej wydarzeń ...
];


const Schedule = () => {
    return (
        <div>
            <ManagerNavBar></ManagerNavBar>
            <p>Schedule</p>
            <div style={{ height: '500px' }}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
      </div>
      );
};

export default Schedule;