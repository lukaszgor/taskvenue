import React from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { useState,useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography, Select, MenuItem } from '@mui/material';
import supabase from '../../supabaseClient';
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const UserDetails = () => {
    const {id} = useParams()
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [profile_type, setProfileType] = useState('');

const FetchUserData = async () => {
    const{data,error} =  await supabase
    .from('profiles')
    .select()
    .eq('id',id)
    .single()
    if(error){
     
    }if(data){
        setEmail(data.full_name)
        setName(data.username)
        setAddress(data.address)
        setPhoneNumber(data.phone_number)
        setDescription(data.description)
        setProfileType(data.profile_type)
    }
    }
    useEffect(()=>{
        FetchUserData();
      },[])

      const handleSubmit = (event) => {
        event.preventDefault();
      updateUser();
       
      };
      //update data 
const updateUser =async()=>{
    const{data,error}=await supabase
    .from('profiles')
    .update({'username':name,'full_name':email,'profile_type':profile_type,'description':description,'phone_number':phone_number,'address':address,})
    .eq('id',id)
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
         <ManagerNavBar></ManagerNavBar>
<Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
       {t("User edit")} 
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