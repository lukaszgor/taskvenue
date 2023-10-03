import React, { useState } from 'react';
import ClientNavBar from '../../Components/NavigationBar/ClientNavBar';
import ClientClientBreadcrumbs from '../../Components/Breadcrumbs/Client/ClientClientBreadcrumbs';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import { useTranslation } from "react-i18next";

const ClientContact = () => {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState('3242434324');
    const [phoneNumber, setPhoneNumber] = useState('example@gmail.com');
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePhoneNumberChange = (e) => {
      setPhoneNumber(e.target.value);
    };

    return (
        <div>
             <ClientNavBar></ClientNavBar>
             <ClientClientBreadcrumbs></ClientClientBreadcrumbs>
             <p></p>
    <Container maxWidth="md">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <MailOutlineIcon style={{ marginRight: '10px' }} />
        <TextField
          label={t('Email')}
          variant="outlined"
          fullWidth
          value={email}
          disabled
          onChange={handleEmailChange}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <PhoneIcon style={{ marginRight: '10px' }} />
        <TextField
          label={t('Phone number')}
          variant="outlined"
          fullWidth
          value={phoneNumber}
          disabled
          onChange={handlePhoneNumberChange}
        />
      </div>
    </Container>
      </div>
      );
};

export default ClientContact;