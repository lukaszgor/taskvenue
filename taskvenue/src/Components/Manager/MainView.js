import React, { useState, useEffect } from 'react';
import ManagerNavBar from '../NavigationBar/ManagerNavBar';
import StatusOfImplementation30Report from '../Reports/StatusOfImplementation30Report';
import YourOpenAndInProgressTasksReport from '../Reports/YourOpenAndInProgressTasksReport';
import { Accordion, AccordionSummary, AccordionDetails, Typography,Grid,Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import ManagerMainSummary from '../Reports/ManagerMainSummary';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import WorkerConstantWorkingSheet from '../Worker/WorkerConstantWorkingSheet';
import ManagerConstantWorkingSheetRaport from '../Reports/ManagerConstantWorkingSheetRaport';
import supabase from '../../supabaseClient';


const MainView = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [hiddenSimpleLocationConfirmation, setHiddenSimpleLocationConfirmation] = useState(null);
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

  useEffect(() => {
    const fetchConfig = async () => {
        const { data, error } = await supabase
            .from('configurations')
            .select('hiddenSimpleLocationConfirmation')
            .eq('id', idConfig)
            .single();

        if (error) {
            console.log(error);
        } else if (data) {
            setHiddenSimpleLocationConfirmation(data.hiddenSimpleLocationConfirmation);
        }
    };

    if (idConfig) {
        fetchConfig();
    }
}, [idConfig]);


const addNewTask = () => {
  navigate('/AddNewTask');
};



  return (
    <div>
        <ManagerNavBar></ManagerNavBar>
        <p></p>
      <Button
        style={{ marginLeft: '20px', marginBottom: '20px' }}
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        onClick={addNewTask}
        startIcon={<AddIcon />}
      >
      {t('New task')}
      </Button>


      <p></p>
      {hiddenSimpleLocationConfirmation == 1 && (
        <Grid item xs={12} sm={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">{t('Confirmation of location')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <WorkerConstantWorkingSheet />
            </AccordionDetails>
          </Accordion>
        </Grid>
      )}

      <p></p>
      
      <Grid container spacing={4}>
      <Grid item xs={12} sm={8}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Status of the implementation of issues')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <StatusOfImplementation30Report></StatusOfImplementation30Report>
        </AccordionDetails>
      </Accordion>
      </Grid>


      <Grid item xs={12} sm={4}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Confirmation of time')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <ManagerConstantWorkingSheetRaport></ManagerConstantWorkingSheetRaport>
        </AccordionDetails>
      </Accordion>
      </Grid>
    </Grid>
<p></p>
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Summary')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <ManagerMainSummary></ManagerMainSummary>
        </AccordionDetails>
      </Accordion>
      </Grid>

      <Grid item xs={12} sm={6}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Your open and in progress tasks')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <YourOpenAndInProgressTasksReport></YourOpenAndInProgressTasksReport>
        </AccordionDetails>
      </Accordion>
      </Grid>
      </Grid>


   <p></p>


  </div>
  );
};

export default MainView;
