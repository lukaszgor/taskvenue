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
              {t("Task Venue simplicity and efficiency in every detail")}
            </Typography>
            <p></p>
            <Typography variant="h6" align="left" sx={{ mt: 2 }}>
            {t("The use of the Task Venue system has a positive impact on building customer relationships, which in turn increases the dynamics of the final profit.")}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
               src="/mainbackground.jpeg"
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
