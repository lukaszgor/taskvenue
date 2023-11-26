import React from 'react';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const centerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '40vh', // Ustawia wysokość na całą dostępną wysokość okna przeglądarki
};

const contentStyles = {
  textAlign: 'center',
  padding: '16px', // Estetyczne odstępy
};

const TargetCompany = () => {
    const { t, i18n } = useTranslation();
  return (
    <div style={centerStyles}>
      <Container maxWidth="md">
      <Typography variant="h5" gutterBottom style={contentStyles}>

        </Typography>
        <Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>{t('Service industry')}</Divider>
</AccordionSummary>
<AccordionDetails>
{t('Companies offering various types of services, such as cleaning, maintenance, repair, etc., can use this app to better organize their work and monitor results.')}
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>{t('Real estate operation')}</Divider>
</AccordionSummary>
<AccordionDetails>
{t('This application can be used by property management companies to monitor and manage tasks related to building maintenance, repairs, inspections, cleaning, etc.')}
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>{t('Technical service')}</Divider>
</AccordionSummary>
<AccordionDetails>
{t('Companies providing maintenance services for various equipment and machinery can use this app to record equipment locations, assign maintenance tasks and track work progress.')}
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>{t('Agriculture')}</Divider>
</AccordionSummary>
<AccordionDetails>
{t('In agriculture, this application can be used to manage farm work, plan and monitor tasks related to cultivation, irrigation and plant care.')}
</AccordionDetails>
</Accordion>

<p></p>
      </Container>
    </div>
  );
};

export default TargetCompany;
