import React, { useState, useEffect } from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import supabase from '../../supabaseClient';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);

const Schedule = () => {


    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');
    const [tasks, setTasks] = useState([]);
    const [events, setEvents] = useState([]);
    
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
              .select('name, kickoffDate, deadline')
              .eq('id_configuration', idConfig);
      
            if (error) {
              console.error(error);
            } else {
              const formattedEvents = data.map(task => ({
                title: task.name,
                start: task.kickoffDate,
                end: task.deadline,
              }));
              
              setEvents(formattedEvents);  // Zapisz sformatowane wydarzenia do stanu
            }
          };
    
       
    return (
        <div>
            <ManagerNavBar></ManagerNavBar>
            <p></p><p></p>
            <div style={{ height: '500px' }}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={['month','agenda']} 
    />
  </div>
      </div>
      );
};

export default Schedule;