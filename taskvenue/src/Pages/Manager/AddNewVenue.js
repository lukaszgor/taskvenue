import React from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { useState,useEffect } from 'react';
import supabase from '../../supabaseClient';
import { useTranslation } from "react-i18next";
import { TextField, Button, Grid, Container, Typography, Select, MenuItem,FormControl } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const AddNewVenue = () => {
    const { t, i18n } = useTranslation();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

        const [contractors, setContractors] = useState([]);
        const [selectedContractorId, setSelectedContractorId] = useState(null);

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
                    FetchContractors(idConfig)
                }
              }, [idConfig]);
        
              const FetchContractors = async (idConfig) => {
                const{data,error} =  await supabase
                .from('contractor')
                .select()
                .eq('id_configuration', idConfig);
                if(error){
                    console.log(error)
                }if(data){
                  setContractors(data)
                }
              }

    const handleChange = (event) => {
        setSelectedContractorId(event.target.value);
      };

    //insert
    const insertVenue = async()=>{
        const{data,error} =  await supabase
        .from('venues')
        .insert([{id_configuration:idConfig,name:name,GPS_location:address,description:description,who_created:userID,id_contractor:selectedContractorId}])
        handleClickAlert()
        if(error){
            console.log(error)
        }if(data){
         
        }
      }
      const handleSubmit = (event) => {
        event.preventDefault();
        insertVenue();
      };
 

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
            <ManagerNavBar></ManagerNavBar>
            <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
       {t("Add venue")} 
       <p></p>
        </Typography>
        <form onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label={t("name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="address"
                label={t("address")}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="description"
                label={t("description")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select
              labelId="contractor-select-label"
              id="contractor-select"
              value={selectedContractorId}
              onChange={handleChange}
              label={t("Select Contractor")}
            >
              {contractors.map((contractor) => (
                <MenuItem key={contractor.id} value={contractor.id}>
                  {contractor.nameOrCompanyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
   
             </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {t("Submit")}
              </Button>
            </Grid>
            </Grid>
          <div>
    </div>
        </form>
        <Snackbar open={open}
            autoHideDuration={2000}
            onClose={handleCloseAlert}>
          <Alert severity="success"> {t("Updated!")}!</Alert>
          </Snackbar>
      </Container>
      </div>
      );
};

export default AddNewVenue;