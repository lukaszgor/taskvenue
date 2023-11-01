import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, Container } from '@mui/material';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import { useTranslation } from 'react-i18next';
const GeoLocationMap = ({ geoLocation }) => {
  const [coordinates, setCoordinates] = useState(null);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (isValidCoordinates(geoLocation)) {
      setCoordinates(geoLocation.split(',').map((coordinate) => parseFloat(coordinate)));
    }
  }, [geoLocation]);

  const isValidCoordinates = (location) => {
    if (!location) return false;
    const coordinates = location.split(',');
    if (coordinates.length !== 2) return false;
    const [latitude, longitude] = coordinates.map((coordinate) => parseFloat(coordinate));
    if (isNaN(latitude) || isNaN(longitude)) return false;
    return true;
  };

  return (
    <div>
<div style={{ width: '100%', height: '40vh',paddingBottom:'10px' }}>
        {isValidCoordinates(geoLocation) ? (
          <Card>
            <CardContent>
              <Map center={coordinates} zoom={15} height={300} >
                <Marker anchor={coordinates} payload={1} onClick={({ event, anchor, payload }) => {}} />
                <ZoomControl />
              </Map>
            </CardContent>

          </Card>
        ) : (
          <Typography variant="body2" color="error">
            {t('Invalid GeoLocation:')} {geoLocation}
          </Typography>
        )}
    </div>
    </div>
  );
};

export default GeoLocationMap;
