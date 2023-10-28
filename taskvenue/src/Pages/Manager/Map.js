
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { useTranslation } from "react-i18next";
import ManagerMapVenues from '../../Components/Manager/Map/ManagerMapVenues';
import ManagerMapBreadcrumbs from '../../Components/Breadcrumbs/mainBreadcrumbs/ManagerMapBreadcrumbs';
import ManagerMapTasks from '../../Components/Manager/Map/ManagerMapTasks';
function Map() {
    const { t, i18n } = useTranslation();

  return (
    <div>
        <ManagerNavBar></ManagerNavBar>
        <ManagerMapBreadcrumbs></ManagerMapBreadcrumbs>
        <p></p>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" fontWeight="bold">{t('All venues on the map')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
         <ManagerMapVenues></ManagerMapVenues>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" fontWeight="bold">{t('Tasks on the map')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
         <ManagerMapTasks></ManagerMapTasks>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}

export default Map;
