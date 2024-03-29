import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Container, Box } from '@mui/material';
import supabase from '../../supabaseClient';
import { useTranslation } from 'react-i18next';
import { userId } from '../Common/Auth';
import OpenAndInProgressLegend from '../Common/Legends/OpenAndInProgressLegend';

const YourOpenAndInProgressTasksReport = () => {
  const [mockedData, setMockedData] = useState([]);
  const { t } = useTranslation();
  const [idConfig, setIdConfiguration] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        fetchData(data.session.user.id);
        setUser(data.session.user.id);
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

  useEffect(() => {
    if (idConfig) {
      async function fetchAndSetData() {
        const tasksData = await fetchTasksData(idConfig, user);
        const transformedData = transformData(tasksData);
        setMockedData(transformedData);
      }

      fetchAndSetData();
    }
  }, [idConfig]);

  async function fetchTasksData(idConfig, user) {
    const { data, error } = await supabase
      .from('tasks')
      .select('status, id, asigned_user')
      .eq('asigned_user', user)
      .eq('id_configuration', idConfig)
      .in('status', ['inProgress', 'open']);

    if (error) {
      console.error('Error fetching data:', error.message);
      return [];
    }
    return data || [];
  }

  const statusMapping = {
    inProgress: t('In progress'),
    open: t('Open'),
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

  const COLORS = ['#B2E8A6', '#EF8354'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20; // Increase this value to move the labels further outside
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {mockedData[index].status} ({mockedData[index].value})
      </text>
    );
  };

  return (
    <div>
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          // height="30vh"
          padding={2}
        >
          <PieChart width={250} height={150}>
            <Pie
              data={mockedData}
              dataKey="value"
              nameKey="status"
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={60}
              fill="#8884d8"
            >
              {mockedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Box>
      </Container>
      {/* <OpenAndInProgressLegend></OpenAndInProgressLegend> */}
    </div>
  );
};

export default YourOpenAndInProgressTasksReport;
