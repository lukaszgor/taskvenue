import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import { useTranslation } from 'react-i18next';

const GeoLocationConstantWorkingSheet = ({ venue, start, stop }) => {
  const { t } = useTranslation();
  const [markers, setMarkers] = useState([]);
  const markerColors = ['#FF0000', '#00FF00', '#0000FF']; // Lista kolorów dla trzech parametrów

  useEffect(() => {
    const venues = [venue, start, stop];

    const validMarkers = venues
      .filter((location) => location && isValidCoordinates(location))
      .map((location, index) => {
        const coordinates = location.split(',').map((coordinate) => parseFloat(coordinate));
        return { coordinates, color: markerColors[index] }; // Przypisanie koloru do markera
      });

    setMarkers(validMarkers);
  }, [venue, start, stop]);

  const isValidCoordinates = (location) => {
    const coordinates = location.split(',');
    if (coordinates.length !== 2) return false;
    const [latitude, longitude] = coordinates.map((coordinate) => parseFloat(coordinate));
    return !isNaN(latitude) && !isNaN(longitude);
  };

  return (
    <div>
      <div style={{ width: '100%', height: '40vh', paddingBottom: '10px' }}>
        {markers.length > 0 ? (
          <Card>
            <CardContent>
              <Map center={markers[0].coordinates} zoom={15} height={300}>
                {markers.map((marker, index) => (
                  <Marker key={index} anchor={marker.coordinates} payload={index + 1} color={marker.color} />
                ))}
                <ZoomControl />
              </Map>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="body2" color="error">
            {t('Invalid GeoLocation')}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default GeoLocationConstantWorkingSheet;
