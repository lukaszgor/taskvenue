import React, { useState, useEffect } from 'react';
import {
    Button,
    Grid,
    Container,
    Typography,Snackbar,Alert,DialogContent,DialogActions,Dialog,DialogTitle,DialogContentText,Select,MenuItem,FormControl,FormControlLabel,InputLabel
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import { useTranslation } from 'react-i18next';
import { format, addHours } from 'date-fns'; 
import supabase from '../../supabaseClient';


const WorkerConfirmationLocation = () => {
    const { t, i18n } = useTranslation();
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');
    const [description, setDescription] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [lastRecordDescription, setLastRecordDescription] = useState(null);
    const [venues, setVenues] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    const typographyStyle = {
        fontSize: '11px', // Zmniejszona czcionka tytułowa
        color: 'red',     // Kolor czerwony
    };


const handleStartClick = () => {
    setDescription('Start');
    getUserLocation('Start', currentDateTime);
  };

  const handleStopClick = () => {
    setDescription('Stop');
    getUserLocation('Stop', currentDateTime);
  };

// pobranie z useState isRunieng

const handleFetchVenues = async (idConfig) => {
    const { data, error } = await supabase
      .from('venues')
      .select()
      .eq('id_configuration', idConfig)
      .is('archived', null);

    if (error) {
      console.log(error);
    }
    if (data) {
        setVenues(data);
    }
  };

    useEffect(() => {
            const getCurrentDateTime = () => {
                const currentDate = new Date();
                const formattedDateTime = format(currentDate, 'dd/MM/yyyy HH:mm'); // Format daty i godziny
                setCurrentDateTime(formattedDateTime);
            };
            getCurrentDateTime();
    },);

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
          getLastRecord(profileData.id_configuration,userID)
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

      const getUserLocation = (description, currentDateTime) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const userLocation = `${latitude},${longitude}`;
              insertWorkTime(description, userLocation, currentDateTime);
            },
            (error) => {
              console.error(error);
              setUserLocation('Unable to retrieve location');
              
              // Wyświetl komunikat o błędzie lokalizacji jako przeglądarkowy alert
              const errorMessage = t('The functionality works correctly only with geolocation enabled in your browser. If you want to make use of the full features, please turn on your location services.') ;
              window.alert(errorMessage);
            }
          );
        } else {
          setUserLocation('Geolocation is not supported by your browser');
          
          // Wyświetl komunikat o braku wsparcia dla geolokalizacji jako przeglądarkowy alert
          const errorMessage = t('Geolocation is not supported by your browser');
          window.alert(errorMessage);
        }
      };

      const insertWorkTime = async (description, userLocation, currentDateTime) => {
        try {
          const { data, error } = await supabase
            .from('location')
            .insert([
              {
                id_configuration: idConfig,
                assigned_user: userID,
                date: currentDateTime,
                description: description,
                gps: userLocation,
                venue:selectedOption
              },
            ]);
          if (error) {
            console.error(error);
            handleClickAlert();
          } else {
            // console.log(data);
            handleClickAlert();
          }
        } catch (error) {
          console.error(error);
          handleClickAlert();
        }
      };

      const getLastRecord = async (idConfig, userID) => {
        try {
          if (!idConfig || !userID) {
   
            return;
          }
      
          const { data, error } = await supabase
            .from('location')
            .select('description')
            .eq('id_configuration', idConfig)
            .eq('assigned_user', userID)
            .order('id', { ascending: false })
            .limit(1)
            .single();
      
          if (error) {
            console.error(error);
          } else {
            setLastRecordDescription(data ? data.description : null);
          }
        } catch (error) {
          console.error(error);
        }
      };
      

      useEffect(() => {
        if (idConfig) {
            handleFetchVenues(idConfig);
            if (userID) {
                getLastRecord(idConfig,userID);
            }
        }

      }, [open,idConfig,userID]);

      const handleChangeVelue = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
      };
  
    return (
        <div>
  <Container maxWidth="md">
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
        <FormControl fullWidth required>
              <InputLabel id="contractor-select-select-label">
                {t('Select venue')}
              </InputLabel>
              <Select
                labelId="contractor-select-label"
                id="contractor-select"
                value={selectedOption}
                onChange={handleChangeVelue}
                label={t('Select venue')}
                required
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300, // Set your desired max height
                    },
                  },
                }}
              >
                {venues.map((venue) => (
                  <MenuItem key={venue.id} value={venue.id}>
                    {venue.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </Grid>
          <Grid item xs={6} sm={6}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayArrowIcon />}
              onClick={handleStartClick}
              disabled={lastRecordDescription === 'Start'|| !selectedOption}
            >
              {t('Start')}
            </Button>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<StopIcon />}
              onClick={handleStopClick}
              disabled={lastRecordDescription === null || lastRecordDescription === 'Stop'|| !selectedOption}
            >
              {t('Stop')}
            </Button>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography style={typographyStyle}>
              <FmdBadIcon></FmdBadIcon>
              {t('Note, when you click the Start and Stop buttons, geolocation data and the current date and time will be downloaded.')}
            </Typography>
          </Grid>
        </Grid>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseAlert}>
          <Alert severity="success"> {t("Updated!")}</Alert>
        </Snackbar>
      </Container>
         
        </div>
    );
};

export default WorkerConfirmationLocation;
