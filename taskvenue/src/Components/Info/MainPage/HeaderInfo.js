import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const HeaderInfo = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  return (
<div>
<div style={{ background: 'white', minHeight: '70vh' }}>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" align="left" sx={{ mt: 10 }}>
              Task Venue
            </Typography>
            <Typography variant="h5" align="left" sx={{ mt: 2 }}>
              Miejsce dla Twojego biznesu
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

export default HeaderInfo;
