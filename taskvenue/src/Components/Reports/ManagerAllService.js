import { useState,useEffect } from 'react';
import { DataGrid,GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Button, } from '@mui/material';
import supabase from '../../supabaseClient';
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }


const ManagerAllService = () => {
    const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [fetchError,setFetchError] =useState(null)
  const [service,setService] =useState(null)
  const {id} = useParams()
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
            fetchServices(idConfig,id)
          }
        }, [idConfig]);


  
  const ForwardToTask = async(event, cellValues)=>{
    navigate('/TaskDetails/' + cellValues.row.idTask);
  }

//download data
    const fetchServices = async(idConfiguration,id)=>{
      const{data,error} =  await supabase
      .from('services')
      .select(`*,
      profiles:profiles(username) as profiles_username
            `)
      .eq('id_configuration', idConfiguration);
      if(error){
          console.log(error)
          setService(null)
          setFetchError(t("No services"))
      }if(data){
        setService(data)
        setFetchError(null)
      }
  }


  const columns = [
    { field: 'idTask', headerName: t("Task ID"), width: 60 },
    { field: 'name', headerName: t("Name"), width: 250 },
    { field: 'description', headerName: t("Description"), width: 350},
    { field: 'cost', headerName: t("Cost"), width: 70 },
    { field: 'quantity', headerName: t("Quantity"), width: 70 },
    { field: 'unit', headerName: t("Unit"), width: 100 },
    { field: 'total', headerName: t("Total"), width: 70 },
    { field: 'date', headerName: t("Date"), width: 140 },
    {
      field: 'profiles.username',
      headerName: t('User'),
      width: 140,
      renderCell: (params) => {
        return <span>{params.row.profiles.username}</span>;
      },
    },
    {
        field: "Action",headerName: t("Action"), width: 100 ,
        renderCell: (cellValues) => {
          return ( 
            <Button
            color="primary"
            onClick={(event) => {
                ForwardToTask(event, cellValues);
            }}
            >{t("Details")}</Button>
          );
        }
      },
   
  ];

  return (
    <div>
   <div>
     {fetchError &&(<p>{fetchError}</p>)}
     {service &&(
     <div>
   <p> </p>
   <div style={{ height: 400, width: '100%' }}>
         <DataGrid
           rows={service}
           columns={columns}
           pageSize={12}
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

export default ManagerAllService;
