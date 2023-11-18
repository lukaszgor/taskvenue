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

const Problems = () => {
    const { t, i18n } = useTranslation();
  return (
    <div style={centerStyles}>
      <Container maxWidth="md">
      <Typography variant="h5" gutterBottom style={contentStyles}>
      Kluczowe Funkcjonalności
        </Typography>
        <Accordion  >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Monitoring czasu i lokalizacji pracowników</Divider>
</AccordionSummary>
<AccordionDetails>
Aplikacja umożliwia śledzenie czasu oraz dokładnej lokalizacji pracowników podczas wykonywania zadań. To rozwiązuje problem związany z nadzorem i kontrolą nad pracą zespołu, a także pozwala na skuteczne zarządzanie czasem pracy.
</AccordionDetails>
</Accordion>

<Accordion  >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Zarządzanie miejscami i kontrahentami</Divider>
</AccordionSummary>
<AccordionDetails>
Poprzez zapisywanie miejsc, w których realizowane są zadania, oraz agregowanie danych pod kątem kontrahentów, aplikacja dostarcza narzędzi do skutecznego zarządzania klientami i miejscami wykonywania usług. To pozwala na lepsze planowanie działań i skupienie się na kluczowych obszarach biznesowych.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Rzetelne rozliczanie klientów</Divider>
</AccordionSummary>
<AccordionDetails>
Dzięki możliwości zapisywania miejsc i czasu, w którym zadania zostały zrealizowane, aplikacja umożliwia dokładne rozliczanie klientów tylko za faktycznie zrealizowane usługi. To eliminuje nieścisłości w rozliczeniach i buduje zaufanie między firmą a klientami.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Skuteczna komunikacja z pracownikami:</Divider>
</AccordionSummary>
<AccordionDetails>
Slownik z zadaniami pozwala pracownikom jasno zrozumieć, jakie zadania mają zrealizować. To eliminuje nieporozumienia i ułatwia skuteczną komunikację w zespole, co jest kluczowe dla efektywnej realizacji projektów.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Planowanie i harmonogramowanie zadań:</Divider>
</AccordionSummary>
<AccordionDetails>
Dzięki modułowi harmonogramu, aplikacja wspiera planowanie działań do przodu. Monitorowanie absencji pracowników oraz zadań na bieżąco umożliwia elastyczne dostosowanie harmonogramu, co eliminuje problemy związane z nieefektywnym wykorzystaniem zasobów.
</AccordionDetails>
</Accordion>


<p></p>
      </Container>
    </div>
  );
};

export default Problems;
