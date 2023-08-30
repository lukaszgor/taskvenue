import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography, Select, MenuItem,Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import supabase from '../../../supabaseClient';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const License = () => {
  const { t, i18n } = useTranslation();
  const [validity_date, setValidity_date] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
const [userID, setUserID] = useState('');
const [idConfig, setIdConfiguration] = useState('');
const [name, setName] = useState('');

useEffect(() => {
        if (idConfig) {
          fetchValidityDate();
        }
      }, [idConfig]);

const fetchValidityDate = async () => {
        try {
          const { data, error } = await supabase
            .from('configurations')
            .select('validity_date,name')
            .eq('id', idConfig)
            .single();
    
          if (error) {
            setHasError(true);
          } else if (data) {
            setValidity_date(data.validity_date);
            setName(data.name);

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
    <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('License')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          {isLoading ? (
        <p>{t("Landing...")}</p>
      ) : hasError ? (
        <p>{t("An error occurred while downloading data.")}</p>
      ) : (
        <Typography>{t("Your license is valid until:")} {validity_date}</Typography>
      )}
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('About configuration')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{name}</Typography>
        </AccordionDetails>
      </Accordion>

    </div>
  );
};

export default License;
