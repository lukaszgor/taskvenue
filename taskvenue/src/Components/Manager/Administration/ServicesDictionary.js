
import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Grid, Container, Typography,Box,Accordion, AccordionSummary, AccordionDetails  } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import supabase from '../../../supabaseClient';
import { useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from "react-i18next";
import Tooltip from '@mui/material/Tooltip';

function ServicesDictionary() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState(0);
  const [unit, setUnit] = useState('');
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
   useEffect(() => {
          if (idConfig) {
            fetchServices(idConfig)
            
          }
        }, [idConfig]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    insertService();
    setName('');
    setDescription('');
    setCost('');
    setUnit('');
  };

  //Delete
  const DeleteSerice = async(event, cellValues)=>{
      const{data,error} =  await supabase
  .from('service_dictionary')
  .delete().eq('id', cellValues.row.id);
  handleClickAlert();
  fetchServices(idConfig);
  if(error){
      console.log(error)
  }if(data){
   
  }
  }
    //insert
const insertService = async()=>{
  const{data,error} =  await supabase
  .from('service_dictionary')
  .insert([{id_configuration:idConfig,name:name,cost:cost,description:description,unit:unit}])
  handleClickAlert()
  fetchServices(idConfig)
  if(error){
      console.log(error)
  }if(data){
   
  }
}

//download data
    const fetchServices = async(idConfiguration)=>{
      const{data,error} =  await supabase
      .from('service_dictionary')
      .select()
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
      {
        field: 'name',
        headerName: t("Name"),
        width: 300, 
        renderCell: (params) => (
          <Tooltip title={params.value} arrow>
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
              {params.value}
            </div>
          </Tooltip>
        ),
      },
      {
        field: 'description',
        headerName: t("Description"),
        width: 600, 
        renderCell: (params) => (
          <Tooltip title={params.value} arrow>
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
              {params.value}
            </div>
          </Tooltip>
        ),
      },
      { field: 'cost', headerName: t("Cost"), width: 80 },
      { field: 'unit', headerName: t("Unit"), width: 220 },
      {
          field: "Action",headerName: t("Action"), width: 200 ,
          renderCell: (cellValues) => {
            return ( 
              <Button
              color="error"
              onClick={(event) => {
                  DeleteSerice(event, cellValues);
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
             multiline
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
   {/* <Snackbar open={open}
     autoHideDuration={2000}
     onClose={handleCloseAlert}>
   <Alert severity="success">{t("Updated!")}</Alert>
   </Snackbar> */}
   </div>
      </div>
    );
  }
  
  export default ServicesDictionary;
  