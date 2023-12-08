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
  background:'#f0f8ff'
};

const contentStyles = {
  textAlign: 'center',
  padding: '16px', // Estetyczne odstępy
};

const Problems = () => {
    const { t, i18n } = useTranslation();
  return (
    <div style={centerStyles}>
      <Container maxWidth="md">
      <Typography variant="h5" gutterBottom style={contentStyles} sx={{
                        mr: 2,
                        mt: 5,
                        // fontFamily: 'lato',
                        fontWeight: 700,
                        textDecoration: 'none',
                        
                      }} >
      {t('Key functionalities')}
        </Typography>
        <Accordion  >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider> {t('Monitoring the time and location of employees')}</Divider>
</AccordionSummary>
<AccordionDetails>
{t('The application makes it possible to track the time and exact location of employees while performing tasks. This solves the problem of supervising and controlling the work of the team, and allows for effective time management.')}
</AccordionDetails>
</Accordion>

<Accordion  >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>{t('Managing places and contractors')}</Divider>
</AccordionSummary>
<AccordionDetails>
{t('By recording task locations and aggregating data by contractor, the application provides tools to effectively manage clients and service locations. This allows for better planning of activities and focus on key business areas.')}
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>{t('Accurate billing of clients')}</Divider>
</AccordionSummary>
<AccordionDetails>
{t('With the ability to record where and when tasks were completed, the application allows customers to be billed accurately only for services actually completed. This eliminates inaccuracies in billing and builds trust between the company and customers.')}
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>{t('Effective communication with employees')}</Divider>
</AccordionSummary>
<AccordionDetails>
{t('The task dictionary allows employees to clearly understand what tasks they are supposed to complete. This eliminates misunderstandings and facilitates effective communication within the team, which is crucial for effective project implementation.')}
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>{t('Planning and scheduling tasks')}</Divider>
</AccordionSummary>
<AccordionDetails>
{t('With the scheduling module, the application supports forward planning of activities. Monitoring employee absenteeism and tasks in real time allows flexible schedule adjustments, eliminating problems associated with inefficient use of resources.')}
</AccordionDetails>
</Accordion>


<p></p>
      </Container>
    </div>
  );
};

export default Problems;
