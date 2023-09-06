import React from 'react';
import ManagerNavBar from '../NavigationBar/ManagerNavBar';
import StatusOfImplementation30Report from '../Reports/StatusOfImplementation30Report';
import YourOpenAndInProgressTasksReport from '../Reports/YourOpenAndInProgressTasksReport';
import { Accordion, AccordionSummary, AccordionDetails, Typography,Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import ManagerMainSummary from '../Reports/ManagerMainSummary';

const MainView = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
        <ManagerNavBar></ManagerNavBar>
        <p></p>
        <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Summary')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <ManagerMainSummary></ManagerMainSummary>
        </AccordionDetails>
      </Accordion>
      
      <Grid container spacing={4}>
      <Grid item xs={12} sm={8}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Status of the implementation of issues in the last 30 days')}</Typography>
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
          <Typography variant="h6" fontWeight="bold">{t('Your open and in progress tasks')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <YourOpenAndInProgressTasksReport></YourOpenAndInProgressTasksReport>
        </AccordionDetails>
      </Accordion>
      </Grid>
    </Grid>
  </div>
  );
};

export default MainView;
