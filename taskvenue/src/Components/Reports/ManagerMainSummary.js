import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import supabase from '../../supabaseClient';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import { useTranslation } from 'react-i18next';

const ManagerMainSummary = ({ status, time }) => {
    const [totalSumOpen, setTotalSumOpen] = useState(0);
    const [totalSumInprogress, setTotalSumInprogress] = useState(0);
    const { t } = useTranslation();

    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');
    
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
        }

    useEffect(() => {
        if (idConfig) {
            fetchTotalSumOpen(idConfig);
            fetchTotalSumInprogress(idConfig);
            }
      
      }, [idConfig]);


      async function fetchTotalSumOpen(idConfig) {
        const { data, error } = await supabase
          .from('tasks')
          .select()
          .eq('id_configuration', idConfig)
          .eq('status', 'open');
    
        if (error) {
          console.error('Błąd podczas pobierania danych z Supabase:', error);
          return;
        }
        const total = data.length;
        setTotalSumOpen(total);
      }

      async function fetchTotalSumInprogress(idConfig) {
        const { data, error } = await supabase
          .from('tasks')
          .select()
          .eq('id_configuration', idConfig)
          .eq('status', 'inProgress');
      
        if (error) {
          console.error('Błąd podczas pobierania danych z Supabase:', error);
          return;
        }
        const total = data.length;
        setTotalSumInprogress(total);
      }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={6} lg={2}>
        <Card style={{ backgroundColor: '#CAF0F8' }}>
          <CardContent>
<HourglassEmptyOutlinedIcon></HourglassEmptyOutlinedIcon>
            <Typography variant="body2" color="textSecondary">
            {t('Status')} : {t('Open')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
            {t('Amount of tasks')}  : {totalSumOpen}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={2}>
        <Card style={{ backgroundColor: '#D6EEFF' }}>
          <CardContent>
            <HourglassTopOutlinedIcon></HourglassTopOutlinedIcon>
            <Typography variant="body2" color="textSecondary">
            {t('Status')} : {t('In progress')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
            {t('Amount of tasks')}  : {totalSumInprogress}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ManagerMainSummary;
