import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, Container, Typography } from '@mui/material';
import supabase from '../../supabaseClient';
import { useTranslation } from 'react-i18next';

// Przeparsowanie daty w formacie "YYYY-MM-DD" do "YYYY-MM-DDTHH:mm"
function formatDateToISOString(date) {
  const isoString = date.toISOString();
  return isoString.slice(0, 16); // Obcina ostatnie trzy znaki (sekundy i milisekundy)
}

const ClientStatusOfImplementation30Report = () => {
  const [mockedData, setMockedData] = useState([]);
  const { t } = useTranslation();
  const [idConfig, setIdConfiguration] = useState('');
  const [idContractor, setIdContractor] = useState('');
  const [currentDate, setCurrentDate] = useState(formatDateToISOString(new Date()));
  const [daysAgo, setDaysAgo] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return formatDateToISOString(date);
  });

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
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
      setIdContractor(profileData.id_contractor);
    }
  };

  useEffect(() => {
    if (idConfig) {
      async function fetchAndSetData() {
        const tasksData = await fetchTasksData(idConfig,idContractor);
        const transformedData = transformData(tasksData);
        setMockedData(transformedData);
      }

      fetchAndSetData();
    }
  }, [idConfig, currentDate, daysAgo,idContractor]);

  async function fetchTasksData(idConfig,idContractor) {
    const { data, error } = await supabase
      .from('tasks')
      .select('status,id,id_contractor')
      .eq('id_configuration', idConfig)
      .eq('id_contractor', idContractor)
      .in('status', ['inProgress', 'open', 'completed'])
      .gte('created_at', daysAgo)
      .lte('created_at', currentDate);

    if (error) {
      console.error('Error fetching data:', error.message);
      return [];
    }
    return data || [];
  }

  const statusMapping = {
    inProgress: t('In progress'),
    open: t('Open'),
    completed: t('Completed'),
  };

  function transformData(tasksData) {
    const statusCounts = {};
    tasksData.forEach((task) => {
      const translatedStatus = statusMapping[task.status];
      if (translatedStatus) {
        if (statusCounts[translatedStatus]) {
          statusCounts[translatedStatus]++;
        } else {
          statusCounts[translatedStatus] = 1;
        }
      }
    });

    const transformedData = Object.entries(statusCounts).map(([status, value]) => ({
      status,
      value,
    }));

    return transformedData;
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2} className="left-input">
          <label htmlFor="currentDate">{t("Date from : ")}</label>
          <input
            type="datetime-local" // Użyj typu "datetime-local" dla inputa
            id="currentDate"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2} className="right-input">
          <label htmlFor="daysAgo">{t("Date to : ")}</label>
          <input
            type="datetime-local" // Użyj typu "datetime-local" dla inputa
            id="daysAgo"
            value={daysAgo}
            onChange={(e) => setDaysAgo(e.target.value)}
          />
        </Grid>
      </Grid>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#3498db" name={t('Tasks')} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClientStatusOfImplementation30Report;
