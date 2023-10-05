import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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

const TryInfo = () => {
  return (
    <div style={centerStyles}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom style={contentStyles}>
          Nagłówek
        </Typography>
        <Typography variant="body1" paragraph style={contentStyles}>
          Pierwsza linia tekstu  Pierwsza linia tekstu  Pierwsza linia tekstu  Pierwsza linia tekstu  Pierwsza linia tekstu  Pierwsza linia tekstu  Pierwsza linia tekstu
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary">
            Przycisk
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default TryInfo;
