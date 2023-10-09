import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; 

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

const TryAboutus = () => {
    const { t, i18n } = useTranslation();
  return (
    <div style={centerStyles}>
      <Container maxWidth="md">
        {/* <Typography variant="h4" gutterBottom style={contentStyles}>
          Nagłówek
        </Typography> */}
        <Typography variant="body1" paragraph style={contentStyles}>
        {t("We have worked hard to incorporate the best combination of business elements into applications for service businesses, and to make working with complex software tools as simple as possible. We are always looking for innovative and efficient approaches so that the system is as useful as possible.")}
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/knowledge">
            <Button variant="contained" color="primary">
              {t("Learn more")}
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default TryAboutus;
