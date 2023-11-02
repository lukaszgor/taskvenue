import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTranslation } from "react-i18next";
import supabase from '../../../../supabaseClient';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ManagerContact = () => {
    const { t, i18n } = useTranslation();
    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');
    const [email, setEmail] = useState(''); // State for email
    const [phone, setPhone] = useState(''); // State for phone
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            setUserID(data.session.user.id);
            fetchData(data.session.user.id);
          }
        };
        checkSession();
      }, []);
    
      const fetchData = async (userId) => {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id_configuration,id_contractor')
          .eq('id', userId)
          .single();
        if (profileError) {
          console.log(profileError);
        } else if (profileData) {
          setIdConfiguration(profileData.id_configuration);
        }
      };

      useEffect(() => {
        // Fetch and update email and phone data when idConfig changes
        if (idConfig) {
          fetchConfigurationData(idConfig);
        }
      }, [idConfig]);

  const fetchConfigurationData = async (idConfiguration) => {
    // Fetch email and phone data based on idConfiguration
    const { data, error } = await supabase
      .from('configurations')
      .select('email, phone')
      .eq('id', idConfiguration)
      .single();

    if (error) {
      console.error(error);
    } else if (data) {
      setEmail(data.email);
      setPhone(data.phone);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleUpdateData = async () => {
    // Update the data in the 'konfiguracja' table
    const { data, error } = await supabase
      .from('configurations')
      .update({ email, phone })
      .eq('id', idConfig);

    if (error) {
      console.error(error);
    } else {
        handleClickAlert();

    }
  };

  const handleClickAlert = () => {
    setOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label={t('Email')}
          fullWidth
          value={email}
          onChange={handleEmailChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label={t('Phone number')}
          fullWidth
          value={phone}
          onChange={handlePhoneChange}
        />
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleUpdateData}>
          {t('Submit')}
        </Button>
      </Grid>
      <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleCloseAlert}
        >
          <Alert severity="success">{t('Updated!')}</Alert>
        </Snackbar>

    </Grid>
    
  );
};

export default ManagerContact;
