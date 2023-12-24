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

 
const YouTubePlayer = ({ videoUrl }) => {
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
      {t('Check us out on Youtube')}
        </Typography>
        <p></p>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <div>
      <iframe
        title="YouTube Video Player"
        width="100%"
        height="500px"
        src={`https://www.youtube.com/embed/${videoUrl}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>

      <div>
      </div>
    </div>
        </Grid>

      </Grid>
    </Paper>
  </Container>

    </div>
  );
};

export default YouTubePlayer;
