import React, { useState, useEffect } from 'react';
import { Card, CardContent,CardActions,Divider,TextField, Typography, Button, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'; // Dodaj import TextField
import supabase from '../../supabaseClient';
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GeoLocationMap from '../Common/GeoLocationMap';
import GeoLocationConstantWorkingSheet from '../Common/GeoLocationConstantWorkingSheet';

const ConstantWorkingVenueSheet = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [workTime, setWorkTime] = useState(null);

  const [daysAgo, setDaysAgo] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // State to store the total sum of time differences
  const [totalTimeDifference, setTotalTimeDifference] = useState({ hours: 0, minutes: 0 });

  useEffect(() => {
    // Ustawienie domyślnej wartości dla Date from (31 dni temu)
    const defaultDaysAgo = new Date();
    defaultDaysAgo.setDate(defaultDaysAgo.getDate() - 31);
    const formattedDefaultDaysAgo = defaultDaysAgo.toISOString().split('T')[0] + 'T00:00';
  
    // Ustawienie domyślnej wartości dla Date to (aktualny dzień + 1 dzień)
    const defaultCurrentDate = new Date();
    defaultCurrentDate.setDate(defaultCurrentDate.getDate() + 1);
    const formattedDefaultCurrentDate = defaultCurrentDate.toISOString().split('T')[0] + 'T23:59';
  
    setDaysAgo(formattedDefaultDaysAgo);
    setCurrentDate(formattedDefaultCurrentDate);
  }, []);



  useEffect(() => {
    if (workTime) {
      // Calculate the total sum of time differences for closed work items
      const { totalHours, totalMinutes } = workTime
        .filter((workItem) => workItem.status === 'closed')
        .reduce(
          (sum, workItem) => {
            const timeDifference = calculateTimeDifference(
              workItem.start_date,
              workItem.stop_date,
              workItem.status
            );

            if (!isNaN(timeDifference)) {
              // Add the hours and minutes separately
              sum.totalHours += Math.floor(timeDifference / 60);
              sum.totalMinutes += timeDifference % 60;
            }

            return sum;
          },
          { totalHours: 0, totalMinutes: 0 }
        );

      // Update the state with the total sum
      setTotalTimeDifference({ hours: totalHours, minutes: totalMinutes });
    }
  }, [workTime]);

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
      fetchWorkTime(idConfig, id,daysAgo, currentDate)

    }
  }, [idConfig,id,daysAgo, currentDate]);


  const fetchWorkTime = async (idConfiguration, id,fromDate, toDate) => {
    const { data, error } = await supabase
      .from('constant_working')
      .select(`*,
      venues (
          name,GPS_location
      ),profiles(username)`)
      .eq('id_configuration', idConfiguration)
      .eq('venue', id).gte('created_at', fromDate).lte('created_at', toDate);
 
      
    if (error) {
      console.log(error)
      setWorkTime(null)
      setFetchError(t("No work time"))
    }
    if (data) {
      setWorkTime(data)
      setFetchError(null)
    }
  }

  const calculateTimeDifference = (startDate, stopDate, status) => {
    if (status === 'closed') {
      // Convert date strings to the format 'YYYY-MM-DDTHH:mm'
      const convertToValidFormat = (dateString) => {
        const [date, time] = dateString.split(' ');
        const [day, month, year] = date.split('/');
        const [hours, minutes] = time.split(':');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };
  
      const startDateTime = new Date(convertToValidFormat(startDate));
      const stopDateTime = new Date(convertToValidFormat(stopDate));
  
      // Check if the dates are valid
      if (isNaN(startDateTime) || isNaN(stopDateTime)) {
        console.error('Invalid date format');
        return NaN;
      }
  
      // Calculate the time difference in minutes
      const timeDifference = (stopDateTime - startDateTime) / (1000 * 60);
  
      return timeDifference;
    } else {
      return 0; // Return 0 for open items or items with no closing date
    }
  };
  



  return (
    <div>
      <Container maxWidth="md">
      <Grid container spacing={2}>
      <Grid item xs={6} sm={6} md={6} lg={6}>
          <TextField
            type="datetime-local"
            id="daysAgo"
            value={daysAgo}
            onChange={(e) => setDaysAgo(e.target.value)}
            fullWidth
            margin="normal"
            label={t('Date from : ')}
            focused
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <TextField
            type="datetime-local"
            id="currentDate"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            fullWidth
            margin="normal"
            label={t('Date to : ')}
            focused
          />
        </Grid>
        </Grid>
        <p></p>
      <Typography variant="h7" gutterBottom>
          {t('Total amount of time for closed positions')}: {totalTimeDifference.hours} {t('hours')} {totalTimeDifference.minutes} {t('minutes')}
        </Typography>

        <p></p>
          <Container maxWidth="md">
          <div>
  {fetchError && (<p>{fetchError}</p>)}
  {workTime && (
    <div>
      <p> </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
        {workTime.sort((a, b) => b.id - a.id).map((workItem) => (
          <Grid item xs={12} sm={6} md={12} lg={12} key={workItem.id}>
          <Card>
            <CardContent>
            <Grid container alignItems="center" justifyContent="space-between">
          </Grid>
          <Divider textAlign='right'>{t("Status")} : {workItem.status === 'open' ? t("Open") : workItem.status === 'closed' ? t("Closed") : ''}</Divider>
              <Typography variant="body2" color="#00FF00">
                {t("Start Date")}: {workItem.start_date} 
              </Typography>
              <Typography variant="body2" color="#0000FF">
              {t("End Date")}: {workItem.stop_date}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {t("Time Difference")}: {calculateTimeDifference(workItem.start_date, workItem.stop_date,workItem.status)}
                </Typography>
                <Typography variant="body2" color="#FF0000">
                {t("Venue")}: {workItem.venues?.name}
              </Typography>
              <Typography variant="body2">
                {t("User")}: {workItem.profiles?.username}
              </Typography>
              <p></p>
              <Container maxWidth="md">
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>

              <GeoLocationConstantWorkingSheet
                venue={workItem.venues?.GPS_location}
                start={workItem.start_location}
                stop={workItem.stop_location}
              ></GeoLocationConstantWorkingSheet>
              </Grid>
              </Grid>
              </Container>
            </CardContent>
          </Card>
          </Grid>
        ))}
      </div>
    </div>
  )}
</div>
        </Container>

      </Container>
    </div>
  );
};

export default ConstantWorkingVenueSheet;

