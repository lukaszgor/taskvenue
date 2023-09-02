import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from 'react';
import supabase from '../../supabaseClient';
import { useTranslation } from "react-i18next";
import FetchSupabaseData from '../../Config/FetchSupabaseData';



function WaitingRoomNavBar() {
    const [user,setUser] =useState(null)
  const { t, i18n } = useTranslation();
  const [receivedData, setReceivedData] = useState({ userId: '', idConfiguration: '', profileType: '' });

  const handleGetData = (userId, idConfiguration, profileType) => {
    setReceivedData({ userId, idConfiguration, profileType });
  };

  useEffect(() => {
        if(receivedData.userId ===null){
              navigate('/')
            }else{
        FetchUserName(); 
    }
  }, [receivedData.userId]);

  const FetchUserName = async () => {
    const{data,error} =  await supabase
    .from('profiles')
    .select('username')
    .eq('id',receivedData.userId)
    .single()
    if(error){
    }if(data){
      setUser(data.username)
    }
    }

    //Signout method
    const navigate = useNavigate()
    const SignOut = async () => {
      localStorage.clear();
        const {user,error}= await supabase.auth.signOut()
        if(error){
          console("Error with sigout")
        }else{
          navigate('/')
        }
      }
   

  return (
    <AppBar position="static">
            <FetchSupabaseData sendData={handleGetData}></FetchSupabaseData>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
          <Button variant="contained" color="error" onClick={SignOut} >{t("Sign out")}</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

  );
}
export default WaitingRoomNavBar;