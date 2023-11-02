import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useTranslation } from "react-i18next";
import supabase from '../../supabaseClient';
import { useState, useEffect } from 'react';
import ClientNavBar from '../../Components/NavigationBar/ClientNavBar';
import ClientContactBreadcrumbs from '../../Components/Breadcrumbs/Client/ClientClientBreadcrumbs';
import { Container } from '@mui/system';

const ClientContact = () => {
    const { t, i18n } = useTranslation();
    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');
    const [email, setEmail] = useState(''); // State for email
    const [phone, setPhone] = useState(''); // State for phone
  

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

  return (
    <div>
      <Container maxWidth="md">
      <ClientNavBar></ClientNavBar>
<ClientContactBreadcrumbs></ClientContactBreadcrumbs>
<p></p>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label={t('Email')}
          fullWidth
          value={email}
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label={t('Phone number')}
          fullWidth
          value={phone}
          disabled
        />
      </Grid>
    </Grid>
    </Container>
    </div>
  );
};

export default ClientContact;




