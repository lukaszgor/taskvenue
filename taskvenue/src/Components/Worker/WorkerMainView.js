import React from 'react';
import ManagerNavBar from '../NavigationBar/ManagerNavBar';
import StatusOfImplementation30Report from '../Reports/StatusOfImplementation30Report';
import YourOpenAndInProgressTasksReport from '../Reports/YourOpenAndInProgressTasksReport';
import { Accordion, AccordionSummary, AccordionDetails, Typography,Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import WorkerMainSummary from '../Reports/WorkerMainSummary';
import WorkerNavBar from '../NavigationBar/WorkerNavBar';
import WorkerConstantWorkingSheet from './WorkerConstantWorkingSheet';

const WorkerMainView = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
        <WorkerNavBar></WorkerNavBar>
        <p></p>
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Summary')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <WorkerMainSummary></WorkerMainSummary>
        </AccordionDetails>
      </Accordion>
      
      <Grid container spacing={4}>
      {/* <Grid item xs={12} sm={8}>
      </Grid> */}

      {/* <Grid item xs={12} sm={12}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Your open and in progress tasks')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <YourOpenAndInProgressTasksReport></YourOpenAndInProgressTasksReport>
        </AccordionDetails>
      </Accordion>
      </Grid> */}


      <Grid item xs={12} sm={12}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Confirmation of location')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <WorkerConstantWorkingSheet></WorkerConstantWorkingSheet>
        </AccordionDetails>
      </Accordion>
      </Grid>

    </Grid>

  </div>
  );
};

export default WorkerMainView;
