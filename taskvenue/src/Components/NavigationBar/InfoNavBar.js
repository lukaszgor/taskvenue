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
import Language from '../Common/Language';


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

  return (
    <div>
    <AppBar position="fixed" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/info"
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
 <Button onClick={Knowledge}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Knowledge")}</Button>
{/* <Button onClick={CaseStudy}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Case study")}</Button> */}
<Button onClick={Technology}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Technology")}</Button>
<Button onClick={AboutUs}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("About us")}</Button>
<Button onClick={InfoContact}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Contact")}</Button>
<Button onClick={GoToApp}  sx={{ my: 2, color: 'blue', display: 'block' }}>{t("Aplikacja")}</Button>
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
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
<Button onClick={Knowledge}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("Knowledge")}</Button>
{/* <Button onClick={CaseStudy}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("Case study")}</Button> */}
<Button onClick={Technology}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("Technology")}</Button>
<Button onClick={AboutUs}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("About us")}</Button>
<Button onClick={InfoContact}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("Contact")}</Button>
<Button onClick={GoToApp}  sx={{ my: 2, color: 'white', display: 'block' }}>{t("Aplikacja")}</Button>
          </Box>
          <Box sx={{ flexGrow: 0}} margin={1}>
          <Language></Language>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Box marginTop={10}>
</Box>
  </div>
  );
}
export default InfoNavBar;