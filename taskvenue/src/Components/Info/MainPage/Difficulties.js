import React from 'react';
import Button from '@mui/material/Button';
import { Divider, List, ListItem, ListItemText, Grid } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const centerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '40vh',
};

const textStyles = {
  color: 'white',
  backgroundColor: '#338ede',
  padding: 5,
};

const Difficulties = () => {
  const { t, i18n } = useTranslation();

  // Lista trudności
  const difficulties = [
    'Brak systemu do zarządzania pracownikami i lokalizacjami, co skutkuje chaosem i brakiem aktualnych informacji.',
    'Brak spójnych danych na temat wcześniejszych prac, co utrudnia analizę historii działań.',
    'Brak jasnych planów prac i możliwości weryfikacji ich wykonalności.',
    'Brak efektywnego przepływu dokumentów oraz problemy komunikacyjne między uczestnikami procesu.',
    'Indywidualne prowadzenie wielu zadań, co generuje chaos.',
    'Brak klarownej informacji o opłacalności współpracy z klientem.',
  ];

  // Style for text
  const listItemStyles = {
    color: 'white',
  };

  return (
    <div style={textStyles}>
      <div style={centerStyles}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" sx={{ mt: 2 }}>
            {t('Prowadzanie firmy usługowej często sprawia trudności ')}
          </Typography>
          <Grid container spacing={1}>
            {difficulties.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={6} >
                <List>
                  <ListItem style={listItemStyles}>
           
                    <ListItemText primary={<><ErrorOutlineIcon /> {item}</>} />
                  </ListItem>
                </List>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" align="center" sx={{ mt: 2 }}>
            {t('Korzystając z naszego narzędzia, rozwiążesz wszystkie te problemy sprawnie i skutecznie.')}
          </Typography>
        </Container>
      </div>
    </div>
  );
};

export default Difficulties;
