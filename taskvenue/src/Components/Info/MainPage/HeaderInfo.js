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
          <Grid item xs={12} md={4}>
            <Typography variant="h3" align="left" 
                      sx={{
                        mr: 2,
                        mt: 10,
                        // fontFamily: 'lato',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        textDecoration: 'none',
                      }}
                    >
              TaskVenue
            </Typography>
            {/* <Typography variant="h4" align="left" sx={{ mt: 2 ,
                                    fontFamily: 'lato',
                                    fontWeight: 700,
                                    // letterSpacing: '.3rem',
                                    textDecoration: 'none',
            }}>
          {t("A place for your business")}
            </Typography> */}
                  {/* <Typography variant="h6" align='left' sx={{ mt: 2, marginTop: 4, marginBottom: 2 }}>
                  {t("A place for your business")}
                  </Typography> */}

                  <Typography variant="h6" align='left' sx={{ mt: 2, marginTop: 4, marginBottom: 2 }}>
                  {t("A place for your business")+". "} 
                  <br></br>
                    {t("That is, a system that improves management and communication between management, the customer, and those doing the work in the field.")}
                  </Typography>
                
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to="/">
                      <Button variant="contained" color="primary" sx={{ marginTop: 3}}>
                        {t("Try it for free")}
                      </Button>
                    </Link>
                  </div>
          </Grid>
          <Grid item xs={12} md={8} >
            <div style={{ padding: '20px' }}>
            <img
               src="/newHeader.png"
              alt="Your Business"
              style={{ width: '100%', height: 'auto' }}
            />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
</div>
  );
};

export default HeaderInfo;
