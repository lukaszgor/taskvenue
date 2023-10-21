import React from 'react';
import Button from '@mui/material/Button';
import { Divider, List, ListItem, ListItemText, Grid } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const centerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '40vh',
};

const contentStyles = {
  textAlign: 'center',
  padding: '16px',
};

const Difficulties = () => {
  const { t, i18n } = useTranslation();

  // Lista trudności
  const difficulties = [
 "Brak systemu do zarządzania pracownikami i lokalizacjami, co skutkuje chaosem i brakiem aktualnych informacji.",
 "Brak spójnych danych na temat wcześniejszych prac, co utrudnia analizę historii działań.",
 "Brak jasnych planów prac i możliwości weryfikacji ich wykonalności.",
 "Brak efektywnego przepływu dokumentów oraz problemy komunikacyjne między uczestnikami procesu.",
 "Indywidualne prowadzenie wielu zadań, co generuje chaos.",
 "Brak klarownej informacji o opłacalności współpracy z klientem."
  ];

  // Podziel listę na dwie kolumny
  const halfLength = Math.ceil(difficulties.length / 2);
  const column1 = difficulties.slice(0, halfLength);
  const column2 = difficulties.slice(halfLength);

  // Style dla tekstu
  const textStyles = {
    color: 'white',
    backgroundColor: '#338ede',
    padding:5
  };

  return (
    <div style={textStyles}> 
    <div style={centerStyles}>
      <Container maxWidth="md">
       
        <Typography variant="h4" align="center" sx={{ mt: 2 }}>
              {t("Prowadzanie firmy usługowej często sprawia trudności ")}
            </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <List>
              {column1.map((item, index) => (
                <ListItem key={index} >
                  <ListItemText primary={`• ${item}`} style={textStyles} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              {column2.map((item, index) => (
                <ListItem key={index} style={textStyles}>
                  <ListItemText primary={`• ${item}`} style={textStyles} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </div>
    </div>
  );
};

export default Difficulties;
