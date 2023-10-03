
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClientNavBar from '../../Components/NavigationBar/ClientNavBar';
import { useTranslation } from "react-i18next";
import ClientReportsBreadcrumbs from '../../Components/Breadcrumbs/Client/ClientReportsBreadcrumbs';
import ClientAllTasks from '../../Components/Reports/ClientAllTasks';
import ClientAllVenues from '../../Components/Reports/ClientAllVenues';
import ClientStatusOfImplementation30Report from '../../Components/Reports/ClientStatusOfImplementation30Report';
import ClientOpenAndInProgressTasksReport from '../../Components/Reports/ClientOpenAndInProgressTasksReport';

function ClientReports() {
    const { t, i18n } = useTranslation();

  return (
    <div>
             <ClientNavBar></ClientNavBar>
        <ClientReportsBreadcrumbs></ClientReportsBreadcrumbs>
        <p></p>
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Status of the implementation of issues in the last 30 days')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
         <ClientStatusOfImplementation30Report></ClientStatusOfImplementation30Report>
        </AccordionDetails>
      </Accordion>

      <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Open tasks')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
        <ClientOpenAndInProgressTasksReport></ClientOpenAndInProgressTasksReport>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" fontWeight="bold">{t('All Tasks')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <ClientAllTasks></ClientAllTasks>
        </AccordionDetails>
      </Accordion>


      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Venues')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <ClientAllVenues></ClientAllVenues>
        </AccordionDetails>
      </Accordion>


    </div>
  );
}

export default ClientReports;
