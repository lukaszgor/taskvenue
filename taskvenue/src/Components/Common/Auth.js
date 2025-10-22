import { useNavigate } from "react-router-dom"
import { useState,useEffect } from 'react';
import supabase from "../../supabaseClient"  
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Link from "@mui/material/Link";
import { useTranslation } from "react-i18next";
import { Box, Select, MenuItem, FormControl, InputLabel, Accordion, AccordionSummary,CardContent,Card,Container, Checkbox,FormControlLabel } from '@mui/material';
import InfoNavBar from "../NavigationBar/InfoNavBar";
import Footer from "../Info/Footer";

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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



  //////////

  useEffect(() => {
    console.log("🧪 ENV TEST:");
    console.log("SUPABASE_URL:", process.env.REACT_APP_SUPABASE_URL);
    console.log("SUPABASE_ANON_KEY:", process.env.REACT_APP_ANON_KEY);
  
    // Test połączenia z supabase
    const testSupabase = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("❌ Supabase session error:", error.message);
        } else {
          console.log("✅ Supabase session data:", data);
        }
      } catch (e) {
        console.error("❌ Error connecting to Supabase:", e);
      }
    };
  
    testSupabase();
  }, []);
  



//////////////



//set translate
	const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

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
  const [checkboxChecked, setCheckboxChecked] = useState(false); // terms and coditions

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
    // const {data, error} = await supabase.auth.signUp({
    //   email,
    //   password,
    // },
    // {
    //   data: {
    //     username
    //   }
    // })
    // if(error){
    //   setRMsg(error.message)
    // }else{
    //   setRMsg(t("Successful registration"))
    //   setUser(data.user)
    // }

    const { data, error } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
        options: {
          data: {
            full_name: email,
          }
        }
      }
    )
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
    <div className="App" >
<div>

{/* <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
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

<div>&nbsp;</div>
<Language></Language>

</Box> */}

<InfoNavBar></InfoNavBar>


<Button onClick={async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    alert("Supabase błąd: " + error.message);
  } else {
    alert("Połączenie działa! Użytkownik: " + JSON.stringify(data));
  }
}}>Test Supabase Connection</Button>




</div>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // minHeight: '90vh',
      }} style={{ background: 'white',paddingTop: '14px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
      <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            allowScrollButtonsMobile 
            variant="scrollable"
            scrollButtons
            sx={{ display: 'flex' }}
          >
          <Tab label={t("sign in")} {...a11yProps(0)} />
          <Tab label={t("sign up")} {...a11yProps(1)} />
          <Tab label={t("sign in via magic link")} {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
      <Container maxWidth="md" style={{ padding: '16px' }}>
      <Card>
      <CardContent     sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
        <h1>{t("Sign in")}</h1>
        <TextField
          style={{ width: "250px" }}
          id="standard-basic"
          label={t("Enter your email")}
          placeholder={t("Enter your email")}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          variant="standard"
        />
        <br />
        <TextField
          style={{ width: "250px" }}
          id="standard-password-input"
          label={t("Enter your password")}
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <br />
        <br />
        <Button size="large" variant="contained" style={{ minWidth: '250px' }} onClick={Login}>
          {t("sign in")}
        </Button>
        <p>{Lmsg}</p>
        <br />
        <Link onClick={() => handleChange(null, 2)}>{t("I can't remember my password")}</Link>
        <Link onClick={() => handleChange(null, 1)}>{t("Don’t have an account?")}  {t("Get started")}</Link>
        <Link
            onClick={() => navigate('/info')} // Kliknij, aby nawigować do '/termsAndConditions'
          >
            {t("What is a TaskVenue?")}
          </Link>
      </CardContent>
    </Card>
    </Container>
      </TabPanel>

      <TabPanel value={value} index={1}>
      <Container maxWidth="md" style={{ padding: '16px' }}>
      <Card>
      <CardContent     sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <h1>{t("Sign up")}</h1>
         <TextField style={{ width: "250px" }} id="standard-basic" label={t("Enter your email")}variant="standard" onChange={(e) => 
        setEmail(e.target.value)} />
      <br/>
      <TextField
          style={{ width: "250px" }}
          id="standard-password-input"
          label={t("Enter your password")}
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
           <br/>
        {/* <TextField id="standard-basic" label="Imie" variant="standard" onChange={(e) => 
        setUsername(e.target.value)} /> */}
         
          <FormControlLabel
          control={<Checkbox onChange={(e) => setCheckboxChecked(e.target.checked)} />}
          label={
            <Link
            onClick={() => navigate('/termsAndConditions')} // Kliknij, aby nawigować do '/termsAndConditions'
          >
            {t("I agree to the terms and conditions")}
          </Link>
          }
        />
        <br />

      <Button size="large" variant="contained" style={{ minWidth: '250px'}} onClick={Register}   disabled={!checkboxChecked}  >{t("sign up")}</Button>
      <p>{Rmsg}</p>
      </CardContent>
    </Card>
    </Container>
      </TabPanel>

      <TabPanel value={value} index={2}>
      <Container maxWidth="md" style={{ padding: '16px' }}>
      <Card>
      <CardContent     sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <h1>{t("Sign in via magic link")}</h1>

      <br/>
      <TextField style={{ width: "250px" }} id="standard-basic" label={t("Enter your email")} placeholder={t("Enter your email")}  type="email" onChange={(e) => setEmail(e.target.value)} variant="standard" />
      <br/> 

      <FormControlLabel
          control={<Checkbox onChange={(e) => setCheckboxChecked(e.target.checked)} />}
          label={
            <Link
            onClick={() => navigate('/termsAndConditions')} // Kliknij, aby nawigować do '/termsAndConditions'
          >
            {t("I agree to the terms and conditions")}
          </Link>
          }
        />
         
      <br/> 
      <Button size="large" variant="contained" style={{ minWidth: '250px'}} disabled={!checkboxChecked}  onClick={SendMagicLink}>{t("send magic link")}</Button>
      <p>{LmsgL}</p>
      </CardContent>
    </Card>
    </Container>
      </TabPanel>
    </Box>
    <Footer style={{ position: 'fixed', bottom: 0, width: '100%' }}></Footer>
    </div>
  );
      }
export default Auth;
