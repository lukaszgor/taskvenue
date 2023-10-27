import React, { useState, useEffect } from 'react';
import { Card, CardContent,CardActions, Typography, Button, Grid, Container, Box, Snackbar, Alert, Accordion, AccordionSummary, AccordionDetails, TextField } from '@mui/material'; // Dodaj import TextField
import styled from 'styled-components';
import supabase from '../../../supabaseClient';
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { format } from 'date-fns';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const DateInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
`;

const WorkerWorkingTime = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [fetchError, setFetchError] = useState(null)
  const [workTime, setWorkTime] = useState(null)
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(0);
  const [fullTime, setFullTime] = useState(0);
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [status, setStatus] = useState('');
  const [userLocation, setUserLocation] = useState('');

  const handleDateTimeChange = (event) => {
    setSelectedDateTime(event.target.value);
  };

  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (selectedDateTime) {
      const formattedDate = format(new Date(selectedDateTime), 'dd/MM/yyyy HH:mm');
      setFormattedDate(formattedDate);
    }
  }, [selectedDateTime]);

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
  }, [idConfig]);

  useEffect(() => {
    if (workTime) {
      const calculatedFullTotal = workTime.reduce((acc, serviceItem) => acc + serviceItem.time, 0);
      setFullTime(calculatedFullTotal);
    }
  }, [workTime]);

  const handleSubmit = (event) => {
    event.preventDefault();
    insertWorkTime();
  };

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

  const insertWorkTime = async () => {
    const { data, error } = await supabase
      .from('workTime')
      .insert([{ 
        id_configuration: idConfig, 
        time: time, 
        description: description, 
        idTask: id, 
        date: formattedDate, 
        id_user: userID,
        geoLocation: userLocation, // Dodaj geolokalizację
      }]);
    handleClickAlert();
    fetchWorkTime(idConfig, id);
    if (error) {
      console.log(error);
    }
    if (data) {
      setDescription("");
      setTime(0);
    }
  };
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

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation(`${latitude},${longitude}`);
      }, (error) => {
        console.error(error);
        setUserLocation('Unable to retrieve location');
      });
    } else {
      setUserLocation('Geolocation is not supported by your browser');
    }
  };

   //redirection to googlemaps
   const handleButtonClickLocation = (selectedVenue) => {
    const [latitude, longitude] = selectedVenue.split(',').map((coordinate) => coordinate.trim());
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(googleMapsUrl);
  };


  return (
    <div>
      <div>
        <p></p>
        <div>
          <div>
            {fetchError && <p>{fetchError}</p>}
            {workTime && (
              <div>
                <div style={{ textAlign: 'right' }}>
                  <Typography variant="h6">
                    {t('Summary')}: {fullTime} <AccessTimeOutlinedIcon fontSize='medium' />
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </div>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight="bold">{t('Add')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography></Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Container maxWidth="md">
                <Typography variant="h4" align="center" gutterBottom>
                  <p></p>
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={t("Description")}
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      style={{ marginRight: '10px' }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={t("Time")}
                      value={time}
                      onChange={(event) => setTime(event.target.value)}
                      style={{ marginRight: '10px' }}
                      type="number"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <label>{t('Location')}</label>
                  <TextField
                    value={userLocation}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>{t('Date')}</label>
                  <DateInput
                    type="datetime-local"
                    value={selectedDateTime}
                    onChange={handleDateTimeChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* Add the "Get Geolocation" button here */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={getUserLocation}
                  >
                    {t('Get Location')}
                  </Button>
                </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        type="submit"
                        disabled={status === 'completed'}
                        variant="contained"
                        color="primary"
                        style={{ minWidth: 'auto' }}
                      >
                        {t('Submit')}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                <div>
                </div>
                <Snackbar open={open}
                  autoHideDuration={2000}
                  onClose={handleCloseAlert}>
                  <Alert severity="success"> {t("Updated!")}</Alert>
                </Snackbar>
              </Container>
            </form>
          </AccordionDetails>
        </Accordion>

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
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {workTime.map((workItem) => (
                    <Card
                key={workItem.id}
                style={{
                    margin: '10px',
                    maxWidth: '100%', 
                    width: '100%', 
                    display: 'flex',
                    justifyContent: 'space-between', 
                }}
                >
  <CardContent>
    <Typography variant="h6">
      {workItem.description}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      {t("Time")} {workItem.time}
    </Typography>
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
    disabled={status === 'completed'}
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
                ))}
              </div>
            </div>
          )}
        </div>
        </Container>
        </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default WorkerWorkingTime;
