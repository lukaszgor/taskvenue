import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from 'react';
import supabase from '../../supabaseClient';
import { useTranslation } from "react-i18next";
import IdConfigurationGuard from '../../Config/IdConfigurationGuard';
import AddNewTask from '../../Pages/Manager/AddNewTask';
import ClientReports from '../../Pages/Client/ClientReports';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pages = ['ClientTasks','ClientTasks','ClientNewTask','ClientVenue','ClientContact','ClientReports'];


function ClientNavBar() {
    const [user,setUser] =useState(null)
    let userIdFromLocalStorage;
    const [userType, setUserType] = useState('');
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { t, i18n } = useTranslation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('profile_type')
      .eq('id', userIdFromLocalStorage)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setUserType(data.profile_type);
    }
  };


  useEffect(()=>{
    FetchUserName();
    userIdFromLocalStorage = localStorage.getItem('userIdFromLocalStorage');
    if(userIdFromLocalStorage ===null){
      navigate('/')
    }
    fetchProfile();
  },[])

  useEffect(() => {
    if (userType === 'client') {
      
    } else if (userType === 'manager') {
      window.location.href = '/home';
    }else if (userType === 'worker') {
        window.location.href = '/home';
      }
  }, [userType]);


  //download username
  const FetchUserName = async () => {
    userIdFromLocalStorage = localStorage.getItem('userIdFromLocalStorage');
    const{data,error} =  await supabase
    .from('profiles')
    .select('username')
    .eq('id',userIdFromLocalStorage)
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
       //go to Profile 
    const ClientProfile =  () => {
        navigate('/ClientProfile')
      }
        //go to Tasks 
    const Tasks =  () => {
        navigate('/ClientTasks')
        }
       //go to newTask  
    const ClientNewTask =  () => {
        navigate('/ClientNewTask')
        }
        //go to ClientVenue  
    const ClientVenue =  () => {
        navigate('/ClientVenues')
        }
          //go to ClientContact  
    const ClientContact =  () => {
        navigate('/ClientContact')
        }
        //go to Reports 
    const ClientReports =  () => {
        navigate('/ClientReports')
                }
         //go to home 
    const Home =  () => {
        navigate('/home')
        }

  return (
    <div>
    <AppBar position="fixed" >
        <IdConfigurationGuard></IdConfigurationGuard>
        <Container maxWidth="lx">
        <Toolbar disableGutters>
        <Typography 
          variant="h6"
          noWrap
          component="a"
          href="/home"
          sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
        <a href="/home">
        <img
          src="/faviconnew.png"
          alt="TaskVenue Icon"
          style={{  height: 'auto', width: '40px', marginRight: '10px' }}
        />
      </a>
      TaskVenue
      </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                // Apply styles when the menu is open
                '&.MuiPaper-root': {
                  minWidth: '400px', // Adjust the width as needed
                  padding: '16px', // Add padding as needed
                },
                '& .MuiButton-root': {
                  fontSize: '20px', // Increase text size
                  color: '#0166FF', // Dodaj kolor tekstu
                },
              }}
            >
 <Button onClick={Home}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Home")}</Button>
 <Button onClick={ClientNewTask}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("New Task")}</Button>
<Button onClick={Tasks}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Tasks")}</Button>
<Button onClick={ClientVenue}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Venues")}</Button>
<Button onClick={ClientReports}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Reports")}</Button>
<Button onClick={ClientContact}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Contact")}</Button>
            </Menu>
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
              fontFamily: 'lato',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
<Button onClick={ClientNewTask}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("New Task")}</Button>
<Button onClick={Tasks}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("Tasks")}</Button>
<Button onClick={ClientVenue}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("Venues")}</Button>
<Button onClick={ClientReports}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("Reports")}</Button>
<Button onClick={ClientContact}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("Contact")}</Button>
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center'}}>
            <Typography
            noWrap
            component="a"
            href="/ClientProfile"
            sx={{
              mr: 2,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {/* {user} */}
            <AccountCircleIcon fontSize='large'></AccountCircleIcon>
          </Typography>&nbsp;
          <Button variant="contained" color="error" onClick={SignOut} >{t("Sign out")}</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Box marginTop={10}>
</Box>
  </div>
  );
}
export default ClientNavBar;