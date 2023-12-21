import React from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { useState,useEffect } from 'react';
import supabase from '../../supabaseClient';
import { useTranslation } from "react-i18next";
import { TextField, Button, Grid, Container, Typography, Select, MenuItem,FormControl,InputLabel,Box,Tooltip,Accordion,AccordionSummary,AccordionDetails } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ManagerAdministrationContractorBreadcrumbs from '../../Components/Breadcrumbs/ManagerAdministrationContractorBreadcrumbs';
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AddNewContractor = () => {
    const navigate = useNavigate()

  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [taxtId, setTaxtId] = useState('');
  const [nationalEconomyRegisterNumber, setNationalEconomyRegisterNumber] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [email, setEmail] = useState('');
  const [contactPerson, setContactPerson] = useState('');
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

    //insert
    const handleSubmit = (event) => {
        event.preventDefault();
        insertContractor();
 
      };
    const insertContractor = async()=>{
      const{data,error} =  await supabase
      .from('contractor')
      .insert([{id_configuration:idConfig,nameOrCompanyName:name,taxId:taxtId,description:description,nationalEconomyRegisterNumber:nationalEconomyRegisterNumber,address:address,email:email,contactPerson:contactPerson,phone_number:phone_number}])
      handleClickAlert()
      navigate('/Contractors');
      if(error){
          console.log(error)
      }if(data){
       
      }
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
<ManagerAdministrationContractorBreadcrumbs></ManagerAdministrationContractorBreadcrumbs>
            <Container maxWidth="md">
            <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Add')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
       <p></p>
        </Typography>
          <form onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label={t("Name or company name")}
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
             <Box display="flex" justifyContent="flex-end">
                <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ minWidth: 'auto' }}
                >
                {t('Submit')}
                </Button>
            </Box>
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
        </AccordionDetails>
      </Accordion>
      </Container>
      </div>
      );
};

export default AddNewContractor;