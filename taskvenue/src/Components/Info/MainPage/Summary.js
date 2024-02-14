import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next';
const centerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '40vh', // Ustawia wysokość na całą dostępną wysokość okna przeglądarki
  background:'#f0f8ff'
};

const contentStyles = {
  textAlign: 'center',
  padding: '16px', // Estetyczne odstępy
};

const Summary = () => {
    const { t, i18n } = useTranslation();
  return (
    <div style={centerStyles}>
      <Container maxWidth="md">
      <Typography variant="h4" align="left" 
                   sx={{
                    mr: 2,
                    mt: 2,
                    // fontFamily: 'lato',
                    fontWeight: 700,
                    textDecoration: 'none',
                    color:"#338ede",
                    textAlign:"center"
                    
                  }}
                    >
              {t("Unleash the potential of your business")}
            </Typography>

            <Typography variant="h6" paragraph style={contentStyles}>
        {t("Revolutionise your business by implementing an 'all-in-one' solution that creates processes and aggregates all the data you use in the business.")}
        </Typography>

            
        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/infocontact">
            <Button variant="contained" color="primary">
              {t("Contact")}
            </Button>
          </Link>
        </div> */}
                     <div style={{ display: 'flex',justifyContent: 'center'  }}>
                    <Link to="/">
                      <Button variant="contained" color="primary" sx={{ marginTop: 3, marginRight:1}}>
                        {t("Get started today!")}
                      </Button>
                    </Link>
                    <Link to="/infoContact">
                      <Button color="primary" variant="outlined" sx={{ marginTop: 3}}>
                        {t("Contact")}
                      </Button>
                    </Link>
                  </div>
      </Container>
    </div>
  );
};

export default Summary;
