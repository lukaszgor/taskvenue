import React, { useState, useEffect } from 'react';
import { Card, CardContent,CardActions, Typography, Button, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'; // Dodaj import TextField
import supabase from '../../../supabaseClient';
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';



const ManagerWorkingTimeEdit = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [fetchError, setFetchError] = useState(null)
  const [workTime, setWorkTime] = useState(null)
  const [fullTime, setFullTime] = useState(0);
  const [status, setStatus] = useState('');




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
  const handleFetchDataStatus = async (idConfig, id) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('status')
      .eq('id', id)
      .eq('id_configuration', idConfig)
      .single();
    if (error) {
      console.error(error);
    }
    if (data) {
      setStatus(data.status);
    }
  };
  
  useEffect(() => {
    if (idConfig) {
      fetchWorkTime(idConfig, id)
      handleFetchDataStatus(idConfig, id);
    }
  }, [idConfig,id]);

  useEffect(() => {
    if (workTime) {
      const calculatedFullTotal = workTime.reduce((acc, serviceItem) => acc + serviceItem.time, 0);
      setFullTime(calculatedFullTotal);
    }
  }, [workTime]);



  const DeleteWorktime = async (event, cellValues) => {
    const { data, error } = await supabase
      .from('workTime')
      .delete().eq('id', cellValues.row.id);
    handleClickAlert();
    fetchWorkTime(idConfig, id);
    if (error) {
      console.log(error)
    }
    if (data) {

    }
  }

  const fetchWorkTime = async (idConfiguration, id) => {
    const { data, error } = await supabase
      .from('workTime')
      .select(`*,
        profiles:profiles(username) as profiles_username
        `)
      .eq('idTask', id)
      .eq('id_configuration', idConfiguration);
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

  const [open, setOpen] = useState(null)

  const handleClickAlert = () => {
    setOpen(true);
  };

   //redirection to googlemaps
   const handleButtonClickLocation = (selectedVenue) => {
    const [latitude, longitude] = selectedVenue.split(',').map((coordinate) => coordinate.trim());
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(googleMapsUrl);
  };


  return (
    <div>
      <Container maxWidth="md">
        <p></p>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight="bold">{t('Working time')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
            <Typography variant="h6">{workItem.description}</Typography>
          </Grid>
              <Typography variant="body2" color="textSecondary">
                {t("Date")} {workItem.date}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {t("User")} {workItem.profiles.username}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {t("Location")} {workItem.geoLocation}
              </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              startIcon={<LocationOnIcon />}
              onClick={() => handleButtonClickLocation(workItem.geoLocation)}
              style={{ minWidth: 'auto' }}
            >
              {t('Open in Google Maps')}
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={(event) => {
                DeleteWorktime(event, { row: { id: workItem.id } });
              }}
            >
              {t("Delete")}
            </Button>
            </CardActions>
          </Card>
          </Grid>
        ))}
      </div>
    </div>
  )}
</div>
        </Container>
        </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
};

export default ManagerWorkingTimeEdit;

