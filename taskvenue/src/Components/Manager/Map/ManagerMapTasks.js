import React, { useState, useEffect } from 'react';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TextField, Button, Grid, } from '@mui/material';

import supabase from '../../../supabaseClient';
import moment from 'moment';

const ManagerMapTasks = () => {
  const [center, setCenter] = useState([51.4045, 19.7030]);
  const [zoom, setZoom] = useState(6);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [venues, setVenues] = useState([]);
  const [validTasks, setValidTasks] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null); // Dodany stan dla wybranego markera

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const formatDate = (date) => {
    return moment(date).format('DD.MM.YYYY, HH:mm'); // Parsuj datę do żądanego formatu
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
    }
  };

  const fetchTasks = async (idConfig) => {
    const { data, error } = await supabase
      .from('tasks')
      .select(`*,
          venues (
            GPS_location
          )
      `)
      .eq('id_configuration', idConfig)
      .in('status', ['inProgress', 'open']); 

    if (error) {
      console.error(error);
    } else {
      // Filtruj tylko poprawne venues i przekształć wartości GPS_location na liczby
      const filteredVenues = data.filter((venue) => {
        if (venue.venues.GPS_location) {
          const [latitude, longitude] = venue.venues.GPS_location.split(',').map(parseFloat);
          venue.venues.GPS_location = { latitude, longitude };
          return !isNaN(latitude) && !isNaN(longitude);
        }
        return false;
      });
      setValidTasks(filteredVenues);
    }
  };

  useEffect(() => {
    if (idConfig) {
      fetchTasks(idConfig);
    }
  }, [idConfig]);

  const handleMarkerClick = (anchor, venue) => {
    const newZoom = 15;
    setZoom(newZoom);
    setCenter(anchor);
    setSelectedMarker(venue);
    // Otwórz dialog po kliknięciu na znacznik
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    // Zamknij dialog
    setIsDialogOpen(false);
  };

  const handleMapClick = (e) => {
    // Jeśli użytkownik dwukrotnie kliknie na mapę, zmniejsz zoom
    if (zoom > 5) {
      setZoom(zoom - 1);
    }
  };


  return (
    <div style={{ width: '100%', height: '75vh' }}>

<Grid container spacing={2} maxWidth="md">
      <Grid item xs={6}>
        <TextField
          type="datetime-local"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          margin="normal"
          label={t('Date from : ')}
          focused
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="datetime-local"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          margin="normal"
          label={t('Date to : ')}
          focused
        />
      </Grid>
    </Grid>

      <Map center={center} zoom={zoom} onClick={handleMapClick} touchEvents={true} metaWheelZoom={true}>
        <ZoomControl />
        {validTasks.map((venue, index) => {
  const taskStartDate = moment(venue.kickoffDate);
  const taskEndDate = moment(venue.deadline);

  const selectedStartDate = startDate ? moment(startDate).startOf('minute') : null;
  const selectedEndDate = endDate ? moment(endDate).startOf('minute') : null;

  if (
    (!selectedStartDate || taskStartDate.isSameOrAfter(selectedStartDate)) &&
    (!selectedEndDate || taskEndDate.isSameOrBefore(selectedEndDate))
  ) {
    return (
      <Marker
        color={
          venue.status === 'inProgress'
            ? '#EF8354'
            : venue.status === 'open'
            ? '#B2E8A6'
            : '#cdb4db'
        }
        width={50}
        key={index}
        anchor={[
          venue.venues?.GPS_location.latitude,
          venue.venues?.GPS_location.longitude,
        ]}
        onClick={({ anchor }) => handleMarkerClick(anchor, venue)}
      />
    );
  } else {
    return null;
  }
})}
      </Map>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <p></p>
      <Divider textAlign='right'>{t('ID')} {selectedMarker ? selectedMarker.id : ''}  </Divider>
        <DialogTitle> {selectedMarker ? selectedMarker.name : ''}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Divider textAlign='left'>{t('Date')}  </Divider>
          {selectedMarker ? formatDate(selectedMarker.kickoffDate) : ''}
          <p></p>
          {selectedMarker ? formatDate(selectedMarker.deadline) : ''} 
          <p></p>
          <Divider textAlign='left'>{t('Description')} </Divider>
          <p></p>
            {selectedMarker ? selectedMarker.description : ''} {/* Wyświetlanie wartości z pola "name" wybranego markera */}
            <p></p>
          </DialogContentText>
        </DialogContent>
        <Button
  onClick={() => {
    navigate(selectedMarker ? `/TaskDetails/${selectedMarker.id}` : '/'); // Naviguj do TaskDetails z wykorzystaniem selectedMarker.id lub innej ścieżki
  }}
  color="primary"
>
  {t("More details")}
</Button>
        <Button onClick={closeDialog} color="primary">
        {t("Back")}
        </Button>
      </Dialog>
    </div>
  );
};

export default ManagerMapTasks;
