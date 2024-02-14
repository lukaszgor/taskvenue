import React, { useState, useEffect } from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import supabase from '../../supabaseClient';
import { Calendar, momentLocalizer,Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';
import ScheduleLegend from '../../Components/Common/Legends/ScheduleLegend';
import { useTranslation } from 'react-i18next';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ManagerScheduleBreadcrumbs from '../../Components/Breadcrumbs/mainBreadcrumbs/ManagerScheduleBreadcrumbs';
import AddIcon from '@mui/icons-material/Add';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const Schedule = () => {
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const { t, i18n } = useTranslation();
  const [selectedUser, setSelectedUser] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [deadline, setDeadline] = useState('');
  const [kickoff, setKickoff] = useState('');

  var defaultMessages = {
    date: t("Date"),
    time: t("Time"),
    event: t("Event"),
    allDay: t("All Day"),
    week: t("Week"),
    work_week: t("Work Week"),
    day: t("Day"),
    month: t("Month"),
    previous: t("Back"),
    next: t("Next"),
    yesterday: t("Yesterday"),
    tomorrow: t("Tomorrow"),
    today: t("Today"),
    agenda: t("Agenda"),
    noEventsInRange: t("There are no events in this range."),
    showMore: function showMore(total) {
      return "+" + total +" "+t("More");
    }
  };

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
    if (event.type === "absence") {
      navigate(`/AbsenceDetails/${event.id}`);
    } else {
      navigate(`/TaskDetails/${event.id}`);
    }
  };

  const addNewTask = () => {
    navigate('/AddNewTask');
  };
  
  const addNewAbsence = () => {
    navigate('/AddNewAbsence');
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
  };

  const handleFetchUsers = async (idConfig) => {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id_configuration', idConfig)
      .in('profile_type', ['manager', 'worker'])
      .is('isBlocked', null);

    if (error) {
      console.log(error);
    }
    if (data) {
      setProfiles(data);
    }
  };

  const handleUserChange = (event) => {
    const newSelectedUser = event.target.value;
    setSelectedUser(newSelectedUser);
    fetchEvents(idConfig, newSelectedUser);
  };

  const fetchEvents = async (idConfig, selectedUser = '') => {
    let absencesQuery = supabase.from('absences').select('*').eq('id_configuration', idConfig).eq('status', 'approved');
    let tasksQuery = supabase.from('tasks').select('*').eq('id_configuration', idConfig);

    if (selectedUser) {
      absencesQuery = absencesQuery.eq('id_owner_user', selectedUser);
      tasksQuery = tasksQuery.eq('asigned_user', selectedUser);
    }

    const { data: absencesData, error: absencesError } = await absencesQuery;
    const { data: tasksData, error: tasksError } = await tasksQuery;

    if (absencesError || tasksError) {
      console.error(absencesError || tasksError);
    } else {
      const absencesEvents = absencesData.map(absence => ({
        title: {
          vacation: t("Vacation"),
          sickleave: t("Sick leave")
        }[absence.typeOfAbsence],
        start: new Date(absence.kickoffDate),
        end: new Date(absence.finishDate),
        allDay: false,
        status: absence.typeOfAbsence,
        id: absence.id,
        type: 'absence'
      }));

      const tasksEvents = tasksData.map(task => ({
        title: task.name,
        start: new Date(task.kickoffDate),
        end: new Date(task.deadline),
        allDay: false,
        status: task.status,
        id: task.id,
        type: 'task'
      }));

      const allEvents = [...absencesEvents, ...tasksEvents];
      setEvents(allEvents);
    }
  };

  useEffect(() => {
    if (idConfig) {
      handleFetchUsers(idConfig);
      fetchEvents(idConfig, selectedUser);
    }
  }, [idConfig, selectedUser]);

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
      case 'vacation':
        backgroundColor = '#8d99ae';
        break;
      case 'sickleave':
        backgroundColor = '#7A5980';
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
  const minTime = new Date();
  minTime.setHours(6, 0, 0); // Ustawia godzinę na 8:00 rano

  const maxTime = new Date();
  maxTime.setHours(23, 0, 0); // Ustawia godzinę na 23:00 wieczorem

  const handleUpdateTask = async (start,end,id) => {
    const { data, error } = await supabase
      .from('tasks')
      .update([
        {
          kickoffDate: start,
          deadline: end,
        },
      ])
      .eq('id', id);
    if (error) {
      console.log(error);
    }
    if (data) {
     
    }
  };
  const handleUpdateAbsences = async (start,end,id) => {
    const { data, error } = await supabase
      .from('absences')
      .update([
        {
          kickoffDate: start,
          finishDate: end,
        },
      ])
      .eq('id', id);
    if (error) {
      console.log(error);
    }
    if (data) {
     
    }
  };

const handleEventResize = ({ event, start, end }) => {
  const formattedStart = moment(start).format("YYYY-MM-DDTHH:mm");
  const formattedEnd = moment(end).format("YYYY-MM-DDTHH:mm");
  const id = event.id;
  
  // Update the event in the state
  const updatedEvents = events.map((e) =>
    e.id === id
      ? { ...e, start: new Date(formattedStart), end: new Date(formattedEnd) }
      : e
  );
  setEvents(updatedEvents);
  
  // Call API to update event in the database if needed
  handleUpdateTask(formattedStart, formattedEnd, id);
  handleUpdateAbsences(formattedStart, formattedEnd, id);
};

const handleEventDrop = ({ event, start, end }) => {
  const formattedStart = moment(start).format("YYYY-MM-DDTHH:mm");
  const formattedEnd = moment(end).format("YYYY-MM-DDTHH:mm");
  const id = event.id;

  // Update the event in the state
  const updatedEvents = events.map((e) =>
    e.id === id
      ? { ...e, start: new Date(formattedStart), end: new Date(formattedEnd) }
      : e
  );
  setEvents(updatedEvents);

  // Call API to update event in the database if needed
  handleUpdateTask(formattedStart, formattedEnd, id);
  handleUpdateAbsences(formattedStart, formattedEnd, id);
};


  return (
    <div>
      <ManagerNavBar />
      <ManagerScheduleBreadcrumbs />
      <p></p>
      <div>
        <Button style={{ marginLeft: '20px', marginBottom: '20px' }} type="submit" variant="contained" color="primary" onClick={addNewTask} startIcon={<AddIcon />}>
          {t("Add task")}
        </Button>
        <Button style={{ marginLeft: '20px', marginBottom: '20px' }} type="submit" variant="contained" color="primary" onClick={addNewAbsence} startIcon={<AddIcon />}>
          {t("Add absence")}
        </Button>
        <FormControl style={{ marginLeft: '20px' }}>
          <InputLabel id="type-select-label">
            {t('Select User')}
          </InputLabel>
          <Select
            label={t('Select User')}
            labelId="type-select-label"
            value={selectedUser}
            onChange={handleUserChange}
            style={{ width: "250px" }}
          >
            <MenuItem value="">{t("All users")}</MenuItem>
            {profiles.map(profile => (
              <MenuItem key={profile.id} value={profile.id}>{profile.username}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <p></p>
      </div>
      {/* <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventClick}
          min={minTime}
          max={maxTime}
          messages={defaultMessages}
        />
      </div> */}
      <p></p>
      <div style={{ height: '1000px' }}>
      <DnDCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventClick}
          min={minTime}
          max={maxTime}
          messages={defaultMessages}
          resizable
          defaultView="week"
          onEventResize={handleEventResize}
          onEventDrop={handleEventDrop}

/>
      </div>
      <ScheduleLegend />
    </div>
  );
};

export default Schedule;
