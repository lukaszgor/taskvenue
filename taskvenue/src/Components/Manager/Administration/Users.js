import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import supabase from '../../../supabaseClient';
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";

function Users() {
    const { t, i18n } = useTranslation();
    const [fetchError,setFetchError] =useState(null)
    const [user,setUser] =useState(null)
    const navigate = useNavigate()
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
                fetchUsers(idConfig)
              
            }
          }, [idConfig]);


    const fetchUsers = async(idConfig)=>{
        const{data,error} =  await supabase
        .from('profiles')
        .select()
        .eq('id_configuration',idConfig);
        if(error){
            console.log(error)
            setUser(null)
            setFetchError(t("No users"))
        }if(data){
          setUser(data)
          setFetchError(null)
        }
    }
const UserDetails=(event, cellValues)=>{
    console.log(cellValues.row);
    navigate('/UserDetails/'+cellValues.row.id)
}
const Register=()=>{
    navigate('/Register')
}
    const columns = [
        { field: 'id', headerName: 'ID', type: 'number', width: 300 },
        { field: 'username', headerName: t("First and last name"), type: 'number',width: 200 },
        { field: 'full_name', headerName: t("Email"), type: 'number',width: 200 },
        { field: 'profile_type', headerName: t("Type"), width: 130 },
        {
            field: "Akcje",headerName: t("Action"), width: 200 ,
            renderCell: (cellValues) => {
              return ( 
                <Button
                color="primary"
                onClick={(event) => {
                    UserDetails(event, cellValues);
                }}
                >{t("details")}</Button>
              );
            }
          },
      ];
    return (
      <div>
          {fetchError &&(<p>{fetchError}</p>)}
        {user &&(
        <div>
      <p> </p>
      <Button color="primary" onClick={Register}>{t('new')}</Button>
      <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={user}
              columns={columns}
              pageSize={12}
              rowsPerPageOptions={[12]}
            />
          </div>
      <div>
      </div>
        </div>
        )}
      </div>
    );
  }
  export default Users;
  