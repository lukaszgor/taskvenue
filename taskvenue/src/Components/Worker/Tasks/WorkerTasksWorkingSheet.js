import React, { useState, useEffect } from 'react';
import {
    Button,
    Grid,
    Container,Box,
    Typography,Snackbar,Alert,DialogContent,DialogActions,Dialog,DialogTitle,DialogContentText,Select,MenuItem,FormControl,FormControlLabel,InputLabel
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import { useTranslation } from 'react-i18next';
import { format, addHours } from 'date-fns'; 
import supabase from '../../../supabaseClient';
import { useParams } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const WorkerTasksWorkingSheet = () => {
    const { t, i18n } = useTranslation();
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');
    const [status, setStatus] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [lastRecordStatus, setLastRecordStatus] = useState(null);
    const [taskStatus, setTaskStatus] = useState(null);
    const [idVenue, setIdVenue] = useState(null);
    const [constatntID, setConstatnID] = useState('');
    const { id } = useParams();

    const typographyStyle = {
        fontSize: '11px', // Zmniejszona czcionka tytułowa
        color: 'red',     // Kolor czerwony
        fontWeight: 'bold'
    };

const handleStartClick = () => {
    setStatus('open');
    getUserLocation('open', currentDateTime);
    handleUpdateStatus('inProgress');

  };

  const handleStopClick = () => {
    setStatus('closed');
    getUserLocation('closed', currentDateTime);
    handleButton();
  };

// pobranie z useState isRunieng


useEffect(() => {
    getCurrentDateTime();
},);
const getCurrentDateTime = () => {
const currentDate = new Date();
const formattedDateTime = format(currentDate, 'dd/MM/yyyy HH:mm'); // Format daty i godziny
setCurrentDateTime(formattedDateTime);
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

      const getUserLocation = (status, currentDateTime) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const userLocation = `${latitude},${longitude}`;

              if(lastRecordStatus ==='open'){
                updateWorkTime(status, userLocation, currentDateTime);
              }else{
                insertWorkTime(status, userLocation, currentDateTime);
              }
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

      const insertWorkTime = async (status, userLocation, currentDateTime) => {
        try {
          const { data, error } = await supabase
            .from('constant_working')
            .insert([
              {
                id_configuration: idConfig,
                assigned_user: userID,
                start_date: currentDateTime,
                status: status,
                start_location: userLocation,
                idTask:id,
                venue:idVenue
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

      const updateWorkTime = async (status, userLocation, currentDateTime) => {
        try {
          const { data, error } = await supabase
          .from('constant_working')
          .update([
            {
              stop_date: currentDateTime,
              status: status,
              stop_location: userLocation,
              venue:idVenue
            },
          ])
          .eq('id', constatntID);
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

      const getLastRecord = async (idConfig, userID,id) => {
        try {
          if (!idConfig || !userID) {
            return;
          }
          const { data, error } = await supabase
            .from('constant_working')
            .select()
            .eq('id_configuration', idConfig)
            .eq('assigned_user', userID)
            .eq('idTask', id)
            .order('id', { ascending: false })
            .limit(1)
            .single();
      
          if (error) {
            console.error(error);
          } else {
            // Sprawdź, czy dane są dostępne, zanim ustawisz stany
            if (data) {
              setLastRecordStatus(data.status);
              setConstatnID(data.id);
            //   getCurrentDateTime();
            }
          }
        } catch (error) {
          console.error(error);
        }
      };
      
      useEffect(() => {
        checkTaskStatus();
            if (userID) {
                getLastRecord(idConfig,userID,id);
            }
      }, [open,idConfig,userID,id]);

  
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

      const checkTaskStatus = async () => {
        const { data, error } = await supabase
          .from('tasks')
          .select('status,id_venue')
          .eq('id_configuration', idConfig)
          .eq('id', id)
          .single();
        if (error) {
          console.log(error);
        }
        if (data) {
          setTaskStatus(data.status);
          setIdVenue(data.id_venue);
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
        <Grid item xs={12} sm={12}>
          <Box display="flex" justifyContent="flex-end">
          <Typography >
          <AccessTimeIcon fontSize='small'></AccessTimeIcon> {currentDateTime}
            </Typography>
          </Box>
          </Grid>
        <Grid item xs={12} sm={12}>
            </Grid>
          <Grid item xs={6} sm={6}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayArrowIcon />}
              onClick={handleStartClick}
              disabled={lastRecordStatus === 'open'|| taskStatus === 'completed'}
            >
              {t('Start')}
            </Button>
          </Grid>
          <Grid item xs={6} sm={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<StopIcon />}
              onClick={handleStopClick}
              disabled={lastRecordStatus === null || lastRecordStatus === 'closed'}
            >
              {t('Stop')}
            </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
          <Box display="flex" justifyContent="center">
            <Typography style={typographyStyle} >
              {t('Note, when you click the Start and Stop buttons, geolocation data and the current date and time will be downloaded.')}
              <FmdBadIcon></FmdBadIcon>
            </Typography>
            </Box>
          </Grid>
        </Grid>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseAlert}>
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

export default WorkerTasksWorkingSheet;
