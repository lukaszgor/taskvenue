import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography, Select, MenuItem,Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoNavBar from '../../../Components/NavigationBar/InfoNavBar';

const TermsAndConditions = () => {
  const { t, i18n } = useTranslation();




  return (
    <div>
        <InfoNavBar></InfoNavBar>
      <Container maxWidth="md">
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Terms and conditions')}</Typography>
        </AccordionSummary>
        <AccordionDetails>


    <h1>Polityka prywatności RODO</h1>

    <p>1. Administratorem Pana/Pani danych osobowych jest firma Kamil Nogacki Business z siedzibą w Stara Zagość 46, 28-400 Pińczów.</p>

    <p>2. W sprawach związanych z ochroną danych osobowych można kontaktować się z inspektorem ochrony danych, pisząc na adres e-mail <a href="mailto:lgorski.taskvenue@gmail.com">lgorski.taskvenue@gmail.com</a> lub adres siedziby.</p>

    <p>3. Pana/Pani dane osobowe będą przetwarzane w celu świadczenia naszych usług, na podstawie art. 6 ust. 1 lit. a, b oraz c.</p>

    <p>4. Odbiorcami Pana/Pani danych osobowych będą następujące podmioty: Kamil Nogacki Business</p>

    <p>5. Pana/Pani dane osobowe będą przechowywane do momentu zakończenia współpracy.</p>

    <p>6. Posiada Pan/Pani prawo:</p>
    <ul>
        <li>dostępu do swoich danych osobowych,</li>
        <li>sprostowania swoich danych osobowych,</li>
        <li>usunięcia swoich danych osobowych,</li>
        <li>ograniczenia przetwarzania swoich danych osobowych,</li>
        <li>cofnięcia zgody na przetwarzanie danych osobowych przez wiadomość e-mail na adres inspektora ochrony danych, jeżeli uprzednio wyraził(a) Pan/Pani taką zgodę i przetwarzanie dotyczących Pana/Pani danych odbywa się na jej podstawie,</li>
        <li>przenoszenia swoich danych osobowych,</li>
        <li>wniesienia sprzeciwu wobec przetwarzania swoich danych osobowych z przyczyn związanych z Pana/Pani szczególną sytuacją, zgodnie z art. 21 RODO.</li>
    </ul>

    <p>Niezależnie od powyższego przysługuje Panu/Pani uprawnienie do wniesienia skargi do organu nadzorczego, tj. Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa), gdy uzna Pan/Pani, że przetwarzanie Pana/Pani danych osobowych narusza przepisy RODO.</p>

    <p>7. Podanie przez Pana/Panią danych osobowych jest wymogiem ustawowym i jest niezbędne do zawarcia umowy. W przypadku niepodania przez Pana/Panią danych osobowych niemożliwym będzie świadczenie dla Pana/Pani naszych usług.</p>

    <p>8. Pani/Pana dane osobowe będą przekazywane poza terytorium Europejskiego Obszaru Gospodarczego/do firmy Supabase Inc, która udostępnia serwery umożliwiające magazynowanie danych.</p>

    <p>9. Pana/Pani dane będą przetwarzane w sposób zautomatyzowany i będą wykorzystywane tylko do umożliwienia korzystania.</p>

    <p>Serwis korzysta z plików cookies.</p>

<p>Pliki cookies (tzw. „ciasteczka”) stanowią dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu i przeznaczone są do korzystania ze stron internetowych Serwisu. Cookies zazwyczaj zawierają nazwę strony internetowej, z której pochodzą, czas przechowywania ich na urządzeniu końcowym oraz unikalny numer.</p>

<p>Podmiotem zamieszczającym na urządzeniu końcowym Użytkownika Serwisu pliki cookies oraz uzyskującym do nich dostęp jest operator Serwisu.</p>

<h1>Informacja o plikach cookies</h1>
<p>Pliki cookies wykorzystywane są w następujących celach:</p>
<ul>
  <li>Tworzenia statystyk, które pomagają zrozumieć, w jaki sposób Użytkownicy Serwisu korzystają ze stron internetowych, co umożliwia ulepszanie ich struktury i zawartości;</li>
  <li>Utrzymanie sesji Użytkownika Serwisu (po zalogowaniu), dzięki której Użytkownik nie musi na każdej podstronie Serwisu ponownie wpisywać loginu i hasła;</li>
  <li>Określania profilu użytkownika w celu wyświetlania mu dopasowanych materiałów w sieciach reklamowych, w szczególności sieci Google.</li>
</ul>

<p>W ramach Serwisu stosowane są dwa zasadnicze rodzaje plików cookies: „sesyjne” (session cookies) oraz „stałe” (persistent cookies). Cookies „sesyjne” są plikami tymczasowymi, które przechowywane są w urządzeniu końcowym Użytkownika do czasu wylogowania, opuszczenia strony internetowej lub wyłączenia oprogramowania (przeglądarki internetowej). „Stałe” pliki cookies przechowywane są w urządzeniu końcowym Użytkownika przez czas określony w parametrach plików cookies lub do czasu ich usunięcia przez Użytkownika.</p>

<p>Oprogramowanie do przeglądania stron internetowych (przeglądarka internetowa) zazwyczaj domyślnie dopuszcza przechowywanie plików cookies w urządzeniu końcowym Użytkownika. Użytkownicy Serwisu mogą dokonać zmiany ustawień w tym zakresie. Przeglądarka internetowa umożliwia usunięcie plików cookies. Możliwe jest także automatyczne blokowanie plików cookies. Szczegółowe informacje na ten temat zawiera pomoc lub dokumentacja przeglądarki internetowej.</p>

<p>Ograniczenia stosowania plików cookies mogą wpłynąć na niektóre funkcjonalności dostępne na stronach internetowych Serwisu.</p>

<p>Pliki cookies zamieszczane w urządzeniu końcowym Użytkownika Serwisu i wykorzystywane mogą być również przez współpracujących z operatorem Serwisu reklamodawców oraz partnerów.</p>

<p>Zalecamy przeczytanie polityki ochrony prywatności tych firm, aby poznać zasady korzystania z plików cookie wykorzystywane w statystykach: <a href="link-do-polityki">Polityka ochrony prywatności Google Analytics</a></p>

<p>Pliki cookie mogą być wykorzystane przez sieci reklamowe, w szczególności sieć Google, do wyświetlenia reklam dopasowanych do sposobu, w jaki użytkownik korzysta z Serwisu. W tym celu mogą zachować informację o ścieżce nawigacji użytkownika lub czasie pozostawania na danej stronie.</p>

<p>W zakresie informacji o preferencjach użytkownika gromadzonych przez sieć reklamową Google użytkownik może przeglądać i edytować informacje wynikające z plików cookies przy pomocy narzędzia: <a href="https://www.google.com/ads/preferences/">https://www.google.com/ads/preferences/</a></p>






        </AccordionDetails>
      </Accordion>
      </Container>
    </div>
  );
};

export default TermsAndConditions;
