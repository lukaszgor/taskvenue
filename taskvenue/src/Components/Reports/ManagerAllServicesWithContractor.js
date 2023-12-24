import React, { useEffect, useState } from 'react';
import { DataGrid,GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import supabase from '../../supabaseClient';
import { useTranslation } from "react-i18next";
import { Button, } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

const ManagerAllServicesWithContractor = () => {
    const navigate = useNavigate();
    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');
  const [services, setServices] = useState([]);
  const { t, i18n } = useTranslation();


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
    const fetchData = async (idConfiguration) => {
      // Pobieranie danych z tabeli 'services' i łączenie z 'tasks' oraz 'contractor'
      let { data: servicesData, error } = await supabase
        .from('services')
        .select(`
          *,
          tasks (
            id_contractor,
            contractor (
              nameOrCompanyName
            )
          )
        `).eq('id_configuration', idConfiguration);

      if (error) console.log("error", error);
      else {
        // Przetwarzanie danych do wyświetlenia w DataGrid
        const processedData = servicesData.map(service => ({
          ...service,
          contractorName: service.tasks.contractor.nameOrCompanyName
        }));
        setServices(processedData);
      }
    };
    if (idConfig) {
        fetchData(idConfig)
    }
  }, [idConfig]);

  const ForwardToTask = async(event, cellValues)=>{
    navigate('/TaskDetails/' + cellValues.row.idTask);
  }

  // Definiowanie kolumn dla DataGrid
  const columns = [
    { field: 'idTask', headerName: t("ID"), width: 60 },
    { field: 'contractorName', headerName: t("Contractor"), width: 200 },
    { field: 'name', headerName: t("Name"), width: 250 },
    { field: 'description', headerName: t("Description"), width: 350},
    { field: 'cost', headerName: t("Cost"), width: 70 },
    { field: 'quantity', headerName: t("Quantity"), width: 70 },
    { field: 'unit', headerName: t("Unit"), width: 100 },
    { field: 'total', headerName: t("Total"), width: 70 },
    { field: 'execution', headerName: t("Completed"), width: 70, valueGetter: (params) => {
        const taskSettled = params.value;
        if (taskSettled === 1) {
            return t('Yes');
        } else if (taskSettled === null) {
            return t('No');
        } else {
            return taskSettled;
        }
    }, },
    { field: 'date', headerName: t("Date"), width: 140 },
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

    // Możesz dodać więcej kolumn zgodnie z potrzebami
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={services}
        columns={columns}
        pageSize={12}
        slots={{
            toolbar: CustomToolbar,
          }}
      />
    </div>
  );
};

export default ManagerAllServicesWithContractor;
