
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkerNavBar from '../../Components/NavigationBar/WorkerNavBar';
import { useTranslation } from "react-i18next";
import StatusOfImplementation30Report from '../../Components/Reports/StatusOfImplementation30Report';
import YourOpenAndInProgressTasksReport from '../../Components/Reports/YourOpenAndInProgressTasksReport';
import ManagerReportsBreadcrumbs from '../../Components/Breadcrumbs/mainBreadcrumbs/ManagerReportsBreadcrumbs';
import ReportRealizationOfIssuesForTheCustomers from '../../Components/Reports/ReportRealizationOfIssuesForTheCustomers';
function WorkerReports() {
    const { t, i18n } = useTranslation();

  return (
    <div>
             <WorkerNavBar></WorkerNavBar>
        <ManagerReportsBreadcrumbs></ManagerReportsBreadcrumbs>
        <p></p>

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
