import React from 'react';
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from 'react';
import supabase from '../../supabaseClient';
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button,} from '@mui/material';
import SuperAdminUsers from './SuperAdminUsers';
import SuperAdminConfigurationView from './SuperAdminConfigurationView';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={'span'} variant={'body2'}>
              {children}
            </Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


const SuperAdminMainView = () => {

  const [user,setUser] =useState(null)
  let userIdFromLocalStorage;
  const [userType, setUserType] = useState('');
const [anchorElNav, setAnchorElNav] = React.useState(null);
const { t, i18n } = useTranslation();

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
  if (userType === 'superadmin') {
    
  } else if (userType === 'worker') {
    window.location.href = '/home';
  }else if (userType === 'client') {
      window.location.href = '/home';
    }else if (userType === 'manager') {
        window.location.href = '/home';
      }
}, [userType]);

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
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleScrollRight = () => {
    if (value < 3) {
      setValue(value + 1);
    }
  };

  const handleScrollLeft = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };


  return (
    <div>
 <p>Hello admin</p>
 <Button variant="contained" color="error" onClick={SignOut} >{t("Sign out")}</Button>
 <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
          {value > 0 && (
            <button
              onClick={handleScrollLeft}
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                zIndex: 1,
              }}
            >
              &#8592;
            </button>
          )}
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label={t("Configurations")} {...a11yProps(0)} />
            <Tab label={t("Users")} {...a11yProps(1)} />
          </Tabs>
          {value < 3 && (
            <button
              onClick={handleScrollRight}
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                zIndex: 1,
              }}
            >
              &#8594; 
            </button>
          )}
        </Box>
        <TabPanel value={value} index={0}>
          <SuperAdminConfigurationView></SuperAdminConfigurationView>
        </TabPanel>
        <TabPanel value={value} index={1}>
         <SuperAdminUsers></SuperAdminUsers>
        </TabPanel>
      </Box>

  </div>
  );
};

export default SuperAdminMainView;
