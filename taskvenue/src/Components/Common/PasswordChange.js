import React, { useState,useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import supabase from '../../supabaseClient';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from "react-i18next";
import { Accordion, AccordionSummary, AccordionDetails, Typography,FormControl,Grid,Container} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Language from './Language';


function PasswordChange() {
    const [password, setPassword] = useState('');
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
  
    const handlePasswordChange = async () => {
        if (password.length < 6) {
            setError(t("The password must contain at least 6 characters"));
          } else {
            setError('');
            await supabase.auth.updateUser({ password: password })
            handleClickAlert()
          }
    };
  
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
        <p></p>
        <Language></Language>
        <p></p>
        <Container maxWidth="md">
        <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Password change')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <Container maxWidth="md"  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
      <TextField
              label={t("New password")} 
              type="password"
              value={password}
              error={!!error}
              helperText={error}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: '10px', maxWidth: '300px' }}
            />
           <Button variant="contained" color="error" style={{ marginBottom: '10px', maxWidth: '300px' }} onClick={handlePasswordChange}>
           {t("Submit")}
          </Button>
          </FormControl>
            </Grid>
            </Container>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('First and last name change')}</Typography>
          
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <Container maxWidth="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
        </AccordionDetails>
      </Accordion>
      </Container>
        </div>
     
      
    );
  }
  
  export default PasswordChange;
  