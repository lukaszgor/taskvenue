
import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import supabase from '../../../supabaseClient';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from "react-i18next";
import {
  Container, Grid, Card, CardContent, CardActions, Button, Typography, Box, Accordion, AccordionSummary, AccordionDetails, TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

function ManagerActiveContractors() {
    const navigate = useNavigate()
    const {id} = useParams()
  const { t, i18n } = useTranslation();

const [userID, setUserID] = useState('');
const [idConfig, setIdConfiguration] = useState('');
const [searchName, setSearchName] = useState('');
const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const [contractors, setContractors] = useState([]);
    const [filteredContractors, setFilteredContractors] = useState([]);

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

      useEffect(() => {
        let filteredData = contractors;
    
        if (searchName !== '') {
          filteredData = filteredData.filter((contractor) =>
            contractor.nameOrCompanyName.toLowerCase().includes(searchName.toLowerCase())
          );
        }
    
        setFilteredContractors(filteredData);
      }, [contractors, searchName]);
    
      const applyFilters = () => {
        let filteredData = contractors;
    
        if (searchName !== '') {
          filteredData = filteredData.filter((contractor) =>
            contractor.nameOrCompanyName.toLowerCase().includes(searchName.toLowerCase())
          );
        }
        setFilteredContractors(filteredData);
        setIsFilterPopupOpen(false);
      };


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

  const addNewContractor = () => {
    navigate('/addNewContractor');
};
  
  const renderContractors = () => {
    return filteredContractors.sort((a, b) => b.id - a.id).map((contractor, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3}key={index}>
        <Card>
          <CardContent>
          <div  onClick={() => navigate('/ContractorsDetails/' + contractor.id)} style={{ cursor: 'pointer' }}>
            <Typography variant="h6">{t('Name')} : {contractor.nameOrCompanyName}</Typography>
            <Typography color="textSecondary">{t("email")}: {contractor.email}</Typography>
            <Typography color="textSecondary">{t("phone number")}: {contractor.phone_number}</Typography>
            <Typography color="textSecondary">{t("address")}: {contractor.address}</Typography>
            <Typography color="textSecondary">{t("Tax ID")}: {contractor.taxId}</Typography>
            </div>
          </CardContent>
          <CardActions>
          <Box display="inline-block" padding={1}>
            <Button  variant="contained" color="primary" onClick={() => navigate('/ContractorsDetails/' + contractor.id)}  startIcon={<EditIcon />}>
            {t("details")}
            </Button>
            </Box>
          </CardActions>
        </Card>
      </Grid>
    ));
  };

    return (
      <div>
            <div>
            <Dialog open={isFilterPopupOpen} onClose={() => setIsFilterPopupOpen(false)}>
                <DialogTitle>{t('Filter Venues')}</DialogTitle>
                <DialogContent>
                    <p></p>
                    <div style={{ marginBottom: '16px' }}>
                        <TextField
                            label={t('Search by name')}
                            variant="outlined"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            style={{ marginBottom: '8px' }}
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={applyFilters}
                        style={{ marginTop: '16px' }}
                    >
                        {t('Apply Filters')}
                    </Button>
                </DialogContent>
            </Dialog>
              <p></p>
      <Button
                style={{ marginLeft: '20px', marginBottom: '20px' }}
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addNewContractor}
            >
                {t('Add')}
            </Button>
            <Button
                style={{ marginLeft: '20px', marginBottom: '20px' }}
                variant="contained"
                color="primary"
                onClick={() => setIsFilterPopupOpen(true)}
                startIcon={<FilterListIcon />}
            >
                {t('Open Filter')}
            </Button>
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
  