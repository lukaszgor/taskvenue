import React, { useState, useEffect } from 'react';
import { Card, CardContent,CardActions,Divider, Typography, Button, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'; // Dodaj import TextField
import supabase from '../../supabaseClient';
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GeoLocationMap from '../Common/GeoLocationMap';


const ConstantWorkingSheet = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [fetchError, setFetchError] = useState(null)
  const [workTime, setWorkTime] = useState(null)


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
      fetchWorkTime(idConfig, id)

    }
  }, [idConfig,id]);


  const fetchWorkTime = async (idConfiguration, id) => {
    const { data, error } = await supabase
      .from('constant_working')
      .select(`*,
      venues (
          name,GPS_location
      )`)
      .eq('id_configuration', idConfiguration)
      .eq('assigned_user', id)
      .limit(50); 
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

  const calculateTimeDifference = (startDate, stopDate,status) => {
    if(status === 'closed'){
        const startDateTime = new Date(startDate);
        const stopDateTime = new Date(stopDate);
      
        // Oblicz różnicę czasu w milisekundach
        const timeDifference = stopDateTime - startDateTime;
      
        // Konwertuj różnicę czasu na godziny i minuty
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      
        return `${hours} ${t("hours")} ${minutes} ${t("minutes")}`;
    }else{
        return `${t("No closing date")}`;
    }
  
  };



  return (
    <div>
      <Container maxWidth="md">
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
                {t("Start Date")} {workItem.start_date} 
              </Typography>
              <Typography variant="body2" color="textSecondary">
              {t("End Date")} {workItem.stop_date}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {t("Time Difference")} {calculateTimeDifference(workItem.start_date, workItem.stop_date,workItem.status)}
                </Typography>
              <p></p>
              <Container maxWidth="md">
        <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
        <Typography variant="body2" color="textSecondary">
                {t("Venue")} {workItem.venues?.name}
              </Typography>
              <p></p>
              <GeoLocationMap geoLocation={workItem.venues?.GPS_location} />
              </Grid>
              <Grid item xs={6} sm={6}>
              <Typography variant="body2" color="textSecondary">
                {t("Location indicated by the user")}
              </Typography>
              <p></p>
              <GeoLocationMap geoLocation={workItem.start_location} />
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

