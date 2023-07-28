import React from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { useState,useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography, Select, MenuItem } from '@mui/material';
import supabase from '../../supabaseClient';
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom"


const ContractorsDetails = () => {
    const navigate = useNavigate()
    const {id} = useParams()
const { t, i18n } = useTranslation();
const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [taxtId, setTaxtId] = useState('');
  const [nationalEconomyRegisterNumber, setNationalEconomyRegisterNumber] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [email, setEmail] = useState('');
  const [contactPerson, setContactPerson] = useState('');

  useEffect(()=>{
    FetchContractor();
  },[])

  const FetchContractor = async()=>{
    const{data,error} =  await supabase
    .from('contractor')
    .select()
    .eq('id',id)
    .single()
    if(error){
        console.log(error)
    }if(data){
        setName(data.nameOrCompanyName);
        setDescription(data.description);
        setTaxtId(data.taxId);
        setNationalEconomyRegisterNumber(data.nationalEconomyRegisterNumber);
        setAddress(data.address);
        setPhone_number(data.phone_number);
        setEmail(data.email);
        setContactPerson(data.contactPerson);
    }
}

const updateContrator =async()=>{
    const{data,error}=await supabase
    .from('contractor')
    .update({'nameOrCompanyName':name,'description':description,'taxId':taxtId,'nationalEconomyRegisterNumber':nationalEconomyRegisterNumber,'phone_number':phone_number,'address':address,'email':email,'contactPerson':contactPerson})
    .eq('id',id)
    handleClickAlert()
}

  //Delete
  const DeleteContractor = async(event, cellValues)=>{
    const{data,error} =  await supabase
.from('contractor')
.delete().eq('id',id);
handleClickAlert();
navigate('/Administration');
if(error){
    console.log(error)
}if(data){
}
}

const handleSubmit = (event) => {
    event.preventDefault();
    updateContrator()
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
       <p></p>
        </Typography>
        <form onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
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
              <TextField
                name="Tax ID"
                label={t("Tax ID")}
                value={taxtId}
                onChange={(e) => setTaxtId(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nationalEconomyRegisterNumber"
                label={t("National Economy Register ID")}
                value={nationalEconomyRegisterNumber}
                onChange={(e) => setNationalEconomyRegisterNumber(e.target.value)}
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
                onChange={(e) => setPhone_number(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label={t("email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="contactPerson"
                label={t("contact person")}
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                fullWidth
              />
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
            <Grid item xs={12}>
              <Button
                type="error"
                variant="contained"
                color="error"
                fullWidth
                onClick={DeleteContractor} 
              >
                {t("Delete")}
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
export default ContractorsDetails;