import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Grid, Container, Typography,TextField } from '@mui/material';
import supabase from '../../supabaseClient';
import { useTranslation } from 'react-i18next';

// Przeparsowanie daty w formacie "YYYY-MM-DD" do "YYYY-MM-DDTHH:mm"
function formatDateToISOString(date) {
  const isoString = date.toISOString();
  return isoString.slice(0, 16); // Obcina ostatnie trzy znaki (sekundy i milisekundy)
}

const ReportRealizationOfIssuesForTheCustomers = () => {
  const [mockedData, setMockedData] = useState([]);
  const { t } = useTranslation();
  const [idConfig, setIdConfiguration] = useState('');
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
      .select('id_configuration')
      .eq('id', userId)
      .single();
    if (profileError) {
      console.error(profileError);
    } else if (profileData) {
      setIdConfiguration(profileData.id_configuration);
    }
  };

  useEffect(() => {
    if (idConfig) {
      async function fetchAndSetData() {
        const tasksData = await fetchTasksData(idConfig);
        const contractorData = await fetchContractorData();

        if (tasksData && contractorData) {
          const transformedData = transformData(tasksData, contractorData);
          setMockedData(transformedData);
        } else {
          console.error('Error fetching data');
        }
      }

      fetchAndSetData();
    }
  }, [idConfig, currentDate, daysAgo]);

  async function fetchTasksData(idConfig) {
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .eq('id_configuration', idConfig)
      .eq('status', 'completed') 
      .gte('created_at', daysAgo)
      .lte('created_at', currentDate);

    if (error) {
      console.error('Error fetching data:', error.message);
      return [];
    }
    return data || [];
  }

  async function fetchContractorData() {
    const { data, error } = await supabase.from('contractor').select('id,nameOrCompanyName');

    if (error) {
      console.error('Error fetching contractor data:', error.message);
      return [];
    }
    return data || [];
  }

  function transformData(tasksData, contractorData) {
    if (!tasksData || !contractorData) {
      console.error('Data is undefined');
      return [];
    }

    const contractorMap = {};

    // Tworzenie mapy id_contractor -> name
    contractorData.forEach((contractor) => {
      contractorMap[contractor.id] = contractor.nameOrCompanyName;
    });

    const statusCounts = {};
    tasksData.forEach((task) => {
      const contractorName = contractorMap[task.id_contractor];
      if (contractorName) {
        if (statusCounts[contractorName]) {
          statusCounts[contractorName]++;
        } else {
          statusCounts[contractorName] = 1;
        }
      }
    });

    const transformedData = Object.entries(statusCounts).map(([nameOrCompanyName, value]) => ({
      nameOrCompanyName,
      value,
    }));

    return transformedData;
  }

  return (
    <div>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <TextField
          type="datetime-local"
          id="daysAgo"
          value={daysAgo}
          onChange={(e) => setDaysAgo(e.target.value)}
          fullWidth
          margin="normal"
          label={t('Date from : ')}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <TextField
          type="datetime-local"
          id="currentDate"
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
          fullWidth
          margin="normal"
          label={t('Date to : ')}
        />
      </Grid>
      </Grid>
      <ResponsiveContainer width="90%" height={300}>
  <BarChart data={mockedData} layout="vertical" margin={{ top: 10, right: 10, bottom: 20, left: 100 }} > {/* Ustawienie layout na "vertical" */}
    <CartesianGrid strokeDasharray="3 3" />
    <YAxis dataKey="nameOrCompanyName" type="category" /> 
    <XAxis type="number" />
    <Tooltip />
    <Legend />
    <Bar dataKey="value" fill="#0077B6" name={t('Tasks')} />
  </BarChart>
</ResponsiveContainer>

    </div>
  );
};

export default ReportRealizationOfIssuesForTheCustomers;
