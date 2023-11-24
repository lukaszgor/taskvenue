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

const TargetCompany = () => {
    const { t, i18n } = useTranslation();
  return (
    <div style={centerStyles}>
      <Container maxWidth="md">
      <Typography variant="h5" gutterBottom style={contentStyles}>

        </Typography>
        <Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Branża usługowa</Divider>
</AccordionSummary>
<AccordionDetails>
Firmy oferujące różnego rodzaju usługi, takie jak sprzątanie, konserwacja, naprawy itp., mogą korzystać z tej aplikacji do lepszej organizacji swojej pracy i monitorowania wyników.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Obsługa nieruchomości</Divider>
</AccordionSummary>
<AccordionDetails>
Aplikacja ta może być wykorzystywana przez firmy zarządzające nieruchomościami do monitorowania i zarządzania zadaniami związanymi z utrzymaniem budynków, naprawami, przeglądami, czyszczeniem itp.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Serwis techniczny</Divider>
</AccordionSummary>
<AccordionDetails>
Firmy świadczące usługi serwisowe dla różnych urządzeń i maszyn mogą korzystać z tej aplikacji do rejestrowania lokalizacji urządzeń, przypisywania zadań serwisowych i śledzenia postępów prac.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Zarządzanie projektami budowlanymi</Divider>
</AccordionSummary>
<AccordionDetails>
W branży budowlanej aplikacja ta może pomóc w rejestrowaniu lokalizacji różnych etapów projektu, przypisywaniu zadań podwykonawcom i monitorowaniu postępów prac na budowie.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Zarządzanie nieruchomościami</Divider>
</AccordionSummary>
<AccordionDetails>
W przypadku obiektów użyteczności publicznej, takich jak szkoły, szpitale lub instytucje rządowe, aplikacja ta może pomóc w zarządzaniu utrzymaniem, czyszczeniem i innymi zadaniami.
W przypadku zarządzania biurami, centrów handlowych lub innymi obiektami komercyjnymi, aplikacja ta może pomóc w monitorowaniu i zarządzaniu różnymi aspektami obsługi i utrzymania nieruchomości.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Rolnictwo</Divider>
</AccordionSummary>
<AccordionDetails>
W rolnictwie aplikacja ta może być wykorzystywana do zarządzania pracami na farmach, planowania i monitorowania zadań związanych z uprawą, nawadnianiem i pielęgnacją roślin.
</AccordionDetails>
</Accordion>


<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Zarządzanie projektami</Divider>
</AccordionSummary>
<AccordionDetails>
Niezależnie od branży, aplikacja ta może być używana do zarządzania projektami, w których istnieje potrzeba monitorowania lokalizacji, zadań i postępów prac.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Logistyka i transport</Divider>
</AccordionSummary>
<AccordionDetails>
Firmy transportowe i logistyczne mogą korzystać z systemu do śledzenia tras, przypisywania zadań kierowcom, monitorowania dostaw i zbierania danych dotyczących czasu dostawy.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Opieka zdrowotna</Divider>
</AccordionSummary>
<AccordionDetails>
Szpitale, kliniki i agencje opieki zdrowotnej mogą korzystać z takiego systemu do zarządzania zadaniami pielęgniarek i personelu medycznego w różnych częściach placówki, a także do monitorowania stanu pacjentów.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Obszar publiczny</Divider>
</AccordionSummary>
<AccordionDetails>
Organizacje rządowe i lokalne samorządy mogą korzystać z takiego systemu do monitorowania prac publicznych, zarządzania zadaniami konserwacyjnymi w parkach i ulicach oraz zbierania danych dotyczących infrastruktury.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Restauracje i usługi gastronomiczne</Divider>
</AccordionSummary>
<AccordionDetails>
Restauracje mogą używać aplikacji do zarządzania zadaniami obsługi, monitorowania dostaw i zbierania danych dotyczących zapasów i sprzedaży w różnych lokalizacjach.
</AccordionDetails>
</Accordion>

<Accordion >
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
<Divider>Edukacja</Divider>
</AccordionSummary>
<AccordionDetails>
Szkoły i uczelnie mogą korzystać z systemu do zarządzania zadaniami związanymi z utrzymaniem kampusu, organizacją wydarzeń i monitorowaniem wykorzystania przestrzeni edukacyjnych.
</AccordionDetails>
</Accordion>
<p></p>
      </Container>
    </div>
  );
};

export default TargetCompany;
