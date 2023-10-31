import React, { useState } from 'react';
import {
    Button,
    Grid,
    Container,
    Card,
    CardActions,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

const WorkerStartAndStop = () => {
  const [isRunning, setIsRunning] = useState(false);

  const handleStartClick = () => {
    // Tu możesz umieścić kod, który ma być wywołany po naciśnięciu przycisku "Start"
    setIsRunning(true);
  };

  const handleStopClick = () => {
    // Tu możesz umieścić kod, który ma być wywołany po naciśnięciu przycisku "Stop"
    setIsRunning(false);
  };

  return (
    <div>
<Container maxWidth="md">
<Grid container spacing={2}>
<Grid item xs={6} sm={6}>
        <Button
            variant="contained"
            color="primary"
            startIcon={<PlayArrowIcon />}
            onClick={handleStartClick}
            disabled={isRunning}
            >
            Start
            </Button>
</Grid>
<Grid item xs={6} sm={6}>
        <Button
            variant="contained"
            color="secondary"
            startIcon={<StopIcon />}
            onClick={handleStopClick}
            disabled={!isRunning}
            >
        Stop
        </Button>
</Grid>
</Grid>
</Container>
    </div>
  );
};

export default WorkerStartAndStop;
