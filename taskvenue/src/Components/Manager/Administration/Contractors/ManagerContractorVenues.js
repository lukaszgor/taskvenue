import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import supabase from '../../../../supabaseClient';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


const ManagerContractorVenues = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [venues, setVenues] = useState(null);
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
      fetchVenues(idConfig, id);
    }
  }, [idConfig]);

  const handleButtonClickVenueDetails = (event, cellValues) => {
    navigate('/VenueDetalils/' + cellValues.row.id);
  };



  // Download data
  const fetchVenues = async (idConfiguration, id) => {
    const { data, error } = await supabase
      .from('venues')
      .select()
      .eq('id_contractor', id)
      .eq('id_configuration', idConfiguration);
    if (error) {
      console.log(error);
      setVenues(null);
      setFetchError(t('No Venues'));
    }
    if (data) {
        setVenues(data);
      setFetchError(null);
    }
  };



  const columns = [
    { field: 'id', headerName: t('ID'), width: 50 },
    { field: 'name', headerName: t('Name'), width: 300 },
    { field: 'GPS_location', headerName: t('Address'), width: 200 },
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
        {venues && (
          <div>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={venues}
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

export default ManagerContractorVenues;
