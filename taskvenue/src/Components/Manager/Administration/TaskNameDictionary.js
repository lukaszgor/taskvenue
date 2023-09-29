
import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Grid, Container, Typography,Box,Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import supabase from '../../../supabaseClient';
import { useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from "react-i18next";

function TaskNameDictionary() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
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
  };

  //Delete
  const DeleteSerice = async(event, cellValues)=>{
      const{data,error} =  await supabase
  .from('task_name_dictionary')
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
  .from('task_name_dictionary')
  .insert([{id_configuration:idConfig,name:name}])
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
      .from('task_name_dictionary')
      .select()
      .eq('id_configuration', idConfiguration);
      if(error){
          console.log(error)
          setService(null)
          setFetchError(t("No task dictionary"))
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
      { field: 'name', headerName: t("Name"), width: 130 },
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

              <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Task names')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Add')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

<Container maxWidth="md">
 <Typography variant="h4" align="center" >
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
         <p></p>
         <Box display="flex" justifyContent="flex-end">
         <Button
         type="submit"
         variant="contained"
         color="primary"
         style={{ minWidth: 'auto' }}
         >
         {t('Add')}
         </Button>
     </Box>
     </Grid>
     <Grid item xs={12} sm={6}>
       {/* <Button
         type="submit"
         variant="contained"
         color="primary"
         fullWidth
       >
           {t("Add")}
       </Button> */}
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

          </AccordionDetails>
      </Accordion>


   
   {/* <Snackbar open={open}
     autoHideDuration={2000}
     onClose={handleCloseAlert}>
   <Alert severity="success">{t("Updated!")}</Alert>
   </Snackbar> */}

   
   </div>
   
      </div>
    );
  }
  
  export default TaskNameDictionary;
  