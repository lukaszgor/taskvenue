import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography, Select, MenuItem } from '@mui/material';
import supabase from '../../../supabaseClient';
import { useTranslation } from 'react-i18next';

const License = () => {
  const { t, i18n } = useTranslation();
  const [validity_date, setValidity_date] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
const [userID, setUserID] = useState('');
const [idConfig, setIdConfiguration] = useState('');

useEffect(() => {
        if (idConfig) {
          fetchValidityDate();
        }
      }, [idConfig]);

const fetchValidityDate = async () => {
        try {
          const { data, error } = await supabase
            .from('configurations')
            .select('validity_date')
            .eq('id', idConfig)
            .single();
    
          if (error) {
            setHasError(true);
          } else if (data) {
            setValidity_date(data.validity_date);
          }
    
          setIsLoading(false);
        } catch (error) {
          console.error('error:', error);
          setHasError(true);
          setIsLoading(false);
        }
      };

  useEffect(() => {
    const checkSession = async () => {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
            setUserID(data.session.user.id)
            fetchData(data.session.user.id)
        }
      };
      checkSession();
  });
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
}
  return (
    <div>
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
