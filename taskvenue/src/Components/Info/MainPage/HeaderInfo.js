import React from 'react';
import { Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; 

const HeaderInfo = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  return (
<div>
<div style={{ background: 'white', minHeight: '70vh' }}>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" align="left" 
                      sx={{
                        mr: 2,
                        mt: 10,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        textDecoration: 'none',
                      }}
                    >
              TaskVenue
            </Typography>
            <Typography variant="h4" align="left" sx={{ mt: 2 }}>
              {t("A place for your business")}
            </Typography>
            <p></p>

                  <Typography variant="h6" align='center' sx={{ mt: 2, marginTop: 10, marginBottom: 2 }}>
                    {t("That is, a system that improves management and communication between management, the customer, and those doing the work in the field.")}
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to="/infocontact">
                      <Button variant="contained" color="primary">
                        {t("Order a consultation")}
                      </Button>
                    </Link>
                  </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
               src="/mobile.png"
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
