import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography,Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import Language from '../../Common/Language';
import ManagerContact from './Settings/ManagerContact';
import ApplicationSettings from './Settings/ApplicationSettings';

const Settings = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Container maxWidth="md">

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Settings')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
         <ApplicationSettings></ApplicationSettings>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Language')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <Language></Language>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Contact')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <ManagerContact></ManagerContact>
        </AccordionDetails>
      </Accordion>
      </Container>

  </div>
  );
};

export default Settings;
