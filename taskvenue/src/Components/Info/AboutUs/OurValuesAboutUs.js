import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const OurValuesAboutUs = () => {
  const { t, i18n } = useTranslation();
  return (
    <Container >
      <Grid container spacing={2}>
        {/* 1 kontener */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
            <Typography variant="h6" gutterBottom>
            {t("Our vision")}          
            </Typography>
              <Typography variant="body2" color="text.secondary">
                {/* Tekst dla pierwszego kontenera */}
                {t("In creating and developing Task Venue, we want to listen to the needs of our customers in the marketplace. We want to provide exactly the tools you need for effective business management. In addition, we strive to make using Task Venue as simple and straightforward as possible.")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Obrazek dla pierwszego kontenera */}
        {/* <Grid item xs={12} sm={6}>
          <img src="/logo192.png" alt="Obrazek" />
        </Grid> */}


        {/* 2 kontener */}

        {/* Obrazek dla drugiego kontenera */}

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
            <Typography variant="h6" gutterBottom>
            {t("Our mission")}         
            </Typography>
              <Typography variant="body2" color="text.secondary">
                {/* Tekst dla drugiego kontenera */}
                {t("The mission is to deliver maximum value to our customers by designing, developing and implementing relevant and effective functionality that will benefit the service business. In addition, all of this is accessible and possible even on your smartphone! Pocket system allows you to easily log in to your account using your smartphone wherever you are: at any time you can monitor all the work of your team of employees, review orders and analysis without interrupting other important matters.")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <img src="/logo192.png" alt="Obrazek" />
        </Grid> */}

      </Grid>
    </Container>
  );
};

export default OurValuesAboutUs;
