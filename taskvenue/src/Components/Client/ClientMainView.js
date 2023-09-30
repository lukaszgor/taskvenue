import React from 'react';
import ClientNavBar from '../NavigationBar/ClientNavBar';
import { Accordion, AccordionSummary, AccordionDetails, Typography,Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import ManagerMainSummary from '../Reports/ManagerMainSummary';


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
          <ManagerMainSummary></ManagerMainSummary>
        </AccordionDetails>
      </Accordion>
      
      <Grid container spacing={4}>
      <Grid item xs={12} sm={8}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Rapor2')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          raport
        </AccordionDetails>
      </Accordion>
      </Grid>

      <Grid item xs={12} sm={4}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Raport 1')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
        raport
        </AccordionDetails>
      </Accordion>
      </Grid>
    </Grid>
  </div>
  );
};

export default ClientMainView;
