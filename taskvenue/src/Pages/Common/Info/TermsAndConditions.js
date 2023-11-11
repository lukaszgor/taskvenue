import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import InfoNavBar from '../../../Components/NavigationBar/InfoNavBar';
import TermsAttachments from '../../../Components/Info/TermsAttachments';

const TermsAndConditions = () => {
  const { t, i18n } = useTranslation();
  return (
<div>
    <InfoNavBar></InfoNavBar>
<TermsAttachments></TermsAttachments>
<p></p>

</div>
  );
};

export default TermsAndConditions;
