
import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import supabase from '../../../supabaseClient';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from "react-i18next";
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"

function Contractors() {
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
            .eq('id_configuration',idConfig);
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
  const ContractorsDetails=(event, cellValues)=>{
    navigate('/ContractorsDetails/'+cellValues.row.id)
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
  
  const columns = [
      { field: 'nameOrCompanyName', headerName: t("Name"), width: 130 },
      { field: 'description', headerName: t("Description"), width: 130 },
      { field: 'taxId', headerName: t("Tax ID"), width: 130 },
      { field: 'nationalEconomyRegisterNumber', headerName: t("National Economy Register ID"), width: 130 },
      { field: 'address', headerName: t("address"), width: 130 },
      { field: 'phone_number', headerName: t("phone number"), width: 130 },
      { field: 'email', headerName: t("email"), width: 130 },
      { field: 'contactPerson', headerName: t("contact person"), width: 130 },
      {
          field: "Action",headerName: t("Action"), width: 200 ,
          renderCell: (cellValues) => {
            return ( 
              <Button
              color="primary"
              onClick={(event) => {
                  ContractorsDetails(event, cellValues);
              }}
              >{t("details")}</Button>
            );
          }
        },
     
    ];
    return (
      <div>
            <div>
              <p></p>
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

      {isLoading ? (
        <p>{t("Landing...")}</p>
      ) : hasError ? (
        <p>{t("An error occurred while downloading data.")}</p>
      ) : (
        <div>
        {contractors &&(
        <div>
      <p> </p>
      <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={contractors}
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
  
  export default Contractors;
  