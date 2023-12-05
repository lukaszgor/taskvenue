import React, { useState, useEffect } from 'react';
import { Card, CardContent,CardActions, Typography, Button, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'; // Dodaj import TextField
import supabase from '../../supabaseClient';
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GeoLocationMap from '../Common/GeoLocationMap';


const ConfirmationLocation = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [fetchError, setFetchError] = useState(null)
  const [workTime, setWorkTime] = useState(null)


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

  
  useEffect(() => {
    if (idConfig) {
      fetchWorkTime(idConfig, id)

    }
  }, [idConfig,id]);


  const fetchWorkTime = async (idConfiguration, id) => {
    const { data, error } = await supabase
      .from('location')
      .select(`*,
      venues (
          name,GPS_location
      )`)
      .eq('id_configuration', idConfiguration)
      .eq('assigned_user', id)
      .limit(50); 
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



  return (
    <div>
      <Container maxWidth="md">
        <p></p>
          <Container maxWidth="md">
          <div>
  {fetchError && (<p>{fetchError}</p>)}
  {workTime && (
    <div>
      <p> </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
        {workTime.sort((a, b) => b.id - a.id).map((workItem) => (
          <Grid item xs={12} sm={6} md={12} lg={12} key={workItem.id}>
          <Card>
            <CardContent>
            <Grid container alignItems="center" justifyContent="space-between">
            <Typography variant="h6">{workItem.description}</Typography>
          </Grid>
              <Typography variant="body2" color="textSecondary">
                {t("Date")} {workItem.date}
              </Typography>
              {/* <Typography variant="body2" color="textSecondary">
                {t("Location")} {workItem.geoLocation}
              </Typography> */}
              <p></p>
              <Container maxWidth="md">
        <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
        <Typography variant="body2" color="textSecondary">
                {t("Venue")} {workItem.venues?.name}
              </Typography>
              <p></p>
              <GeoLocationMap geoLocation={workItem.venues?.GPS_location} />
              </Grid>
              <Grid item xs={6} sm={6}>
              <Typography variant="body2" color="textSecondary">
                {t("Location indicated by the user")}
              </Typography>
              <p></p>
              <GeoLocationMap geoLocation={workItem.gps} />
              </Grid>

              </Grid>
              </Container>
            </CardContent>
          </Card>
          </Grid>
        ))}
      </div>
    </div>
  )}
</div>
        </Container>

      </Container>
    </div>
  );
};

export default ConfirmationLocation;

