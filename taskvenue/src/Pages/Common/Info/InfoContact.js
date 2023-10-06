import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Footer from '../../../Components/Info/Footer';
import InfoNavBar from '../../../Components/NavigationBar/InfoNavBar';
import { useTranslation } from 'react-i18next';

const InfoContact = () => {
    const { t, i18n } = useTranslation();
  return (
    <div>
    <InfoNavBar></InfoNavBar>
    <p></p>
    <div style={{ background: 'white', minHeight: '75vh' }}>
    <Container maxWidth="md" style={{ marginTop: '8rem' }}>
      <Typography variant="h4" align="center">
      {t("Contact")}
      </Typography>
      <Typography variant="h6" align="center">
        {t("Have questions or suggestions about our software? Contact the Task Venue team in any convenient way.")}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        <Card style={{ flexBasis: '48%', textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h5">{t("Phone number")}</Typography>
            <PhoneIcon style={{ fontSize: 60, marginTop: '1rem' }} />
            <Typography variant="body1">+48 123 456 789</Typography>
          </CardContent>
        </Card>
        <Card style={{ flexBasis: '48%', textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h5">Email</Typography>
            <EmailIcon style={{ fontSize: 60, marginTop: '1rem' }} />
            <Typography variant="body1">kontakt@taskvenue.com</Typography>
          </CardContent>
        </Card>
      </div>
    </Container>
    </div>
    <Footer></Footer>
    </div>

  );
};

export default InfoContact;
