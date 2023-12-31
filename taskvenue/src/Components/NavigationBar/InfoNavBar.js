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
import { useTranslation } from "react-i18next";
import LanguageForInfo from '../Common/LanguageForInfo';
import SendIcon from '@mui/icons-material/Send';


function InfoNavBar() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { t, i18n } = useTranslation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

    const navigate = useNavigate()

        //go to Tasks 
    const CaseStudy =  () => {
        navigate('/caseStudy')
        }
       //go to newTask  
    const Knowledge =  () => {
        navigate('/knowledge')
        }
        //go to ClientVenue  
    const AboutUs =  () => {
        navigate('/aboutUs')
        }
          //go to ClientContact  
    const InfoContact =  () => {
        navigate('/infoContact')
        }
        //go to Reports 
    const Technology =  () => {
        navigate('/technology')
                }
   const GoToApp =  () => {
        navigate('/')
                }
         //go to home 
    const Home =  () => {
        navigate('/info')
        }

          //automatyczna zmiena jezyka
          const languageCode = (navigator.language || 'pl').split('-')[0];
          const [language, setLanguage] = useState(languageCode);
        console.log(language)
          useEffect(() => {
            // Tutaj możesz również zaimplementować logikę zapisu do usestats
            localStorage.setItem("lng", language);
          }, [language]);
// koniec kodu automatycznej zmiany jezyka
  return (
    <div>
    <AppBar position="fixed" >
    <Container maxWidth="lx">
        <Toolbar disableGutters>
          <Typography 
          variant="h6"
          noWrap
          component="a"
          href="/info"
          sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
        <a href="/info">
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
{/* <Button onClick={CaseStudy}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Case study")}</Button> */}
{/* <Button onClick={AboutUs}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("About us")}</Button> */}
<Button onClick={GoToApp}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("App")}</Button>
<Button onClick={InfoContact}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Contact")}</Button>
<Button onClick={Knowledge}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("FAQ")}</Button>
{/* <Button onClick={Technology}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Technology")}</Button> */}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/info"
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
{/* <Button onClick={CaseStudy}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("Case study")}</Button> */}
{/* <Button onClick={AboutUs}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("About us")}</Button> */}
<Button onClick={GoToApp}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("App")}</Button>
<Button onClick={InfoContact}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("Contact")}</Button>
<Button onClick={Knowledge}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("FAQ")}</Button>
{/* <Button onClick={Technology}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("Technology")}</Button> */}
          </Box>
          <div sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }} >
          <Button 
  onClick={InfoContact} 
  variant="contained" 
  startIcon={<SendIcon />}
  sx={{ 
    display: { xs: 'none', md: 'flex' },
    backgroundColor: '#D13E30', // Rozjaśniony kolor czerwony
    color: 'white', // Kolor tekstu
    '&:hover': {
      backgroundColor: '#BF1809', // Kolor tła przycisku po najechaniu myszką
    },
  }}
>
  {t("Free consultation")}
</Button>

          </div>
          <Box sx={{ flexGrow: 0}}>
          <LanguageForInfo></LanguageForInfo>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Box marginTop={8}>
</Box>
  </div>
  );
}
export default InfoNavBar;