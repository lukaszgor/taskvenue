import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Container from '@mui/material/Container';

const ProductInfo = () => {
  const cards = [
    {
      icon: <ScheduleIcon />,
      title: 'Planowanie pracy',
      subtitle: 'Efektywne zarządzanie czasem',
      text1: 'Optymalizuj swoją pracę dzięki planowaniu i organizacji zadań.',
    },
    {
      icon: <BeachAccessIcon />,
      title: 'Zarządzanie absencjami',
      subtitle: 'Śledzenie urlopów i nieobecności',
      text1: 'Skutecznie zarządzaj absencjami pracowników i śledź ich dostępność.',
    },
    {
      icon: <AssignmentIcon />,
      title: 'Zarządzanie zadaniami',
      subtitle: 'Efektywna kontrola projektów',
      text1: 'Śledź postęp projektów i przydzielaj zadania w jednym miejscu.',
    },
    {
      icon: <LocationOnIcon />,
      title: 'Zarządzanie miejscami',
      subtitle: 'Planowanie przestrzeni',
      text1: 'Optymalizuj wykorzystanie przestrzeni i zarządzaj miejscami.',
    },
  ];

  return (
    <Container maxWidth={false} style={{ backgroundColor: '#2196F3', padding: '30px' }}>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductInfo;
