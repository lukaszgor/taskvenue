import React, { useState,useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import supabase from '../../supabaseClient';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from "react-i18next";
import { Accordion, AccordionSummary, AccordionDetails, Typography,FormControl,Grid,Container} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function Username() {
    const [fullName, setFullName] = useState('');
    const [userID, setUserID] = useState('');
    const [user,setUser] =useState(null)
    const [error, setError] = useState('');
    const { t, i18n } = useTranslation();
    let userIdFromLocalStorage;
  
   //download username
   const FetchUserName = async () => {
      userIdFromLocalStorage = localStorage.getItem('userIdFromLocalStorage');
      const{data,error} =  await supabase
      .from('profiles')
      .select('full_name')
      .eq('id',userIdFromLocalStorage)
      .single()
      if(error){
       
      }if(data){
        setUser(data.full_name)
        setUserID(userIdFromLocalStorage)
       
      }
      }
      useEffect(()=>{
          FetchUserName();
        },[])
  

    const handleFullNameChange = async () => {
          const{data,error}=await supabase
          .from('profiles')
          .update({'username':fullName})
          .eq('id',userID)
          handleClickAlert()
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
    return (   
      <div >
          <Typography></Typography>
          <Container maxWidth="sm">
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
        <TextField
                      label={t("First and last name")} 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{ marginBottom: '10px', maxWidth: '300px' }}
                    />
        
        <Button type="submit" variant="contained" color="primary" style={{ maxWidth: '300px'}} onClick={handleFullNameChange}>
        {t("Submit")}
        </Button>
        </FormControl>
            </Grid>
            </Container>
      <Snackbar open={open}
          autoHideDuration={2000}
          onClose={handleCloseAlert}>
        <Alert severity="success"> {t("Updated!")}</Alert>
        </Snackbar>
        </div>
     
      
    );
  }
  
  export default Username;
  