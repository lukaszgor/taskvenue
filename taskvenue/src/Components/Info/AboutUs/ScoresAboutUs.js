import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import Container from '@mui/material/Container';

const ScoresAboutUs = () => {
  const cards = [
    {
      icon: <AccountCircleIcon />,
      title: 'Kontrola i Przezroczystość',
      // subtitle: 'Podtytuł 1',
      text1: 'Elektroniczne raportowanie upraszcza kontrolę wszystkich procesów biznesowych',
    },
    {
      icon: <HomeIcon />,
      title: 'Lojalność klientów',
      // subtitle: 'Podtytuł 2',
      text1: 'Udoskonalony serwis wydłuża cykl życia klienta',
    },
    {
      icon: <WorkIcon />,
      title: 'Wzrost dochodu',
      // subtitle: 'Podtytuł 3',
      text1: 'Zmniejszają się koszty operacyjne, zwiększając dochód',
    },
    {
      icon: <SchoolIcon />,
      title: 'Optymalizacja',
      // subtitle: 'Podtytuł 4',
      text1: 'Szczegółowa analiza zysku firmy i rentowności każdego obsłuonego miejsca',
    },
  ];

  return (
    <Container maxWidth={false} style={{ backgroundColor: '#2196F3', padding: '30px' }}>
      {/* Dodaj nagłówek */}
      <Typography variant="h4" align="center" style={{ color: 'white', marginBottom: '20px' }}>
      Wyniki po wdrożeniu oprogramowania Task Venue:
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
