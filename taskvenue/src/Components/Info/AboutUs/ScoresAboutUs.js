import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import CallMadeIcon from '@mui/icons-material/CallMade';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';

const ScoresAboutUs = () => {
  const { t, i18n } = useTranslation();
  const cards = [
    {
      icon: <FollowTheSignsIcon />,
      title: t("Inspection"),// Kontrola
      // subtitle: 'Podtytuł 1',
      text1: t("Electronic reporting simplifies control of all business processes")//'Elektroniczne raportowanie upraszcza kontrolę wszystkich procesów biznesowych',
    },
    {
      icon: <CardMembershipIcon />,
      title:  t('Customer loyalty'), //Lojalność klientów
      // subtitle: 'Podtytuł 2',
      text1: t("Improved service extends customer life cycle") //'Udoskonalony serwis wydłuża cykl życia klienta',
    },
    {
      icon: <CallMadeIcon />,
      title:  t("Income growth") , //Wzrost dochodu
      // subtitle: 'Podtytuł 3',
      text1: t("Operating costs decrease, increasing income") //'Zmniejszają się koszty operacyjne, zwiększając dochód',
    },
    {
      icon: <AltRouteIcon />,
      title: t("Optimization"), //Optymalizacja
      // subtitle: 'Podtytuł 4',
      text1: t("Detailed analysis of the company's profit and the profitability of each place served") //'Szczegółowa analiza zysku firmy i rentowności każdego obsłuonego miejsca',
    },
  ];

  return (
    <Container maxWidth={false} style={{ backgroundColor: '#338ede', padding: '30px' }}>
      {/* Dodaj nagłówek */}
      <Typography variant="h4" align="center" style={{ color: 'white', marginBottom: '20px' }}>
      {t("Results after implementing Task Venue software:")}
      </Typography>
      
      <Container maxWidth="md">
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar>
                    {card.icon}
                  </Avatar>
                }
                title={card.title}
                subheader={card.subtitle}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {card.text1}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {card.text2}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {card.text3}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {card.text4}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Container>
    </Container>
  );
};

export default ScoresAboutUs;
