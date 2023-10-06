import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const HeaderAboutUs = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  return (
<div>
<div style={{ background: 'white', minHeight: '60vh' }}>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" align="left" sx={{ mt: 10 }}>
              Task Venue prostota i wydajność w każdym szczególe
            </Typography>
            <Typography variant="h5" align="left" sx={{ mt: 2 }}>
            Wykorzystanie systemu Task Venue wpływa pozytywnie wpływa na budowanie relacji z klientami, co z kolei zwiększa dynamikę końcowego zysku.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
               src="/faviconnew.png"
              alt="Your Business"
              style={{ width: '100%', height: 'auto' }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
</div>
  );
};

export default HeaderAboutUs;
