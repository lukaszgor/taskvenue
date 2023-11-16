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
      <Typography variant="h4" gutterBottom style={contentStyles}>
          Nasze oprogramowanie rozwiązuje problemy:
        </Typography>
        <Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Pracownicy nie na miejscu? Zarządzaj efektywnie lokalizacją.</Divider>
</AccordionSummary>
<AccordionDetails>
Firmy oferujące różnego rodzaju usługi, takie jak sprzątanie, konserwacja, naprawy itp., mogą korzystać z tej aplikacji do lepszej organizacji swojej pracy i monitorowania wyników.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Rozliczenia za rzeczywiste usługi. Unikaj strat. Zabezpiecz finanse.</Divider>
</AccordionSummary>
<AccordionDetails>
Aplikacja ta może być wykorzystywana przez firmy zarządzające nieruchomościami do monitorowania i zarządzania zadaniami związanymi z utrzymaniem budynków, naprawami, przeglądami, czyszczeniem itp.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Nieuporządkowane dane o miejscach, zadaniach, kontrahentach? Systematyzuj</Divider>
</AccordionSummary>
<AccordionDetails>
Firmy świadczące usługi serwisowe dla różnych urządzeń i maszyn mogą korzystać z tej aplikacji do rejestrowania lokalizacji urządzeń, przypisywania zadań serwisowych i śledzenia postępów prac.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Planowanie pracy zespołu z problemem? Zapewnij klarowność kalendarza.</Divider>
</AccordionSummary>
<AccordionDetails>
W branży budowlanej aplikacja ta może pomóc w rejestrowaniu lokalizacji różnych etapów projektu, przypisywaniu zadań podwykonawcom i monitorowaniu postępów prac na budowie.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Przewidywanie zasobów dla zadań. Optymalizuj efektywność organizacji</Divider>
</AccordionSummary>
<AccordionDetails>
W przypadku obiektów użyteczności publicznej, takich jak szkoły, szpitale lub instytucje rządowe, aplikacja ta może pomóc w zarządzaniu utrzymaniem, czyszczeniem i innymi zadaniami.
W przypadku zarządzania biurami, centrów handlowych lub innymi obiektami komercyjnymi, aplikacja ta może pomóc w monitorowaniu i zarządzaniu różnymi aspektami obsługi i utrzymania nieruchomości.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Redukcja kosztów podróży, lepsze planowanie. Jasny obraz sytuacji.</Divider>
</AccordionSummary>
<AccordionDetails>
W rolnictwie aplikacja ta może być wykorzystywana do zarządzania pracami na farmach, planowania i monitorowania zadań związanych z uprawą, nawadnianiem i pielęgnacją roślin.
</AccordionDetails>
</Accordion>

<p></p>
      </Container>
    </div>
  );
};

export default Problems;
