import React, { useState,useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import supabase from '../../supabaseClient';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from "react-i18next";

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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <p>{t("Password change")}</p>
      
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
          
          <p> {t("First and last name change")}</p>
        <TextField
                      label={t("First and last name")} 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{ marginBottom: '10px', maxWidth: '300px' }}
                    />
        
        <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }} onClick={handleFullNameChange}>
        {t("Submit")}
        </Button>
      <Snackbar open={open}
          autoHideDuration={2000}
          onClose={handleCloseAlert}>
        <Alert severity="success"> {t("Updated!")}</Alert>
        </Snackbar>
  
        </div>
     
      
    );
  }
  
  export default PasswordChange;
  