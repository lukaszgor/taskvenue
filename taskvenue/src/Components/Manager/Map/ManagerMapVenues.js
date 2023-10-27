import React, { useState, useEffect } from 'react';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import supabase from '../../../supabaseClient';

const ManagerMapVenues = () => {
  const [center, setCenter] = useState([51.4045, 19.7030]);
  const [zoom, setZoom] = useState(6);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [venues, setVenues] = useState([]);
  const [validVenues, setValidVenues] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null); // Dodany stan dla wybranego markera

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

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

  const fetchVenues = async (idConfig) => {
    const { data, error } = await supabase
      .from('venues')
      .select(`*,
          contractor (
              nameOrCompanyName
          )
      `)
      .eq('id_configuration', idConfig)
      .is('archived', null); ;

    if (error) {
      console.error(error);
    } else {
      // Filtruj tylko poprawne venues i przekształć wartości GPS_location na liczby
      const filteredVenues = data.filter((venue) => {
        if (venue.GPS_location) {
          const [latitude, longitude] = venue.GPS_location.split(',').map(parseFloat);
          venue.GPS_location = { latitude, longitude };
          return !isNaN(latitude) && !isNaN(longitude);
        }
        return false;
      });
      setValidVenues(filteredVenues);
    }
  };

  useEffect(() => {
    if (idConfig) {
      fetchVenues(idConfig);
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

  return (
    <div style={{ width: '100%', height: '75vh' }}>
      <Map center={center} zoom={zoom}>
        <ZoomControl />
        {validVenues.map((venue, index) => (
          <Marker
            color={'#cdb4db'}
            width={50}
            key={index}
            anchor={[venue.GPS_location.latitude, venue.GPS_location.longitude]}
            onClick={({ anchor }) => handleMarkerClick(anchor, venue)} // Dodano venue jako drugi argument
          />
        ))}
      </Map>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle> {selectedMarker ? selectedMarker.name : ''}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Divider textAlign='center'>{t('Description')} </Divider>
          <p></p>
            {selectedMarker ? selectedMarker.description : ''} {/* Wyświetlanie wartości z pola "name" wybranego markera */}
            <p></p>
            <Divider textAlign='center'>{t('Contractor')}</Divider>
            <p></p>
            {selectedMarker ? selectedMarker.contractor?.nameOrCompanyName :''}
          </DialogContentText>
        </DialogContent>
        <Button
  onClick={() => {
    navigate(selectedMarker ? `/VenueDetalils/${selectedMarker.id}` : '/'); // Naviguj do TaskDetails z wykorzystaniem selectedMarker.id lub innej ścieżki
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

export default ManagerMapVenues;
