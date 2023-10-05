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

const ProductInfo = () => {
  const cards = [
    {
      icon: <AccountCircleIcon />,
      title: 'Karta 1',
      subtitle: 'Podtytuł 1',
      text1: 'Tekst 1',
      text2: 'Tekst 2',
      text3: 'Tekst 3',
      text4: 'Tekst 4',
    },
    {
      icon: <HomeIcon />,
      title: 'Karta 2',
      subtitle: 'Podtytuł 2',
      text1: 'Tekst 5',
      text2: 'Tekst 6',
      text3: 'Tekst 7',
      text4: 'Tekst 8',
    },
    {
      icon: <WorkIcon />,
      title: 'Karta 3',
      subtitle: 'Podtytuł 3',
      text1: 'Tekst 9',
      text2: 'Tekst 10',
      text3: 'Tekst 11',
      text4: 'Tekst 12',
    },
    {
      icon: <SchoolIcon />,
      title: 'Karta 4',
      subtitle: 'Podtytuł 4',
      text1: 'Tekst 13',
      text2: 'Tekst 14',
      text3: 'Tekst 15',
      text4: 'Tekst 16',
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
  );
};

export default ProductInfo;
