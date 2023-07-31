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



const pages = ['Administration','Locations','Tasks','Schedule','Reports','Profile'];


function ManagerNavBar() {
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
    if (userType === 'manager') {
      
    } else if (userType === 'worker') {
      window.location.href = '/home';
    }else if (userType === 'client') {
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
       //go to Administration 
    const Administration =  () => {
        navigate('/Administration')
      }
       //go to Profile 
    const Profile =  () => {
        navigate('/Profile')
      }
        //go to Location 
    const Locations =  () => {
        navigate('/LocationDashboard')
    }
        //go to Tasks 
    const Tasks =  () => {
        navigate('/Tasks')
        }
        //go to Schedule 
    const Schedule =  () => {
        navigate('/Schedule')
        }
        //go to Reports 
    const Reports =  () => {
        navigate('/Reports')
                }
         //go to home 
    const Home =  () => {
        navigate('/home')
        }

  return (
    <AppBar position="static">
            <IdConfigurationGuard></IdConfigurationGuard>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
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
              }}
            >
 <Button onClick={Home}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Home")}</Button>
<Button onClick={Administration}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Administration")}</Button>
<Button onClick={Locations}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Locations")}</Button>
<Button onClick={Tasks}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Tasks")}</Button>
<Button onClick={Schedule}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Schedule")}</Button>
<Button onClick={Reports}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Reports")}</Button>
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
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
<Button onClick={Administration} sx={{ my: 2, color: 'white', display: 'block' }}>{t("Administration")}</Button>
<Button onClick={Locations}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("Locations")}</Button>
<Button onClick={Tasks}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("Tasks")}</Button>
<Button onClick={Schedule}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("Schedule")}</Button>
<Button onClick={Reports}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("Reports")}</Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Typography
            noWrap
            component="a"
            href="/Profile"
            sx={{
              mr: 2,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {user}
          </Typography>&nbsp;
          <Button variant="contained" color="error" onClick={SignOut} >{t("Sign out")}</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

  );
}
export default ManagerNavBar;