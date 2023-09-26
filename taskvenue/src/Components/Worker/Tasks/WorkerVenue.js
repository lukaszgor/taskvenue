import React, { useState, useEffect } from 'react';
import {Grid,Container,Select,MenuItem,FormControl,InputLabel,Typography, Button,Box,  IconButton,} from '@mui/material';
import { useParams } from 'react-router-dom';
import supabase from '../../../supabaseClient';
import { useTranslation } from 'react-i18next';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const WorkerVenue = () => {
    const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [idConfig, setIdConfiguration] = useState('');
  const [selectedVenueId, setSelectedVenueId] = useState('');
  const [userID, setUserID] = useState('');
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);

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
  };

  const handleFetchVenues = async (idConfig) => {
    const { data, error } = await supabase
      .from('venues')
      .select()
      .eq('id_configuration', idConfig);
    if (error) {
      console.log(error);
    }
    if (data) {
      setVenues(data);
    }
  };

  const handleFetchVenueID = async (idConfig) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('id_venue')
      .eq('id_configuration', idConfig);

    if (error) {
      // Handle error if needed
    }
    if (data && data.id_venue !== undefined) {
      setSelectedVenueId(data.id_venue);
    }
  };

  const handleFetchVenueInfo = async (venueId) => {
    const { data, error } = await supabase
      .from('venues')
      .select()
      .eq('id', venueId)
      .single();

    if (error) {
      // Handle error if needed
    }
    if (data) {
      setSelectedVenue(data);
    }
  };
  const handleFetchTask = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('id_venue')
      .eq('id', id)
      .eq('id_configuration', idConfig) 
      .single();
    if (error) {
      // Handle error if needed
    }
    if (data) {
        setSelectedVenueId(data.id_venue);
    }
  };

  useEffect(() => {
    if (idConfig) {
      handleFetchVenueID(idConfig);
      handleFetchVenues(idConfig);
      handleFetchTask();
    }
  }, [idConfig]);

  useEffect(() => {
    if (selectedVenueId) {
      handleFetchVenueInfo(selectedVenueId);
    }
  }, [selectedVenueId]);

  const handleChangeVenue = (event) => {
    const value = event.target.value;
    setSelectedVenueId(value);
    handleUpdateTask(value);
  };

  const handleUpdateTask = async (selectedVenueId) => {
    const { data, error } = await supabase
      .from('tasks')
      .update([
        {
            id_venue: selectedVenueId,
        },
      ])
      .eq('id', id);
    handleClickAlert();
    if (error) {
      console.log(error);
    }
    if (data) {
 
    }
  };

//alert
  const handleClickAlert = () => {
    setOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //redirection to googlemaps
  const handleButtonClickLocation = (selectedVenue) => {
    const locationString = selectedVenue.GPS_location; 
    const [latitude, longitude] = locationString.split(',').map((coordinate) => coordinate.trim());
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(googleMapsUrl);
    console.log('Pole location:', selectedVenue.GPS_location);
  };



  return (
    <div>
      <Container maxWidth="md">
        {/* <Grid item xs={12} sm={6}>
          <FormControl fullWidth disabled>
            <InputLabel id="venue-select-select-label">
              {t('Select Venue')}
            </InputLabel>
            <Select
              labelId="venue-select-label"
              id="venue-select"
              value={selectedVenueId}
              onChange={handleChangeVenue}
              label={t('Select Venue')}
            >
              {venues.map((venue) => (
                <MenuItem key={venue.id} value={venue.id}>
                  {venue.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}
        <p></p>
        {selectedVenue && (
          <Grid item xs={12}>
            <Typography variant="h11">{t('Name')}</Typography>
           <Typography variant="h6">{selectedVenue.name}</Typography>
            <Typography variant="h11">{t('Description')}</Typography>
            <Typography variant="h6">{selectedVenue.description}</Typography>
            <Typography variant="h11">{t('Address')}</Typography>
            <Typography variant="h6">{selectedVenue.GPS_location}</Typography>
            <p></p>

            <Box display="flex" justifyContent="flex-start">
                <Button
                type="submit"
                variant="contained"
                color="success"
                onClick={() => handleButtonClickLocation(selectedVenue)}
                style={{ minWidth: 'auto' }}
                startIcon={<LocationOnIcon />}
                >
            {t('Open in Google Maps')} 
                </Button>
            </Box>
          </Grid>
        )}
                <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleCloseAlert}
        >
          <Alert severity="success">{t('Updated!')}</Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default WorkerVenue;
