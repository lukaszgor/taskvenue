import React, { useState, useEffect } from 'react';
import {
    Button,
    Grid,
    Container,
    Typography,Snackbar,Alert,DialogContent,DialogActions,Dialog,DialogTitle,DialogContentText
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import { useTranslation } from 'react-i18next';
import { format, addHours } from 'date-fns'; 
import supabase from '../../../supabaseClient';
import { useParams } from "react-router-dom";

const WorkerStartAndStop = () => {
    const { t, i18n } = useTranslation();
    const { id } = useParams();
    const [isRunning, setIsRunning] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');
    const [description, setDescription] = useState('');
    const [userLocation, setUserLocation] = useState('');

    const typographyStyle = {
        fontSize: '11px', // Zmniejszona czcionka tytułowa
        color: 'red',     // Kolor czerwony
    };
const start='Start'
const stop='Stop'
    const handleStartClick = () => {
        // Tu możesz umieścić kod, który ma być wywołany po naciśnięciu przycisku "Start"
        setDescription("Start");
        getUserLocation(start,currentDateTime);
        setIsRunning(true);
        handleUpdateStatus('inProgress');
        handleClickAlert();
    };

    const handleStopClick = () => {
        // Tu możesz umieścić kod, który ma być wywołany po naciśnięciu przycisku "Stop"
        setDescription("Stop");
        getUserLocation(stop,currentDateTime);
        setIsRunning(false);
        handleButton();
    };

    useEffect(() => {
        const savedIsRunning = localStorage.getItem('isRunning');
        if (savedIsRunning) {
            setIsRunning(savedIsRunning === 'true');
        }
    }, []);

    // Save the 'isRunning' state to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('isRunning', isRunning.toString());
    }, [isRunning]);

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
        }
      }

      const insertWorkTime = async (description,userLocation,currentDateTime) => {
        const { data, error } = await supabase
          .from('workTime')
          .insert([{ 
            id_configuration: idConfig, 
            description: description, 
            idTask: id, 
            date: currentDateTime, 
            id_user: userID,
            geoLocation: userLocation, // Dodaj geolokalizację
          }]);
        if (error) {
          console.log(error);
        }
        if (data) {
          setDescription("");
        }
      };

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

      const handleUpdateStatus = async (status) => {
        const { data, error } = await supabase
          .from('tasks')
          .update([
            {
              status: status,
            },
          ])
          .eq('id', id);
        if (error) {
          console.log(error);
        }
        if (data) {
          handleClickAlert();
        }
      };


      const [DialogOpen, setDialogOpen] = useState(false); // Dodajemy stan do kontrolowania widoczności dialogu
  
      const handleButton = () => {
          setDialogOpen(true);
      };
  
      const handleConfirm = () => {
   //zmiena statusu
          setDialogOpen(false);
          handleUpdateStatus('completed');
          handleClickAlert();
      };
  
      const handleCancel = () => {
          setDialogOpen(false);
      };

    return (
        <div>
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<PlayArrowIcon />}
                            onClick={handleStartClick}
                            disabled={isRunning}
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
                            disabled={!isRunning}
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
                <Snackbar open={open}
                  autoHideDuration={2000}
                  onClose={handleCloseAlert}>
                  <Alert severity="success"> {t("Updated!")}</Alert>
                </Snackbar>
            </Container>
            <Dialog
                open={DialogOpen}
                onClose={handleCancel}
                aria-labelledby="copy-dialog-title"
                aria-describedby="copy-dialog-description"
            >
                <DialogTitle id="copy-dialog-title">{t('Change Status')}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="copy-dialog-description">
                        {t('Do you want to change the status of the task to closed?')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        {t('Cancel')}
                    </Button>
                    <Button onClick={handleConfirm} color="primary" variant="contained">
                        {t('Yes')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default WorkerStartAndStop;
