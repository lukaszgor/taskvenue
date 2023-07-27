import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography, Select, MenuItem } from '@mui/material';
import supabase from '../../../supabaseClient';
import FetchSupabaseData from '../../../Config/FetchSupabaseData';
import { useTranslation } from 'react-i18next';

const License = () => {
  const { t, i18n } = useTranslation();
  const [validity_date, setValidity_date] = useState('');
  const [receivedData, setReceivedData] = useState({ userId: '', idConfiguration: '', profileType: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleGetData = (userId, idConfiguration, profileType) => {
    setReceivedData({ userId, idConfiguration, profileType });
  };

  const fetchValidityDate = async () => {
    try {
      const { data, error } = await supabase
        .from('configurations')
        .select('validity_date')
        .eq('id', receivedData.idConfiguration)
        .single();

      if (error) {
        setHasError(true);
      } else if (data) {
        setValidity_date(data.validity_date);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Błąd zapytania:', error);
      setHasError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (receivedData.idConfiguration) {
      fetchValidityDate();
    }
  }, [receivedData.idConfiguration]);

  return (
    <div>
      <FetchSupabaseData sendData={handleGetData}></FetchSupabaseData>
      {isLoading ? (
        <p>{t("Landing...")}</p>
      ) : hasError ? (
        <p>{t("An error occurred while downloading data.")}</p>
      ) : (
        <p>{t("Your license is valid until:")} {validity_date}</p>
      )}
    </div>
  );
};

export default License;
