
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { useTranslation } from "react-i18next";
import ManagerMapVenue from '../../Components/Manager/Map/ManagerMapVenue';
import ManagerMapBreadcrumbs from '../../Components/Breadcrumbs/mainBreadcrumbs/ManagerMapBreadcrumbs';
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
         <ManagerMapVenue></ManagerMapVenue>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}

export default Map;
