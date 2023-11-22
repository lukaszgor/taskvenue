import React from 'react';
import { Grid, Typography, Paper, Container } from '@mui/material';

const sections = [
  {
    title: 'Multiplatformowość',
    description: 'Nasza aplikacja jest dostępna na wielu platformach, co zapewnia płynne działanie na każdym urządzeniu, umożliwiając użytkownikom swobodne korzystanie bez względu na rodzaj sprzętu.',
    imageSrc: 'planning.png',
  },
  {
    title: 'Dostępność',
    description: 'Zapewnij dostęp do aplikacji zarówno menedżerom, pracownikom, jak i klientom, którzy chcą aktywnie uczestniczyć w procesie.',
    imageSrc: '3mobile.png',
  },
  {
    title: 'Centralizacja danych',
    description: 'Centralizuj zbieranie danych i przechowuj całą dokumentację w jednym miejscu.',
    imageSrc: 'collectData.png',
  },
];

const DescriptionOfTheMainFunction = () => {
  return (
    <Container maxWidth="md"> 
    <Grid container spacing={2}>
      {sections.map((section, index) => (
        <Grid item xs={12} md={12} key={index}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <p></p>
                <Typography variant="h5">{section.title}</Typography>
                <p></p>
                <Typography variant="body1">{section.description}</Typography>
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
