
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

function ManagerInActiveContractors() {
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


    //download data
    const fetchContractor = async()=>{
        try {
            const{data,error} =  await supabase
            .from('contractor')
            .select()
            .eq('id_configuration',idConfig)
            .not('isDeleted', 'is', null);
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
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
  
  export default ManagerInActiveContractors;
  