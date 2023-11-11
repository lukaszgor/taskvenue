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






        </AccordionDetails>
      </Accordion>
      </Container>
    </div>
  );
};

export default TermsAndConditions;
