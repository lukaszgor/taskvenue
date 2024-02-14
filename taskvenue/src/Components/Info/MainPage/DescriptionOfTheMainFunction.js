import React from 'react';
import { Grid, Typography, Paper, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';


const DescriptionOfTheMainFunction = () => {
  const { t, i18n } = useTranslation();
  const sections = [
    {
      title: t('Multiplatform'),
      description: t('Our app runs smoothly on any device, providing users with a seamless experience regardless of the type of hardware.'),
      imageSrc: 'planning.png',
    },
    {
      title: t('Accessibility'),
      description: t('Provide access to the app to both managers, employees and customers who want to actively participate in the process.'),
      imageSrc: '3mobile.png',
    },
    {
      title: t('Data centralization'),
      description: t('Centralize data collection and store all documentation in one place.'),
      imageSrc: 'collectData.png',
    },
  ];
  return (
    <Container maxWidth="md"> 
    <Grid container spacing={2}>
      {sections.map((section, index) => (
        <Grid item xs={12} md={12} key={index}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <p></p>
                <Typography variant="h4" sx={{
                        mr: 2,
                        mt: 10,
                        // fontFamily: 'lato',
                        fontWeight: 700,
                        textDecoration: 'none',
                        color:"#338ede"
                        
                      }}>{section.title}</Typography>
                <p></p>
                <Typography variant="body1" sx={{  marginBottom: 2 }}>{section.description}</Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <img src={section.imageSrc} alt={section.title} style={{ width: '100%' }} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
    </Container>
  );
};

export default DescriptionOfTheMainFunction;
