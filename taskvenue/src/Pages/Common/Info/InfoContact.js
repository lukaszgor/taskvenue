import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import RoomIcon from '@mui/icons-material/Room'; // Import the RoomIcon for the location
import Grid from '@mui/material/Grid';
import Footer from '../../../Components/Info/Footer';
import InfoNavBar from '../../../Components/NavigationBar/InfoNavBar';
import { useTranslation } from 'react-i18next';

const InfoContact = () => {
  const { t, i18n } = useTranslation();

  // Styl dla ikon
  const iconStyle = {
    fontSize: 60,
    marginTop: '1rem',
    color: '#2196f3', // Kolor niebieski
  };

  return (
    <div>
      <InfoNavBar></InfoNavBar>
      <p></p>
      <div style={{ background: 'white', minHeight: '85vh' }}>
        <p></p>
        <Container maxWidth="md" style={{ marginTop: '8rem' }}>
          <Typography variant="h4" align="center">
            {t("Contact")}
          </Typography>
          <Typography variant="h6" align="center">
            {t("Have questions or suggestions about our software? Contact the Task Venue team in any convenient way.")}
          </Typography>
          <Grid container spacing={2} justifyContent="space-between" style={{ marginTop: '2rem' }}>
            <Grid item xs={12} sm={4}>
              <Card style={{ textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h5">{t("Phone number")}</Typography>
                  <PhoneIcon style={iconStyle} />
                  <Typography variant="body1">+48 123 456 789</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card style={{ textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h5">Email</Typography>
                  <EmailIcon style={iconStyle} />
                  <Typography variant="body1">kontakt@taskvenue.com</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card style={{ textAlign: 'center' }}>
                <CardContent>
                  <RoomIcon style={iconStyle} /> {/* Use the RoomIcon for the location */}
                  <Typography variant="h5">{t("Based in Cracow")}</Typography>
                  <Typography variant="body1">{t("Poland")}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
      <p></p>
      <Footer style={{ position: 'fixed', bottom: 0, width: '100%' }}></Footer>
    </div>
  );
};

export default InfoContact;
