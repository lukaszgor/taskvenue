import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';

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

const TargetCompany = () => {
    const { t, i18n } = useTranslation();
  return (
    <div style={centerStyles}>
      <Container maxWidth="md">
      <Typography variant="h4" gutterBottom style={contentStyles}>
          Dla kogo?
        </Typography>
<Divider>Branża usługowa</Divider>
<p></p>
Firmy oferujące różnego rodzaju usługi, takie jak sprzątanie, konserwacja, naprawy itp., mogą korzystać z tej aplikacji do lepszej organizacji swojej pracy i monitorowania wyników.
<p></p>
<Divider>Obsługa nieruchomości</Divider>
<p></p>
Aplikacja ta może być wykorzystywana przez firmy zarządzające nieruchomościami do monitorowania i zarządzania zadaniami związanymi z utrzymaniem budynków, naprawami, przeglądami, czyszczeniem itp.
<p></p>
<Divider>Serwis techniczny</Divider>
<p></p>
Firmy świadczące usługi serwisowe dla różnych urządzeń i maszyn mogą korzystać z tej aplikacji do rejestrowania lokalizacji urządzeń, przypisywania zadań serwisowych i śledzenia postępów prac.
<p></p>
<Divider>Zarządzanie projektami budowlanymi</Divider>
<p></p>
W branży budowlanej aplikacja ta może pomóc w rejestrowaniu lokalizacji różnych etapów projektu, przypisywaniu zadań podwykonawcom i monitorowaniu postępów prac na budowie.
<p></p>
<Divider>Usługi dostaw i logistyka</Divider>
<p></p>
Firmy zajmujące się dostawami i logistyką mogą wykorzystywać tę aplikację do śledzenia lokalizacji pojazdów, przypisywania zadań kierowcom i monitorowania dostaw.
<p></p>
<Divider>Przemysł produkcyjny</Divider>
<p></p>
W fabrykach i zakładach produkcyjnych aplikacja ta może pomóc w zarządzaniu utrzymaniem ruchu, konserwacją maszyn i urządzeń, a także monitorowaniu ich wydajności.
<p></p>
<Divider>Przemysł produkcyjny</Divider>
<p></p>
W fabrykach i zakładach produkcyjnych aplikacja ta może pomóc w zarządzaniu utrzymaniem ruchu, konserwacją maszyn i urządzeń, a także monitorowaniu ich wydajności.
<p></p>
<Divider>Zarządzanie budynkami i obiektami użyteczności publicznej</Divider>
<p></p>
W przypadku obiektów użyteczności publicznej, takich jak szkoły, szpitale lub instytucje rządowe, aplikacja ta może pomóc w zarządzaniu utrzymaniem, czyszczeniem i innymi zadaniami.
<p></p>
<Divider>Zarządzanie nieruchomościami komercyjnymi</Divider>
<p></p>
W przypadku zarządzania biurami, centrów handlowych lub innymi obiektami komercyjnymi, aplikacja ta może pomóc w monitorowaniu i zarządzaniu różnymi aspektami obsługi i utrzymania nieruchomości.
<p></p>
<Divider>Rolnictwo</Divider>
<p></p>
W rolnictwie aplikacja ta może być wykorzystywana do zarządzania pracami na farmach, planowania i monitorowania zadań związanych z uprawą, nawadnianiem i pielęgnacją roślin.
<p></p>
<Divider>Zarządzanie projektami</Divider>
<p></p>
Niezależnie od branży, aplikacja ta może być używana do zarządzania projektami, w których istnieje potrzeba monitorowania lokalizacji, zadań i postępów prac.
      </Container>
    </div>
  );
};

export default TargetCompany;
