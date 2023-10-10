import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next';
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
    const { t, i18n } = useTranslation();
  return (
    <div style={centerStyles}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom style={contentStyles}>
          Oprogramowanie dla firm usługowych
        </Typography>
        <Typography variant="h6" paragraph style={contentStyles}>
        Prowadź swoją firmę tak wydajnie, jak to możliwe. Zoptymalizuj swój czas i zwiększ przychody swojej firmy dzięki Task Venue. Wypróbuj wersję demo, aby już teraz ocenić wszystkie zalety naszego oprogramowania.
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/infocontact">
            <Button variant="contained" color="primary">
              {t("Contact")}
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default TryInfo;
