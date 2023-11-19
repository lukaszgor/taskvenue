import { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import supabase from '../../../supabaseClient';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'; // Dodaj moment do importów

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const UserWorkTimeHistory = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [tasksWithDetails, setTasksWithDetails] = useState(null);
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
      console.error(profileError);
    } else if (profileData) {
      setIdConfiguration(profileData.id_configuration);
    }
  };

  useEffect(() => {
    if (idConfig) {
      fetchTasksWithDetails(idConfig, id);
    }
  }, [idConfig, id]);

  const handleButtonClickVenueDetails = (event, cellValues) => {
    navigate('/TaskDetails/' + cellValues.row.idTask);
  };

  const fetchTasksWithDetails = async (idConfiguration, id) => {
    try {
      const { data: workTimeData, error: workTimeError } = await supabase
        .from('workTime')
        .select('*, tasks(*)')
        .eq('id_user', id)
        .eq('id_configuration', idConfiguration);

      if (workTimeError) {
        console.error(workTimeError);
        setTasksWithDetails(null);
        setFetchError(t('Error fetching data.'));
      }

      if (workTimeData) {
        const processedData = workTimeData.map((workTime, index) => ({
          id: index,
          idTask: workTime.tasks ? workTime.tasks.id : null,
          plannedDeadline: workTime.tasks ? moment(workTime.tasks.deadline).format('DD/MM/YYYY HH:mm') : null,
          plannedKickoff: workTime.tasks ? moment(workTime.tasks.kickoffDate).format('DD/MM/YYYY HH:mm') : null,
          description: workTime.description,
          date: workTime.date,
          // Dodaj inne kolumny workTime, jeśli są potrzebne
        }));

        setTasksWithDetails(processedData);
        setFetchError(null);
      }
    } catch (error) {
      console.error(error);
      setTasksWithDetails(null);
      setFetchError(t('Error fetching data.'));
    }
  };

  const columns = [
    { field: 'idTask', headerName: t('ID Task'), width: 50 },
    { field: 'plannedKickoff', headerName: t('Start date'), width: 160 },
    { field: 'plannedDeadline', headerName: t('End date'), width: 160 },
    { field: 'description', headerName: t('Description'), width: 80 },
    { field: 'date', headerName: t('Creation date'), width: 140 },
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
        {tasksWithDetails && (
          <div>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={tasksWithDetails}
                columns={columns}
                pageSize={12}
                rowsPerPageOptions={[12]}
                slots={{
                  toolbar: CustomToolbar,
                }}
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
