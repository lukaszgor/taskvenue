import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';


const Technology = () => {
  const { t, i18n } = useTranslation();
  return (
<div>
<Typography variant="h4" gutterBottom>
          {t("Technology")}
          </Typography>
</div>
  );
};

export default Technology;
