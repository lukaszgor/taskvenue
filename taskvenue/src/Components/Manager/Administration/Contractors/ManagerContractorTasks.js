import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import supabase from '../../../../supabaseClient';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'; // Import moment library

const ManagerContractorTasks = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [tasks, setTasks] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (idConfig) {
      fetchTasks(idConfig, id);
    }
  }, [idConfig]);

  const handleButtonClickVenueDetails = (event, cellValues) => {
    navigate('/TaskDetails/' + cellValues.row.id);
  };

  // Function to format a date string
  const formatDate = (dateStr) => {
    const formattedDate = moment(dateStr).format('DD.MM.YY HH:mm');
    return formattedDate;
  };

  // Download data
  const fetchTasks = async (idConfiguration, id) => {
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .eq('id_contractor', id)
      .eq('id_configuration', idConfiguration);
    if (error) {
      console.log(error);
      setTasks(null);
      setFetchError(t('No Tasks'));
    }
    if (data) {
      setTasks(data);
      setFetchError(null);
    }
  };

  const mapStatusToTranslation = (status) => {
    switch (status) {
      case 'inProgress':
        return t('In progress');
      case 'open':
        return t('Open');
        case 'cancelled':
            return t('Cancelled');
      case 'completed':
        return t('Completed');

      default:
        return status;
    }
  };

  const columns = [
    { field: 'id', headerName: t('ID'), width: 50 },
    { field: 'name', headerName: t('Name'), width: 200 },
    {
      field: 'createdDate',
      headerName: t('Creation date'),
      width: 140,
      valueFormatter: (params) => formatDate(params.value), // Format the date using formatDate function
    },
    {
      field: 'status',
      headerName: t('Status'),
      width: 140,
      valueGetter: (params) => mapStatusToTranslation(params.row.status),
    },
    {
      field: 'Action',
      headerName: t('Action'),
      width: 100,
      renderCell: (cellValues) => {
        return (
          <Button
            color="primary"
            onClick={(event) => {
              handleButtonClickVenueDetails(event, cellValues);
            }}
          >
            {t('Details')}
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <p></p>
      <div>
        {fetchError && <p>{fetchError}</p>}
        {tasks && (
          <div>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={tasks}
                columns={columns}
                pageSize={12}
                rowsPerPageOptions={[12]}
              />
            </div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerContractorTasks;
