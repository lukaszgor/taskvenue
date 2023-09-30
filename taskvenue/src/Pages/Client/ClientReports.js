
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClientNavBar from '../../Components/NavigationBar/ClientNavBar';
import { useTranslation } from "react-i18next";
import ClientReportsBreadcrumbs from '../../Components/Breadcrumbs/Client/ClientReportsBreadcrumbs';
function ClientReports() {
    const { t, i18n } = useTranslation();

  return (
    <div>
             <ClientNavBar></ClientNavBar>
        <ClientReportsBreadcrumbs></ClientReportsBreadcrumbs>
        <p></p>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" fontWeight="bold">{t('Rport1')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          Raport 1
        </AccordionDetails>
      </Accordion>


      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Rapor 2')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          Raport 2
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Raport 3')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          Raport 3
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ClientReports;
