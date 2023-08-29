
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { useTranslation } from "react-i18next";
import StatusOfImplementation30Report from '../../Components/Reports/StatusOfImplementation30Report';
import YourOpenAndInProgressTasksReport from '../../Components/Reports/YourOpenAndInProgressTasksReport';
import ManagerReportsBreadcrumbs from '../../Components/Breadcrumbs/mainBreadcrumbs/ManagerScheduleBreadcrumbs';
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
          <Typography>
            <StatusOfImplementation30Report></StatusOfImplementation30Report>
          </Typography>
        </AccordionDetails>
      </Accordion>


      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Your open and in progress tasks')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <YourOpenAndInProgressTasksReport></YourOpenAndInProgressTasksReport>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Reports;
