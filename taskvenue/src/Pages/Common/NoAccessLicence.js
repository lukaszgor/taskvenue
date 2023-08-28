import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import supabase from '../../supabaseClient';
const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const theme = createTheme();  // Tworzenie pustego tematu MUI

const NoAccessLicence = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleNavigate = () => {
      SignOut();
  };

      //Signout method
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
    <MuiThemeProvider theme={theme}>  {/* Używamy tematu MUI */}
      <ThemeProvider theme={theme}>  {/* Używamy tematu dla styled-components */}
        <RootContainer>
          <Typography variant="h4" gutterBottom>
          {t("License expired")}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleNavigate}>
          {t("Back to home page")}
          </Button>
          {/* <Image
            src="link_do_twojej_grafiki.jpg"
            alt="Grafika"
          /> */}
        </RootContainer>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default NoAccessLicence;
