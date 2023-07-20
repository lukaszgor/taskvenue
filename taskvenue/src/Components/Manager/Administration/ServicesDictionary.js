
import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import supabase from '../../../supabaseClient';
import { useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from "react-i18next";

function ServicesDictionary() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState(0);
  const [unit, setUnit] = useState('');
  const [fetchError,setFetchError] =useState(null)
  const [service,setService] =useState(null)
  const [idConfiguration,setIdConfiguration] =useState(null)
  const {id} = useParams()

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
  fetchServices(idConfiguration);
  if(error){
      console.log(error)
  }if(data){
   
  }
  }
    //insert
const insertService = async()=>{
  const{data,error} =  await supabase
  .from('service_dictionary')
  .insert([{id_configuration:idConfiguration,name:name,cost:cost,description:description,unit:unit}])
  handleClickAlert()
  fetchServices(idConfiguration)
  if(error){
      console.log(error)
  }if(data){
   
  }
}
    useEffect(() => {
        const idConfiguration = localStorage.getItem('idConfiguration');
        if (idConfiguration === null) {
            
        } else {
            setIdConfiguration(idConfiguration)
            fetchServices(idConfiguration)
        }
    }, []);

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
      { field: 'name', headerName: t("Name"), width: 130 },
      { field: 'description', headerName: t("Description"), width: 220 },
      { field: 'cost', headerName: t("Cost"), width: 220 },
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
       
       <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
   <TextField
     label={t("Name")}
     value={name}
     onChange={(event) => setName(event.target.value)}
     style={{ marginRight: '10px' }}
   />
   <TextField
     label={t("Description")}
     value={description}
     onChange={(event) => setDescription(event.target.value)}
     style={{ marginRight: '10px' }}
   />
     <TextField
     label={t("Cost")}
     value={cost}
     onChange={(event) => setCost(event.target.value)}
     style={{ marginRight: '10px' }}
     type="number" 
   />
     <TextField
     label={t("Unit")}
     value={unit}
     onChange={(event) => setUnit(event.target.value)}
     style={{ marginRight: '10px' }}
   />
   <Button variant="contained" color="primary" type="submit">
   {t("Add")}
   </Button>
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
   <Snackbar open={open}
     autoHideDuration={2000}
     onClose={handleCloseAlert}>
   <Alert severity="success">{t("Updated!")}</Alert>
   </Snackbar>
   </div>
      </div>
    );
  }
  
  export default ServicesDictionary;
  