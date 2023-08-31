import React from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { useState,useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography, Select, MenuItem,Checkbox,FormControlLabel,FormControl,InputLabel } from '@mui/material';
import supabase from '../../supabaseClient';
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ManagerAdministrationUserBreadcrumbs from '../../Components/Breadcrumbs/ManagerAdministrationUserBreadcrumbs';
import { useNavigate } from "react-router-dom"

const UserDetails = () => {
    const {id} = useParams()
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [profile_type, setProfileType] = useState('');
    const [isBlocked, setIsBlocked] = useState(0);
    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');
    const navigate = useNavigate();
   
        const [contractors, setContractors] = useState([]);
        const [selectedContractorId, setSelectedContractorId] = useState(null);

    const handleChange = (event) => {
        setSelectedContractorId(event.target.value);
      };
const FetchUserData = async () => {
    const{data,error} =  await supabase
    .from('profiles')
    .select()
    .eq('id',id)
    .eq('id_configuration', idConfig)
    .single()
    if(error){
      navigate('/home')
    }if(data){
        setEmail(data.full_name)
        setName(data.username)
        setAddress(data.address)
        setPhoneNumber(data.phone_number)
        setDescription(data.description)
        setProfileType(data.profile_type)
        setIsBlocked(data.isBlocked)
        setSelectedContractorId(data.id_contractor)
    }
    }

    const handleFetchContractors = async (idConfig) => {
        const { data, error } = await supabase
            .from('contractor')
            .select()
            .eq('id_configuration', idConfig);

        if (error) {
            console.log(error)
        }
        if (data) {
            setContractors(data)
        }
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
            handleFetchContractors(idConfig);
            FetchUserData();
        }
    }, [idConfig]);

      const handleSubmit = (event) => {
        event.preventDefault();
      updateUser();
       
      };
      //update data 
const updateUser =async()=>{
    const{data,error}=await supabase
    .from('profiles')
    .update({'username':name,'full_name':email,'profile_type':profile_type,'description':description,'phone_number':phone_number,'address':address,'id_contractor':selectedContractorId})
    .eq('id',id)
    handleClickAlert()
}
const handleCheckboxChange = (event) => {
    setIsBlocked((prevState) => (prevState === null ? 1 : null));
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
         <ManagerAdministrationUserBreadcrumbs></ManagerAdministrationUserBreadcrumbs>
<Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
       <p></p>
        </Typography>
        <form onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label="Adres email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label={t("First and last name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
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
                name="phone_number"
                label={t("phone number")}
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
              <Select
                name="profile_type"
                label={t("profile type")}
                value={profile_type}
                onChange={(e) => setProfileType(e.target.value)}
                fullWidth
                required
              >
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="worker">Worker</MenuItem>
                <MenuItem value="client">Client</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
            
                    <FormControlLabel 
                    control={<Checkbox
                    checked={isBlocked !== null}
                    onChange={handleCheckboxChange}
                    color="primary"/>} label={t("Blocked")} />
            </Grid>
            <Grid item xs={12} sm={6}>
            {profile_type === 'client' && (
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
        )}
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
export default UserDetails;