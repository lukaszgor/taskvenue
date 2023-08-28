import { useNavigate } from "react-router-dom"
import { useState,useEffect } from 'react';
import supabase from "../../supabaseClient"  
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { useTranslation } from "react-i18next";
import { Select, MenuItem } from "@mui/material";

export let userEmail
export let userId
//navigate menu section
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
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
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
//end navigate
function Auth() {
//set translate
	const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("lng") || "en");

	const handleChangeLng = (lng) => {
		i18n.changeLanguage(lng);
		localStorage.setItem("lng", lng);
	};

//menu tabs
const [value, setValue] = useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};
    const navigate = useNavigate()//add to nav

   const [email, setEmail] = useState(''); // email of the user
  const [password, setPassword] = useState(''); // password of the user
  const [username, setUsername] = useState(''); // username of the user
  const [Rmsg, setRMsg] = useState(''); // Registration message
  const [Lmsg, setLMsg] = useState(''); // Login message
  const [LmsgL, setLMsgL] = useState(''); // Login message via megic link
  const [Resetmsg, setResetMsg] = useState('');
  const [user, setUser] = useState(''); // User object after registration / login
  const [session, setSession] = useState(''); // session object after registration / login

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/home')
      }
    };
    checkSession();
  });
  supabase.auth.onAuthStateChange((event,session) => {
    if (event == "SIGNED_IN") {
      navigate('/home')
      userEmail=session?.user.email;
      userId=session?.user.id;
      console.log(userId)
      // setter
localStorage.setItem('userIdFromLocalStorage', session?.user.id);
    }
  });
 
  const Register = async () => {
    const {data, error} = await supabase.auth.signUp({
      email,
      password,
    },
    {
      data: {
        username
      }
    })
    if(error){
      setRMsg(error.message)
    }else{
      setRMsg(t("Successful registration"))
      setUser(data.user)
    }
  }
let errorMessageLogin=t("Enter correct data")
  const Login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if(error){
      setLMsg(errorMessageLogin)
    }else{
      setLMsg(t("Logged successfully"))
      setUser(data.user)
      setSession(data.session)
      console.log(data.session)
      navigate('/home')
    }
  }
let ErrorMessageMagicLink=t("Enter a valid email address")
  const SendMagicLink = async () => {
    const {user,error}=await supabase.auth.signInWithOtp({email})
    if(error){
        setLMsgL(ErrorMessageMagicLink)
      }else{
        setLMsgL(t("Login successfully completed, check your mailbox"))
    
      }
  }

return (
    <div className="App">
<div>

<Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
  <div>
  <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TaskVenue
          </Typography>
  </div>
</Box>

<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
<p>{t("language")}</p>
<div>&nbsp;</div>
{/* <Select
      value={""}
      onChange={(event) => handleChangeLng(event.target.value)}
      variant="outlined"
    >
      <MenuItem onClick={() => handleChangeLng("en")}>English</MenuItem>
      <MenuItem onClick={() => handleChangeLng("pl")}>Polish</MenuItem>
 </Select> */}
  <Select
      value={selectedLanguage} // Set the value prop to the state variable
      onChange={(event) => {
        const selectedLng = event.target.value;
        handleChangeLng(selectedLng);
        setSelectedLanguage(selectedLng); // Update the selected language in the state
      }}
      variant="outlined"
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="pl">Polish</MenuItem>
    </Select>
</Box>

</div>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={t("sign in")} {...a11yProps(0)} />
          <Tab label={t("sign up")} {...a11yProps(1)} />
          <Tab label={t("sign in via magic link")} {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
      <h1>{t("sign in")}</h1>
      <TextField style={{ width: "250px" }} id="standard-basic" label={t("enter your email")} placeholder={t("enter your email")} type="email" onChange={(e) => setEmail(e.target.value)} variant="standard" />
      <br/>      
      <TextField   style={{ width: "250px" }} id="standard-password-input" label={t("enter your password")} type="password" placeholder={t("enter your password")} autoComplete="current-password" variant="standard" onChange={(e) =>
         setPassword(e.target.value)} />
      <br/>
      <br/>
      <Button size="small" variant="contained" onClick={Login}>{t("sign in")}</Button>
      <p>{Lmsg}</p>
     
      <br/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <h1>{t("sign up")}</h1>
         <TextField style={{ width: "250px" }} id="standard-basic" label={t("enter your email")}variant="standard" onChange={(e) => 
        setEmail(e.target.value)} />
      <br/>
         <TextField style={{ width: "250px" }} id="standard-password-input" label={t("enter your password")} type="password" autoComplete="current-password" variant="standard" onChange={(e) =>
         setPassword(e.target.value)} />
           <br/>
        {/* <TextField id="standard-basic" label="Imie" variant="standard" onChange={(e) => 
        setUsername(e.target.value)} /> */}
          <br/>
          <br/>
      <Button size="small" variant="contained" onClick={Register}>{t("sign up")}</Button>
      <p>{Rmsg}</p>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <h1>{t("sign in via magic link")}</h1>
      <br/>
      <br/>
      <TextField style={{ width: "250px" }} id="standard-basic" label={t("enter your email")} placeholder={t("enter your email")}  type="email" onChange={(e) => setEmail(e.target.value)} variant="standard" />
      <br/> 
      <br/> 
      <Button size="small" variant="contained" onClick={SendMagicLink}>{t("send magic link")}</Button>
      <p>{LmsgL}</p>
      </TabPanel>
    </Box>
    </div>
  );
      }
export default Auth;
