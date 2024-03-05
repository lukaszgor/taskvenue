import { useState,useEffect } from 'react';
import { DataGrid,GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import supabase from '../../supabaseClient';
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, Container, Typography,TextField } from '@mui/material';

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }


const ManagerConstantWorkingSheetRaport = () => {


    function formatDateToISOString(date) {
        const isoString = date.toISOString();
        return isoString.slice(0, 16); // Obcina ostatnie trzy znaki (sekundy i milisekundy)
      }


  const { t, i18n } = useTranslation();
  const [fetchError,setFetchError] =useState(null)
  const [service,setService] =useState(null)
  const {id} = useParams()
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [sortModel, setSortModel] = useState([ 
  {
    field: 'id',
    sort: 'desc', // 'desc' oznacza sortowanie malejące
  },
]);
const [currentDate, setCurrentDate] = useState(formatDateToISOString(new Date()));
const [daysAgo, setDaysAgo] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return formatDateToISOString(date);
  });

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
            fetchServices(idConfig,id)
          }
        }, [idConfig,currentDate, daysAgo]);

    const fetchServices = async(idConfiguration,id)=>{
      const{data,error} =  await supabase
      .from('constant_working')
      .select(`*,
      profiles:profiles(username) as profiles_username,
            `)
      .eq('id_configuration', idConfiguration)
      .gte('created_at', daysAgo)
      .lte('created_at', currentDate);
      if(error){
          console.log(error)
          setService(null)
          setFetchError(t("No data"))
      }if(data){
        setService(data)
        setFetchError(null)
      }
  }


  const columns = [
    {
        field: 'profiles.username',
        headerName: t('User'),
        width: 140,
        sortable: false, 
        filterable: false,
        disableColumnMenu: true,
        disableColumnReorder: true,
        renderCell: (params) => {
          return <span>{params.row.profiles.username}</span>;
        },
      },
    { field: 'start_date', headerName: t("Start Date"), width: 150,  },
    { field: 'stop_date', headerName: t("End Date"), width: 140, },
   
  ];

  return (
    <div>
   <div>
     {fetchError &&(<p>{fetchError}</p>)}
     {service &&(
     <div>
   <p> </p>
   <Grid container spacing={2}>
        <Grid item  xs={12} sm={12} md={6} lg={6}>
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
      <Grid item  xs={12} sm={12} md={6} lg={6}>
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
   <div style={{ height: 400, width: '100%' }}>
         <DataGrid
           rows={service}
           columns={columns}
           pageSize={25}
           sortModel={sortModel} 
           rowsPerPageOptions={[12]}
           slots={{
            toolbar: CustomToolbar,
          }}
         />
       </div>
   <div>
   </div>
     </div>
     )}
   </div>
  </div>
  );
};

export default ManagerConstantWorkingSheetRaport;

