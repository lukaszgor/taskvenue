import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import InfoNavBar from '../../../Components/NavigationBar/InfoNavBar';


const TermsAndConditions = () => {
  const { t, i18n } = useTranslation();
  return (
<div>
    <InfoNavBar></InfoNavBar>

</div>
  );
};

export default TermsAndConditions;
