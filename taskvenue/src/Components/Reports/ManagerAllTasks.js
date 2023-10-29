import { useState,useEffect } from 'react';
import { DataGrid,GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Button, } from '@mui/material';
import supabase from '../../supabaseClient';
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }


const ManagerAllTasks = () => {
    const navigate = useNavigate();
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
const formatDate = (date) => {
  return moment(date).format('DD.MM.YYYY, HH:mm'); // Parsuj datę do żądanego formatu
};

  
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
    navigate('/TaskDetails/' + cellValues.row.id);
  }
    const fetchServices = async(idConfiguration,id)=>{
      const{data,error} =  await supabase
      .from('tasks')
      .select(`*,
      contractor:contractor(nameOrCompanyName) as contractor_nameOrCompanyName,
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
    { field: 'id', headerName: t("ID"), width: 60 },
    {
        field: 'contractor.nameOrCompanyName',
        headerName: t('Contractor'),
        width: 140,
        renderCell: (params) => {
          return <span>{params.row.contractor.nameOrCompanyName}</span>;
        },
      },
    { field: 'name', headerName: t("Name"), width: 150 },
    { field: 'description', headerName: t("Description"), width: 100},
    { field: 'status', headerName: t("Status"), width: 100 , valueGetter: (params) => {
        const taskStatus = params.value;
        if (taskStatus === 'open') {
            return t('Open');
        } else if (taskStatus === 'inProgress') {
            return t('In progress');
        } else if (taskStatus === 'completed') {
            return t('Completed');
        } 
        else if (taskStatus === 'cancelled') {
            return t('Cancelled');
        }else {
            return taskStatus;
        }
    }, },
    { field: 'estimatedTime', headerName: t("Estimated time"), width: 150 },
    { field: 'type', headerName: t("Type"), width: 80 },
    { field: 'settled', headerName: t("Settled"), width: 100, valueGetter: (params) => {
        const taskSettled = params.value;
        if (taskSettled === 1) {
            return t('Yes');
        } else if (taskSettled === null) {
            return t('No');
        } else {
            return taskSettled;
        }
    }, },
    { field: 'createdDate', headerName: t("Creation date"), width: 150, valueFormatter: (params) => formatDate(params.value) },
    { field: 'kickoffDate', headerName: t("Start of implementation"), width: 140, valueFormatter: (params) => formatDate(params.value) },
    { field: 'deadline', headerName: t("Deadline"), width: 140, valueFormatter: (params) => formatDate(params.value) },
    { field: 'id_venue', headerName: t("Venue ID"), width: 100 },
    { field: 'author', headerName: t("Author"), width: 100 },
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

export default ManagerAllTasks;
