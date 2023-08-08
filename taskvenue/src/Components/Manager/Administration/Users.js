import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import supabase from '../../../supabaseClient';
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";
import { TextField, Button, Grid, Container, Typography, Select, MenuItem,Checkbox,FormControlLabel,FormControl,InputLabel } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Users() {
    const { t, i18n } = useTranslation();
    const [fetchError,setFetchError] =useState(null)
    const [user,setUser] =useState(null)
    const navigate = useNavigate()
    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');
    const [foreignUserID, setForeignUserID] = useState('');
    const [foreignProfileType, setProfileForeignType] = useState('worker');
  
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
    // console.log(cellValues.row);
    navigate('/UserDetails/'+cellValues.row.id)
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
      const handleSubmit = (event) => {
        event.preventDefault();
      updateUser();
      setForeignUserID('');
       
      };
      const updateUser =async()=>{
        const{data,error}=await supabase
        .from('profiles')
        .update({'profile_type':foreignProfileType,'id_configuration':idConfig})
        .eq('id',foreignUserID)
        handleClickAlert()
    }
      //alert configuration
      const [open,setOpen] =useState(null)

      const handleClickAlert = () => {
        setOpen(true);
      };
      
      const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    return (
      <div>
   <form onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="User ID"
                label={t("User ID")}
                onChange={(e) => setForeignUserID(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                name="profile_type"
                label={t("profile type")}
                value={foreignProfileType}
                onChange={(e) => setProfileForeignType(e.target.value)}
                fullWidth
                required
              >
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="worker">Worker</MenuItem>
                <MenuItem value="client">Client</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!foreignUserID} 
              >
                {t("Submit")}
              </Button>
              <Container>
            <Snackbar open={open}
            autoHideDuration={2000}
            onClose={handleCloseAlert}>
          <Alert severity="success"> {t("Updated!")}!</Alert>
          </Snackbar>
      </Container>
            </Grid>
            </Grid>
          <div>
    </div>
        </form>
          {fetchError &&(<p>{fetchError}</p>)}
        {user &&(
        <div>
      <p> </p>
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
  