
import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import supabase from '../../../supabaseClient';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from "react-i18next";
import {
  Container, Grid, Card, CardContent, CardActions, Button, Typography, Box, Accordion, AccordionSummary, AccordionDetails, TextField
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';

function ManagerActiveContractors() {
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
const [contractors, setContractors] = useState('');
const [userID, setUserID] = useState('');
const [idConfig, setIdConfiguration] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

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
            fetchContractor();
          
        }
      }, [idConfig]);



  const handleSubmit = (event) => {
    event.preventDefault();
    insertContractor();
    setName('');
    setDescription('');
    setTaxtId('');
    setNationalEconomyRegisterNumber('');
    setAddress('');
    setPhone_number('');
    setEmail('');
    setContactPerson('');
  };
const insertContractor = async()=>{
  const{data,error} =  await supabase
  .from('contractor')
  .insert([{id_configuration:idConfig,nameOrCompanyName:name,taxId:taxtId,description:description,nationalEconomyRegisterNumber:nationalEconomyRegisterNumber,address:address,email:email,contactPerson:contactPerson,phone_number:phone_number}])
  handleClickAlert()
  fetchContractor()
  if(error){
      console.log(error)
  }if(data){
   
  }
}
    //download data
    const fetchContractor = async()=>{
        try {
            const{data,error} =  await supabase
            .from('contractor')
            .select()
            .eq('id_configuration',idConfig)
            .is('isDeleted', null) 
            if(data){
              setContractors(data)
              setIsLoading(false);
            }
            if (error) {
              setHasError(true);
              setContractors(null)
            } 
          } catch (error) {
            console.error('error:', error);
            setHasError(true);
            setIsLoading(false);
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
  
  const renderContractors = () => {
    return contractors.map((contractor, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3}key={index}>
        <Card>
          <CardContent>
            <Typography variant="h6">{contractor.nameOrCompanyName}</Typography>
            <Typography color="textSecondary">{t("email")}: {contractor.email}</Typography>
            <Typography color="textSecondary">{t("phone number")}: {contractor.phone_number}</Typography>
            <Typography color="textSecondary">{t("address")}: {contractor.address}</Typography>
            <Typography color="textSecondary">{t("Tax ID")}: {contractor.taxId}</Typography>
            {/* Możesz dodać więcej szczegółów dotyczących wykonawcy tutaj */}
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" color="primary" onClick={() => navigate('/ContractorsDetails/' + contractor.id)}  startIcon={<EditIcon />}>
            {t("details")}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ));
  };

    return (
      <div>
            <div>
              <p></p>
              <Accordion >
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
        </Container>
        </AccordionDetails>
      </Accordion>
 
      <p></p>
      {isLoading ? (
        <p>{t("Loading...")}</p>
      ) : hasError ? (
        <p>{t("An error occurred while downloading data.")}</p>
      ) : (

          <Grid container spacing={3}>
            {renderContractors()}
          </Grid>

      )}



   <Snackbar open={open}
     autoHideDuration={2000}
     onClose={handleCloseAlert}>
   <Alert severity="success">{t("Updated!")}</Alert>
   </Snackbar>
   </div>
      </div>
    );
  }
  
  export default ManagerActiveContractors;
  