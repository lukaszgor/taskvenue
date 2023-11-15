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
  const containerStyle = {
    maxWidth: 'md',
  };
  
  const paperStyle = {
    padding: '20px',
  };

  
const YouTubePlayer = ({ videoUrl,title }) => {
 
  return (
<div>
    <Container maxWidth="md" style={containerStyle}>
    <Paper elevation={3} style={paperStyle}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <div>
            <h3>{title}</h3>
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
