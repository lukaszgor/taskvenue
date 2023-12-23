import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Container, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import InfoNavBar from '../../../Components/NavigationBar/InfoNavBar';
import YouTubePlayer from '../../../Components/Info/MainPage/YouTubePlayer';
import FaqComponent from '../../../Components/Info/MainPage/FaqComponent';
function Knowledge() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <InfoNavBar></InfoNavBar>
      <p></p>
      <div style={{ background: 'white', minHeight: '85vh' }}>
        <p></p>
        <Container maxWidth="md" style={{ marginTop: '8rem' }}>
          <Typography variant="h4" sx={{
                        mr: 2,
                        mt: 10,
                        // fontFamily: 'lato',
                        fontWeight: 700,
                        textDecoration: 'none',
                        color:"#338ede"
                        
                      }} align="center">
            {t("FAQ")}
          </Typography>
          <p></p>
          <Typography variant="h6" align="center">
            {t("Do you have questions about our software? We have collected the most frequently asked ones below.")}
          </Typography>
          <p></p>
<FaqComponent></FaqComponent>

        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container >
            <Grid item xs={12} sm={12}>
              <Box p={2}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" fontWeight="bold">
                      Widok Managera
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                  <YouTubePlayer videoUrl="plXtqNL1Mh4" title={t('')} />
                    <Typography>
                      <strong>Zarządzanie Pracownikami:</strong> Administrator lub manager może dodawać, edytować i usuwać informacje o pracownikach, w tym ich dane osobowe, umiejętności i inne istotne informacje.
                      <br /><br />
                      <strong>Zarządzanie Kontrahentami:</strong> Ta funkcja pozwala na zarządzanie danymi dotyczącymi partnerów biznesowych, klientów lub dostawców.
                      <br /><br />
                      <strong>Zarządzanie Słownikami:</strong> Administrator może definiować i modyfikować terminologię oraz dane używane w aplikacji.
                      <br /><br />
                      <strong>Planowanie w Kalendarzu:</strong> Widok managera umożliwia tworzenie i zarządzanie zadaniami i wydarzeniami w kalendarzu pracowników. To pozwala na efektywne rozplanowanie pracy.
                      <br /><br />
                      <strong>Podgląd Statusu Realizacji:</strong> Manager może śledzić postęp w realizacji zadań przez pracowników, co pozwala na monitorowanie efektywności.
                      <br /><br />
                      <strong>Definiowanie Miejsc:</strong> Manager może określać lokalizacje lub miejsca, które są istotne dla działalności firmy.
                      <br /><br />
                      <strong>Generowanie Raportów:</strong> Aplikacja oferuje różne narzędzia do tworzenia raportów i analizy danych biznesowych.
                    </Typography>
                    <br />
                    <h5><u>{t("Reports")}</u></h5>
                    <img src="managerBoard.png" alt="Widok Administratora/Managera" style={{ maxWidth: '100%' }} />
                    <p></p>
                    <h5><u>{t("Schedule")}</u></h5>
                    <img src="managerplanowanie.png" alt="Widok Administratora/Managera" style={{ maxWidth: '100%' }} />
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box p={2}>
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" fontWeight="bold">
                      Widok Pracownika
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                  <YouTubePlayer videoUrl="V8R2mdvlv7o" title={t('')} />
                    <Typography>
                      <strong>Podgląd Harmonogramu Pracy:</strong> Pracownik ma dostęp do swojego harmonogramu pracy, dzięki czemu może sprawdzać daty, godziny i miejsca swoich zadań.
                      <br /><br />
                      <strong>Rozliczanie Czasu Pracy:</strong> Możliwość śledzenia czasu pracy, co jest kluczowe dla płacenia pracownikom i śledzenia efektywności.
                      <br /><br />
                      <strong>Definiowanie Usług:</strong> Pracownik może określać rodzaje usług, które oferuje lub wykonywać.
                      <br /><br />
                      <strong>Definiowanie Absencji:</strong> Pracownik może zgłaszać swoją nieobecność, na przykład urlop lub zwolnienie lekarskie.
                    </Typography>
                    <br />
                    <h5><u>{t("Tasks")}</u></h5>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <img src="WorkerTasks.png" alt="Widok Administratora/Managera" style={{ maxWidth: '100%' }} />
                    </Grid>
                    <p></p>
                    <Grid item xs={12} sm={6}>
                    <img src="WorkerSchedule.png" alt="Widok Administratora/Managera" style={{ maxWidth: '100%' }} />
                    </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box p={2}>
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" fontWeight="bold">
                      Widok Klienta
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <strong>Dostęp do Raportów:</strong> Klient ma możliwość przeglądania raportów i danych związanych z usługami lub zleceniami wykonanymi przez firmę.
                      <br /><br />
                      <strong>Zgłaszanie Zagadnień:</strong> Klient może składać zapytania, zgłaszać problemy lub wnioski w aplikacji.
                      <br /><br />
                      <strong>Podgląd Zestawień i Miejsc:</strong> Klient ma dostęp do zestawień i informacji na temat usług, a także do informacji na temat lokalizacji lub miejsc związanych z działalnością firmy.
                    </Typography>
                    <br />
                    <h5><u>{t("Venue")}</u></h5>

                    <img src="ClientVenueDetails.png" alt="Widok Administratora/Managera" style={{ maxWidth: '100%' }} />
                    <p></p>
                    <h5><u>{t("Services")}</u></h5>
                    <img src="ClientServices.png" alt="Widok Administratora/Managera" style={{ maxWidth: '100%' }} />
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>
          </Grid>
        </div> */}
        
      </Container>
      </div>
    </div>
  );
}

export default Knowledge;
