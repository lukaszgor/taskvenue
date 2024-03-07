import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
    const listItems = ["Automatic notifications of receipt of a report", "Notification of employees and planning of execution dates", "Generation of work execution protocols","Documentation of the implementation of reports in the client's system","Electronic confirmations instead of paper documents","Settlement of services using the application's price lists"]; 
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
        {t("Using the Task Venue system enables communication, quality reporting, and completeness of the services rendered.")}
        </Typography>
        <p></p>
        <div style={{ display: 'flex',justifyContent: 'center'  }}>
        <List >
          {listItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <ArrowForwardIosIcon />
              </ListItemIcon>
              <ListItemText primary={t(item)} />
            </ListItem>
          ))}
        </List>
        <p></p>
        </div>

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
                    <p></p>
                  </div>
                  <p></p>
      </Container>
    </div>
  );
};

export default Summary;
