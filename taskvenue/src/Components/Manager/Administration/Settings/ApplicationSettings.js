import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import supabase from '../../../../supabaseClient';
import { useTranslation } from "react-i18next";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const ApplicationSettings = () => {
    const { t, i18n } = useTranslation();
    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');

  const [isChecked, setIsChecked] = useState(false);

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
      .select('id_configuration')
      .eq('id', userId)
      .single();
    if (profileError) {
      console.log(profileError);
    } else if (profileData) {
      setIdConfiguration(profileData.id_configuration);
    }
  };


    // Załóżmy, że chcemy wczytać początkowy stan switcha
    const fetchSettings = async (idConfiguration) => {
      const { data, error } = await supabase
        .from('configurations')
        .select()
        .eq('id', idConfiguration)
        .single();
      if (error) {
        console.error('Błąd podczas pobierania danych', error);
      } else {
        setIsChecked(data.hiddenSimpleLocationConfirmation === 1);
      }
    };

    useEffect(() => {
        if (idConfig) {
            fetchSettings(idConfig);
          }
      }, [idConfig]);

  const handleChange = async (event) => {
    setIsChecked(event.target.checked);

    const newValue = event.target.checked ? 1 : null;

    const { error } = await supabase
      .from('configurations')
      .update({ hiddenSimpleLocationConfirmation: newValue })
      .eq('id', idConfig);

    if (error) {
      console.error('Błąd podczas aktualizacji danych', error);
    }
  };

  return (

    <FormGroup>
  <FormControlLabel control={
    <Switch
    checked={isChecked}
    onChange={handleChange}
    inputProps={{ 'aria-label': 'Potwierdzenie lokalizacji' }}
  />
  } label={t('Simple location confirmation')} />



    </FormGroup>

  );
};

export default ApplicationSettings;
