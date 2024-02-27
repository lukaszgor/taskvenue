import React from 'react';
import { Card, CardContent, Typography, Link, List, ListItem, ListItemText,Grid,Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

const containerStyle = {
    maxWidth: 'md',
    padding:'10px'
  };
  
  const paperStyle = {
    padding: '20px',
  };

const FieldManagmentSystem = () => {
    const { t, i18n } = useTranslation();

  return (
    <div>
    <Container maxWidth="md" style={containerStyle}>
<Typography variant="h4" gutterBottom sx={{
                    mr: 2,
                    mt: 2,
                    // fontFamily: 'lato',
                    fontWeight: 700,
                    textDecoration: 'none',
                    color:"#338ede"
                    
                  }} align="center"> 
  {t('Field Service Management')}
    </Typography>
  <Grid container spacing={2}>
    <Grid item xs={12}>
    <Typography variant="body1" align="center">
    {t('Field work management (FSM) systems enable the organisation and monitoring of offsite tasks, which is key to the effective management of mobile teams.')}
        </Typography>
    </Grid>

  </Grid>
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6} md={6} lg={6}>
    <Card sx={{ m: 2, bgcolor: 'background.paper' }}>
      <CardContent>
        <Typography variant="h6" color="#338ede" align="center" >
        {t('Benefits')}
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary={t('Improvement of Efficiency and Productivity of Mobile Workers')}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={t('Increased Visibility and Control Over Field Work')} />
          </ListItem>
          <ListItem>
            <ListItemText primary={t('Optimization of Routes and Schedules')} />
          </ListItem>
          <ListItem>
            <ListItemText primary={t('Improvement of Communication and Information Flow')} />
          </ListItem>
        </List>
        </CardContent>
        </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
        <Card sx={{ m: 2, bgcolor: 'background.paper' }}>
      <CardContent>
        <Typography variant="h6" color="#338ede" align="center">
        {t('Applications')}
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary={t('Management of Tasks and Service Orders')} />
          </ListItem>
          <ListItem>
            <ListItemText primary={t('Monitoring of Work Progress and Worker Localization')} />
          </ListItem>
          <ListItem>
            <ListItemText primary={t('Management of Schedules and Worker Availability')} />
          </ListItem>
          <ListItem>
            <ListItemText primary={t('Data Collection and Reporting from the Field')} />
          </ListItem>
        </List>
        </CardContent>
        </Card>
        </Grid>
        </Grid>
        <Typography  variant="body1" color="text.primary" paragraph align="center">
{t('TaskVenue is an FSM system that facilitates the management of mobile teams, providing tools for effective planning, monitoring and analysis of fieldwork')}
        </Typography>

</Container>


    </div>

  );
};

export default FieldManagmentSystem;
