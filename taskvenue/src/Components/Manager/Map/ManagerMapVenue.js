import React, { useState, useEffect } from 'react';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import supabase from '../../../supabaseClient';
import { useParams } from 'react-router-dom';

const ManagerMapVenue = () => {
  const [center, setCenter] = useState([51.4045, 19.7030]);
  const [zoom, setZoom] = useState(15);
  const { id } = useParams();
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [venues, setVenues] = useState([]);
  const [validVenues, setValidVenues] = useState([]);

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
      .select('id_configuration, id, GPS_location')
      .eq('id_configuration', idConfig)
      .eq('id', id);
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

  useEffect(() => {
    if (validVenues.length > 0) {
      // Jeśli istnieją poprawne venues, ustaw centrum na pierwszy rekord z validVenues
      const firstVenue = validVenues[0];
      const newCenter = [firstVenue.GPS_location.latitude, firstVenue.GPS_location.longitude];
      setCenter(newCenter);
    }
  }, [validVenues]);

  return (
    <div style={{ width: '100%', height: '40vh' }}>
      <Map center={center} zoom={zoom}>
        <ZoomControl />
        {validVenues.map((venue, index) => (
          <Marker
            color={'#cdb4db'}
            width={50}
            key={index}
            anchor={[venue.GPS_location.latitude, venue.GPS_location.longitude]}
          />
        ))}
      </Map>
    </div>
  );
};

export default ManagerMapVenue;
