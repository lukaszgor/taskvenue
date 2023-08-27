import React, { useState, useEffect } from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import supabase from '../../supabaseClient';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';
import ScheduleLegend from '../../Components/Common/ScheduleLegend';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
const localizer = momentLocalizer(moment);

const Schedule = () => {

    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');
    const [tasks, setTasks] = useState([]);
    const [events, setEvents] = useState([]);
    const { t, i18n } = useTranslation();

        useEffect(() => {
            const checkSession = async () => {
              const { data } = await supabase.auth.getSession();
              if (data.session) {
                setUserID(data.session.user.id);
                fetchData(data.session.user.id);
              }
            };
            checkSession();
          }, []);
          
          const navigate = useNavigate();

          const handleEventClick = (event) => {
            navigate(`/TaskDetails/${event.id}`); 
          };
          const addNewTask = () => {
            navigate('/AddNewTask')
        };


          const fetchData = async (userId) => {
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('id_configuration')
                .eq('id', userId)
                .single();
            if (profileError) {
                console.log(profileError);
            } else if (profileData) {
                setIdConfiguration(profileData.id_configuration);
            }
        }
     useEffect(() => {
            if (idConfig) {
                fetchTasks(idConfig);
            }
          }, [idConfig]);

          const fetchTasks = async (idConfig) => {
            const { data, error } = await supabase
              .from('tasks')
              .select('name, kickoffDate, deadline, status,id')
              .eq('id_configuration', idConfig);
      
            if (error) {
              console.error(error);
            } else {
              const formattedEvents = data.map(task => ({
                title: task.name,
                start: task.kickoffDate,
                end: task.deadline,
                allDay: true,
                status:task.status,
                id:task.id
              }));
              setEvents(formattedEvents);  
            }
          };
    

          const eventStyleGetter = (event) => {
            const eventStatus = event.status.toLowerCase();
            let backgroundColor = '';
        
            switch (eventStatus) {
              case 'completed':
                backgroundColor = '#87CEEB';
                break;
              case 'inprogress':
                backgroundColor = '#EF8354';
                break;
              case 'open':
                backgroundColor = '#B2E8A6';
                break;
              default:
                backgroundColor = 'gray';
            }
            return {
              style: {
                backgroundColor,
              },
            };
          };
        
    return (
        <div>
            <ManagerNavBar></ManagerNavBar>
            <p></p><p></p>
            <Button  style={{ marginLeft: '20px',marginBottom: '20px' }} type="submit" variant="contained" color="primary"  onClick={addNewTask} >
                {t("Add")}
              </Button>
            <div style={{ height: '500px' }}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      eventPropGetter={eventStyleGetter} 
      onSelectEvent={handleEventClick}
    />
  </div>
  <p></p>
  <ScheduleLegend></ScheduleLegend>
      </div>
      );
};

export default Schedule;