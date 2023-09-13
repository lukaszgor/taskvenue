import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import supabase from '../../../supabaseClient';
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";
import { TextField, Button, Grid, Container, Typography,Accordion, AccordionSummary, AccordionDetails, Select, MenuItem,Checkbox,FormControlLabel,FormControl,InputLabel,Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
        { field: 'username', headerName: t("First and last name"), type: 'number',width: 250 },
        { field: 'full_name', headerName: t("Email"), type: 'number',width: 250 },
        {
          field: 'profile_type',
          headerName: t("Type"),
          width: 130,
          valueGetter: (params) => {
              const profileType = params.value;
              if (profileType === 'manager') {
                  return t('Manager');
              } else if (profileType === 'client') {
                  return t('Client');
              } else if (profileType === 'worker') {
                  return t('Worker');
              } else {
                  return profileType;
              }
          },
      },
      {
        field: 'isBlocked',
        headerName: t("Blocked"),
        width: 100,
        valueGetter: (params) => {
          const isBlocked = params.value;
          if (isBlocked === 1) {
            return t("Blocked");
          } else {
            return t("Active");
          }
        },
      },
        {
            field: "Akcje",headerName: t("Action"), width: 600 ,
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
        fetchUsers(idConfig);
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
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Add new user')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <form onSubmit={handleSubmit} >
   <Container maxWidth="md">
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
            <FormControl fullWidth>
            <InputLabel id="status-select-select-label">{t("profile type")}</InputLabel>
              <Select
                name="profile_type"
                label={t("profile type")}
                value={foreignProfileType}
                onChange={(e) => setProfileForeignType(e.target.value)}
                fullWidth
                required
              >
                <MenuItem value="manager">{t('Manager')}</MenuItem>
                <MenuItem value="worker">{t('Worker')}</MenuItem>
                <MenuItem value="client">{t('Client')}</MenuItem>
              </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
                                <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{ minWidth: 'auto' }}
                                disabled={!foreignUserID} 
                                >
                                {t('Submit')}
                                </Button>
                            </Box>
            <Snackbar open={open}
            autoHideDuration={2000}
            onClose={handleCloseAlert}>
          <Alert severity="success"> {t("Updated!")}!</Alert>
          </Snackbar>
    
            </Grid>
            </Grid>
            </Container>
          <div>
    </div>
        </form>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Users')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
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
    
        </AccordionDetails>
      </Accordion>
  </div>


    
    );
  }
  export default Users;
  