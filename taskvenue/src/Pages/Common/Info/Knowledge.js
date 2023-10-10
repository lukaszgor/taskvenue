import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Container, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import InfoNavBar from '../../../Components/NavigationBar/InfoNavBar';


function Knowledge() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <InfoNavBar></InfoNavBar>
      <Container maxWidth="md">

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Box p={2} >
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" fontWeight="bold">
                      React
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      React to popularna biblioteka JavaScript do tworzenia interaktywnych aplikacji internetowych. Jest stosunkowo łatwy w nauce i wykorzystuje koncepcję komponentów, które są samodzielnie działającymi jednostkami interfejsu użytkownika. Główną zaletą React jest efektywne zarządzanie aktualizacjami interfejsu, dzięki wirtualnemu drzewu DOM, które minimalizuje manipulacje na rzeczywistym drzewie DOM i poprawia wydajność aplikacji. React promuje także jednokierunkowy przepływ danych, ułatwiając zarządzanie danymi w aplikacji. Można tworzyć komponenty do wielokrotnego użytku, co przyspiesza rozwijanie aplikacji, a także korzystać z narzędzi deweloperskich do debugowania i analizowania aplikacji.
                    </Typography>
                    <br />
                    {/* Tutaj możesz dodać obraz */}
                    <img src="logo512.png" alt="React" style={{ maxWidth: '100%' }} />
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Box p={2} >
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" fontWeight="bold">
                      Supabase
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Supabase to platforma, która ułatwia tworzenie aplikacji internetowych opartych na bazie danych. Opiera się na bazie danych PostgreSQL i dostarcza szereg narzędzi i funkcji do budowania i zarządzania aplikacjami. Możesz używać Supabase do przechowywania danych, zarządzania użytkownikami, tworzenia autentykacji, obsługi komunikacji w czasie rzeczywistym i wiele więcej. Jest to elastyczne rozwiązanie, które oferuje prosty dostęp do danych poprzez REST API i obsługuje przechowywanie plików. Supabase jest przyjazne dla użytkownika, skalowalne i dostępne jako projekt open source, co czyni je atrakcyjnym narzędziem zarówno dla początkujących, jak i doświadczonych programistów, którzy chcą szybko tworzyć nowoczesne aplikacje webowe.
                    </Typography>
                    <br />
                    {/* Tutaj możesz dodać obraz */}
                    <img src="logo512.png" alt="Supabase" style={{ maxWidth: '100%' }} />
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>
          </Grid>
        </div>

      </Container>
    </div>
  );
}

export default Knowledge;
