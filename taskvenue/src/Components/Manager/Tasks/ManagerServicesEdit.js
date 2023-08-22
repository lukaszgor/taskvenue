
import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Grid, Container, Typography,Box,Select,MenuItem,FormControl,InputLabel } from '@mui/material';
import supabase from '../../../supabaseClient';
import { useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from "react-i18next";

function ManagerServicesEdit() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState(0);
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [dictionaryServices, setDictionaryServices] = useState([]);
  const [fetchError,setFetchError] =useState(null)
  const [service,setService] =useState(null)
  const {id} = useParams()

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
      const handleFetchDictionaryServices = async (idConfig) => {
        const { data, error } = await supabase
          .from('service_dictionary')
          .select()
          .eq('id_configuration', idConfig)
        if (error) {
          console.log(error);
        }
        if (data) {
          setDictionaryServices(data);
        }
      };

   useEffect(() => {
          if (idConfig) {
            fetchServices(idConfig,id)
            handleFetchDictionaryServices(idConfig)
          }
        }, [idConfig]);

    useEffect(() => {
            const calculatedTotal = cost * quantity;
            setTotal(calculatedTotal);
        }, [cost, quantity]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    insertService();
  };

  //Delete
  const DeleteService = async(event, cellValues)=>{
      const{data,error} =  await supabase
  .from('services')
  .delete().eq('id', cellValues.row.id);
  handleClickAlert();
  fetchServices(idConfig,id);
  if(error){
      console.log(error)
  }if(data){
   
  }
  }
    //insert
const insertService = async()=>{
  const{data,error} =  await supabase
  .from('services')
  .insert([{id_configuration:idConfig,name:name,cost:cost,description:description,unit:unit,quantity:quantity,total:total,idTask:id}])
  handleClickAlert()
  fetchServices(idConfig,id)
  if(error){
      console.log(error)
  }if(data){
    setName("");
    setDescription("");
    setUnit("");
    setCost(0);
    setQuantity(1);
    setTotal(0);
  }
}

//download data
    const fetchServices = async(idConfiguration,id)=>{
      const{data,error} =  await supabase
      .from('services')
      .select()
      .eq('idTask', id)
      .eq('id_configuration', idConfiguration);
      if(error){
          console.log(error)
          setService(null)
          setFetchError(t("No services"))
      }if(data){
        setService(data)
        setFetchError(null)
      }
  }
  const handleServiceDictionary = (event) => {
    const value = event.target.value;
    setName(value.name);
    setDescription(value.description);
    setUnit(value.unit);
    setCost(value.cost);
    setQuantity(1);
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

  const columns = [
      { field: 'name', headerName: t("Name"), width: 130 },
      { field: 'description', headerName: t("Description"), width: 220 },
      { field: 'cost', headerName: t("Cost"), width: 70 },
      { field: 'quantity', headerName: t("Quantity"), width: 70 },
      { field: 'unit', headerName: t("Unit"), width: 100 },
      { field: 'total', headerName: t("Total"), width: 70 },
      {
          field: "Action",headerName: t("Action"), width: 100 ,
          renderCell: (cellValues) => {
            return ( 
              <Button
              color="error"
              onClick={(event) => {
                  DeleteService(event, cellValues);
              }}
              >{t("Delete")}</Button>
            );
          }
        },
     
    ];
    return (
      <div>
            <div>
              <p></p>

       <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
       <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
       <p></p>
        </Typography>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="distionary-select-label">
                  {t('Select service from dictionary')}
                </InputLabel>
                <Select
                  labelId="asigned-select-label"
                  id="distionary-select"
                  onChange={handleServiceDictionary}
                  label={t('Select service from dictionary')}
                >
                  {dictionaryServices.map((dictionaryServices) => (
                    <MenuItem key={dictionaryServices.id} value={dictionaryServices}>
                      {dictionaryServices.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                    label={t("Name")}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    style={{ marginRight: '10px' }}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                    label={t("Description")}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    style={{ marginRight: '10px' }}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                    label={t("Cost")}
                    value={cost}
                    onChange={(event) => setCost(event.target.value)}
                    style={{ marginRight: '10px' }}
                    type="number" 
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                    label={t("Unit")}
                    value={unit}
                    onChange={(event) => setUnit(event.target.value)}
                    style={{ marginRight: '10px' }}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                label={t("Quantity")}
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)} 
                style={{ marginRight: '10px' }}
                fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                label={t("Total")}
                value={total}
                style={{ marginRight: '10px' }}
                fullWidth
                disabled
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
        <Snackbar open={open}
            autoHideDuration={2000}
            onClose={handleCloseAlert}>
          <Alert severity="success"> {t("Updated!")}!</Alert>
          </Snackbar>
      </Container>
 </form>
 <div>
     {fetchError &&(<p>{fetchError}</p>)}
     {service &&(
     <div>
   <p> </p>
   <div style={{ height: 400, width: '100%' }}>
         <DataGrid
           rows={service}
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
   </div>
      </div>
    );
  }
  
  export default ManagerServicesEdit;
  