import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Grid, Container, Typography,Box,Select,MenuItem,FormControl,InputLabel,Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import supabase from '../../../supabaseClient';
import { useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import styled from 'styled-components';
import { format } from 'date-fns';


const DateInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
`;

function WorkerServices() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState(0);
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [fullTotalTask, setFullTotalTask] = useState(0);
  const [dictionaryServices, setDictionaryServices] = useState([]);
  const [fetchError,setFetchError] =useState(null)
  const [service,setService] =useState(null)
  const [selectedDateTime, setSelectedDateTime] = useState('');
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


      const handleDateTimeChange = (event) => {
        setSelectedDateTime(event.target.value);
      };
  
      const [formattedDate, setFormattedDate] = useState('');
  
  useEffect(() => {
    if (selectedDateTime) {
      const formattedDate = format(new Date(selectedDateTime), 'dd/MM/yyyy HH:mm');
      setFormattedDate(formattedDate);
    }
  }, [selectedDateTime]);


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

        useEffect(() => {
            if (service) {
              // Calculate the sum of 'total' values from the fetched services
              const calculatedFullTotal = service.reduce((acc, serviceItem) => acc + serviceItem.total, 0);
              setFullTotalTask(calculatedFullTotal);
            }
          }, [service]);

  
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
  .insert([{id_configuration:idConfig,name:name,cost:cost,description:description,unit:unit,quantity:quantity,total:total,idTask:id,user_id:userID,date: formattedDate}])
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
      { field: 'name', headerName: t("Name"), width: 250 },
      { field: 'description', headerName: t("Description"), width: 400},
      { field: 'cost', headerName: t("Cost"), width: 70 },
      { field: 'quantity', headerName: t("Quantity"), width: 70 },
      { field: 'unit', headerName: t("Unit"), width: 100 },
      { field: 'total', headerName: t("Total"), width: 70 },
      { field: 'date', headerName: t("Date"), width: 140 },
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
              <div>
      {/* ... (existing JSX) */}
      <div>
        {fetchError && <p>{fetchError}</p>}
        {service && (
          <div>
            {/* ... (existing JSX) */}
            <div style={{ textAlign: 'right' }}>
              <Typography variant="h6">
               {t('Summary')}: {fullTotalTask} <LocalAtmOutlinedIcon fontSize='medium' />
              </Typography>
            </div>
          </div>
        )}
      </div>
    </div>

    <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Add')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
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
            <Grid item xs={12} sm={6}>
            <label>{t('Date')}</label>
            <DateInput
                 type="datetime-local"
                value={selectedDateTime}
                onChange={handleDateTimeChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                    label={t("Description")}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    style={{ marginRight: '10px' }}
                    fullWidth
                    multiline
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
          <Alert severity="success"> {t("Updated!")}</Alert>
          </Snackbar>
      </Container>
 </form>
        </AccordionDetails>
      </Accordion>

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
  
  export default WorkerServices;
  