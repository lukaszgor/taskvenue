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


const ManagerWorkTime = () => {
    const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [fetchError,setFetchError] =useState(null)
  const [workTime,setWorkTime] =useState(null)
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
            fetchWorkTime(idConfig,id)
          }
        }, [idConfig]);

  
  const ForwardToTask = async(event, cellValues)=>{
    navigate('/TaskDetails/' + cellValues.row.idTask);
  }
    const fetchWorkTime = async(idConfiguration,id)=>{
      const{data,error} =  await supabase
      .from('workTime')
      .select(`*,
      profiles:profiles(username) as profiles_username,
            `)
      .eq('id_configuration', idConfiguration);
      if(error){
          console.log(error)
          setWorkTime(null)
          setFetchError(t("No work Time"))
      }if(data){
        setWorkTime(data)
        setFetchError(null)
      }
  }


  const columns = [
    { field: 'idTask', headerName: t("ID"), width: 60 },
    {
        field: 'profiles.username',
        headerName: t('User'),
        sortable: false, 
        filterable: false,
        width: 140,
        renderCell: (params) => {
          return <span>{params.row.profiles.username}</span>;
        },
      },
    { field: 'date', headerName: t("Date"), width: 150 },
    { field: 'description', headerName: t("Description"), width: 100},
    { field: 'time', headerName: t("Time"), width: 60 },

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
     {workTime &&(
     <div>
   <p> </p>
   <div style={{ height: 400, width: '100%' }}>
         <DataGrid
           rows={workTime}
           columns={columns}
           pageSize={25}
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

export default ManagerWorkTime;
