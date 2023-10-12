
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { useTranslation } from "react-i18next";
import StatusOfImplementation30Report from '../../Components/Reports/StatusOfImplementation30Report';
import YourOpenAndInProgressTasksReport from '../../Components/Reports/YourOpenAndInProgressTasksReport';
import ManagerReportsBreadcrumbs from '../../Components/Breadcrumbs/mainBreadcrumbs/ManagerReportsBreadcrumbs';
import ReportRealizationOfIssuesForTheCustomers from '../../Components/Reports/ReportRealizationOfIssuesForTheCustomers';
import ManagerAllService from '../../Components/Reports/ManagerAllService';
import ManagerAllTasks from '../../Components/Reports/ManagerAllTasks';
import ManagerWorkTime from '../../Components/Reports/ManagerWorkTime';
function Reports() {
    const { t, i18n } = useTranslation();

  return (
    <div>
        <ManagerNavBar></ManagerNavBar>
        <ManagerReportsBreadcrumbs></ManagerReportsBreadcrumbs>
        <p></p>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" fontWeight="bold">{t('Status of the implementation of issues in the last 30 days')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <StatusOfImplementation30Report></StatusOfImplementation30Report>
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

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Report realization of issues for the customers [only completed]')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <ReportRealizationOfIssuesForTheCustomers></ReportRealizationOfIssuesForTheCustomers>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('All Tasks')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
  <ManagerAllTasks></ManagerAllTasks>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('All services')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
  <ManagerAllService></ManagerAllService>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Employee time report')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
  <ManagerWorkTime></ManagerWorkTime>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Reports;
