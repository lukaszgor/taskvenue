
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkerNavBar from '../../Components/NavigationBar/WorkerNavBar';
import { useTranslation } from "react-i18next";
import YourOpenAndInProgressTasksReport from '../../Components/Reports/YourOpenAndInProgressTasksReport';
import WorkerReportsBreadcrumbs from '../../Components/Breadcrumbs/Worker/WorkerReportsBreadcrumbs';
import WorkerConstantWorkingSheetRaport from '../../Components/Reports/WorkerConstantWorkingSheetRaport';
function WorkerReports() {
    const { t, i18n } = useTranslation();

  return (
    <div>
             <WorkerNavBar></WorkerNavBar>
        <WorkerReportsBreadcrumbs></WorkerReportsBreadcrumbs>
        <p></p>
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Confirmation of location')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <WorkerConstantWorkingSheetRaport></WorkerConstantWorkingSheetRaport>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Your open and in progress tasks')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <YourOpenAndInProgressTasksReport></YourOpenAndInProgressTasksReport>
        </AccordionDetails>
      </Accordion>


    </div>
  );
}

export default WorkerReports;
