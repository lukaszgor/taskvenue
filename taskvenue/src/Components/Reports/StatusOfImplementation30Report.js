import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import supabase from '../../supabaseClient';
import { useTranslation } from 'react-i18next';

const StatusOfImplementation30Report = () => {
  const [mockedData, setMockedData] = useState([]);
  const { t } = useTranslation();
  const [idConfig, setIdConfiguration] = useState('');

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
      console.log(profileError);
    } else if (profileData) {
      setIdConfiguration(profileData.id_configuration);
    }
  };

  useEffect(() => {
    if (idConfig) {
      async function fetchAndSetData() {
        const tasksData = await fetchTasksData(idConfig);
        const transformedData = transformData(tasksData);
        setMockedData(transformedData);
      }

      fetchAndSetData();
    }
  }, [idConfig]);

  async function fetchTasksData(idConfig) {
    const currentDate = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await supabase
      .from('tasks')
      .select('status,id')
      .eq('id_configuration', idConfig)
      .in('status', ['inProgress', 'open', 'completed'])
      .gte('created_at', thirtyDaysAgo.toISOString())
      .lte('created_at', currentDate.toISOString());

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
    tasksData.forEach(task => {
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
      <h2>{t('Status of the implementation of issues in the last 30 days')}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#3498db" name={t("Tasks")} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusOfImplementation30Report;
