import React, { useState,useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import supabase from '../../supabaseClient';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function PasswordChange() {
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [userID, setUserID] = useState('');
    const [user,setUser] =useState(null)
    const [error, setError] = useState('');
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
            setError('Hasło musi zawierać co najmniej 6 znaków');
          } else {
            setError('');
            // Kontynuuj logikę przetwarzania formularza
            await supabase.auth.updateUser({ password: password })
            handleClickAlert()
          }
    };
  
    const handleFullNameChange = async () => {
          const{data,error}=await supabase
          .from('profiles')
          .update({'full_name':fullName})
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
          
          <p>Zmiana hasła</p>
      
      <TextField
              label="Nowe hasło"
              type="password"
              value={password}
              error={!!error}
              helperText={error}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: '10px', maxWidth: '300px' }}
            />
          
           <Button variant="contained" color="error" style={{ marginBottom: '10px', maxWidth: '300px' }} onClick={handlePasswordChange}>
            Zapisz
          </Button>
          
          <p>Zmiana imienia i nazwiska</p>
        <TextField
                      label="Imię i nazwisko"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{ marginBottom: '10px', maxWidth: '300px' }}
                    />
        
        <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }} onClick={handleFullNameChange}>
        Zapisz
        </Button>
      <Snackbar open={open}
          autoHideDuration={2000}
          onClose={handleCloseAlert}>
        <Alert severity="success">Zaktualizowano!</Alert>
        </Snackbar>
  
        </div>
     
      
    );
  }
  
  export default PasswordChange;
  