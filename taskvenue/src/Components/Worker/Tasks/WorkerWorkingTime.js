import React, { useState, useEffect } from 'react';
import { Card, CardContent,CardActions,Divider,TextField, Typography, Button, Grid, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'; // Dodaj import TextField
import supabase from '../../../supabaseClient';
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GeoLocationConstantWorkingSheet from '../../Common/GeoLocationConstantWorkingSheet';

const WorkerWorkingTime = () => {
  const { t, i18n } = useTranslation();
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [workTime, setWorkTime] = useState(null);
  const { id } = useParams();

  // State to store the total sum of time differences

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
      fetchWorkTime(idConfig,userID,id)

    }
  }, [idConfig, userID,id]);


  const fetchWorkTime = async (idConfiguration,userID,id) => {
    const { data, error } = await supabase
      .from('constant_working')
      .select(`*,
      profiles (
          username
      ),venues (name,GPS_location)`)
      .eq('id_configuration', idConfiguration)
      .eq('idTask', id)
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
          </Grid>
          <Divider textAlign='right'>{t("Status")} : {workItem.status === 'open' ? t("Open") : workItem.status === 'closed' ? t("Closed") : ''}</Divider>
          <Typography variant="body2" color="#00FF00">
                {t("Start Date")}: {workItem.start_date} 
              </Typography>
              <Typography variant="body2" color="#0000FF">
              {t("End Date")}: {workItem.stop_date}
              </Typography>
              <Typography variant="body2" color="#FF0000">
                {t("Venue")}: {workItem.venues?.name}
              </Typography>
              <Typography variant="body2">
                {t("User")}: {workItem.profiles?.username}
              </Typography>
              <p></p>
              <Container maxWidth="md">
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>

              <GeoLocationConstantWorkingSheet
                venue={workItem.venues?.GPS_location}
                start={workItem.start_location}
                stop={workItem.stop_location}
              ></GeoLocationConstantWorkingSheet>
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

export default WorkerWorkingTime;

