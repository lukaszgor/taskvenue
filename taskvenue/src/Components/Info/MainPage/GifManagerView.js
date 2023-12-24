import React, { useRef } from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    Typography,
    Container,
    Paper,
    Grid,
    Button,
  } from '@mui/material';
  import { useTranslation } from 'react-i18next';
  const containerStyle = {
    maxWidth: 'md',
  };
  
  const paperStyle = {
    padding: '20px',
  };

  
const GifManagerView = () => {
    const { t, i18n } = useTranslation();
  return (
<div>
    <Container maxWidth="md" style={containerStyle}>

    <Paper elevation={3} style={paperStyle}>
    <Typography variant="h5" gutterBottom sx={{
                        mr: 2,
                        mt: 2,
                        // fontFamily: 'lato',
                        fontWeight: 700,
                        textDecoration: 'none',
                        color:"#338ede"
                        
                      }} align="center"> 
      {t('Try it for free')}
        </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <div style={{ padding: '20px' }}>
            <img
               src="/animationmanagershort.gif"
              alt="Your Business"
              style={{ width: '100%', height: 'auto' }}
            />
            </div>
        </Grid>

      </Grid>
    </Paper>
  </Container>

    </div>
  );
};

export default GifManagerView;
