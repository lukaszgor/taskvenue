import React from 'react';
import ClientNavBar from '../NavigationBar/ClientNavBar';
import { Accordion, AccordionSummary, AccordionDetails, Typography,Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import ClientMainSummary from '../Reports/ClientMainSummary';
import ClientStatusOfImplementation30Report from '../Reports/ClientStatusOfImplementation30Report';
import ClientOpenAndInProgressTasksReport from '../Reports/ClientOpenAndInProgressTasksReport';


const ClientMainView = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
        <ClientNavBar></ClientNavBar>
        <p></p>
        <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Summary')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <ClientMainSummary></ClientMainSummary>
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
          <ClientStatusOfImplementation30Report></ClientStatusOfImplementation30Report>
        </AccordionDetails>
      </Accordion>
      </Grid>

      <Grid item xs={12} sm={4}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Open tasks')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
        <ClientOpenAndInProgressTasksReport></ClientOpenAndInProgressTasksReport>
        </AccordionDetails>
      </Accordion>
      </Grid>
    </Grid>
  </div>
  );
};

export default ClientMainView;
