import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import Language from '../../Common/Language';
const Settings = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
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
          <Typography variant="h6" fontWeight="bold">{t('exaple1')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
Example 2
        </AccordionDetails>
      </Accordion>
  </div>
  );
};

export default Settings;
