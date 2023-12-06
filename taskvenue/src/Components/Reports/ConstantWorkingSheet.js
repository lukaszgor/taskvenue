import React, { useState, useEffect } from 'react';
import { Card, CardContent,CardActions,Divider,TextField, Typography, Button, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'; // Dodaj import TextField
import supabase from '../../supabaseClient';
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GeoLocationMap from '../Common/GeoLocationMap';
import GeoLocationConstantWorkingSheet from '../Common/GeoLocationConstantWorkingSheet';

const ConstantWorkingSheet = () => {
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
      )`)
      .eq('id_configuration', idConfiguration)
      .eq('assigned_user', id).gte('created_at', fromDate).lte('created_at', toDate);
 
      
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
      const startDateTime = new Date(startDate);
      const stopDateTime = new Date(stopDate);
  
      // Check if the dates are valid
      if (isNaN(startDateTime) || isNaN(stopDateTime)) {
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
              <Typography variant="body2" color="textSecondary">
                {t("Start Date")}: {workItem.start_date} 
              </Typography>
              <Typography variant="body2" color="textSecondary">
              {t("End Date")}: {workItem.stop_date}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {t("Time Difference")}: {calculateTimeDifference(workItem.start_date, workItem.stop_date,workItem.status)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                {t("Venue")}: {workItem.venues?.name}
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

export default ConstantWorkingSheet;

