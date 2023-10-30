import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography,Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import Language from '../../Common/Language';
const Settings = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Container maxWidth="md">
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Language')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <Language></Language>
        </AccordionDetails>
      </Accordion>
      </Container>

  </div>
  );
};

export default Settings;
