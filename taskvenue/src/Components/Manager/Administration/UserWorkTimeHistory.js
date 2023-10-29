import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import supabase from '../../../supabaseClient';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


const UserWorkTimeHistory = () => {
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
    navigate('/TaskDetails/' + cellValues.row.idTask);
  };



  // Download data
  const fetchTasks = async (idConfiguration, id) => {
    const { data, error } = await supabase
      .from('workTime')
      .select()
      .eq('id_user', id)
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


  const columns = [
    { field: 'idTask', headerName: t('ID'), width: 50 },
    { field: 'name', headerName: t('Name'), width: 200 },
    { field: 'time', headerName: t('Time'), width: 200 },
    {
      field: 'date',
      headerName: t('Creation date'),
      width: 140,
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

export default UserWorkTimeHistory;
