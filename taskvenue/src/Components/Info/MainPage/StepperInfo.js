import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Container,
  Paper,
  Grid,
} from '@mui/material';

const containerStyle = {
  maxWidth: 'md',
};

const paperStyle = {
  padding: '20px',
};

const stepContainerStyle = {
  marginBottom: '2em', // Dodaj margines na widoku mobilnym
};

const stepContentStyle = {
  marginTop: '2em', // Dodaj margines dla treści kroku
};

const steps = [
  'Poznajmy się',
  'Darmowa prezentacja standardowego rozwiązania',
  'Konfiguracja środowiska, dostosowania do Twoich potrzeb',
  'Optymalizacja twojej firmy',
];

const stepDescriptions = [
  'Opis kroku 1: Poznajmy się + Dodać linki',
  'Opis kroku 2: Darmowa prezentacja standardowego rozwiązania',
  'Opis kroku 3: Konfiguracja środowiska, dostosowania do Twoich potrzeb',
  'Opis kroku 4: Optymalizacja twojej firmy',
];

const StepperInfo = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (stepIndex) => {
    setActiveStep(stepIndex);
  };

  return (
    <Container maxWidth="md" style={containerStyle}>
      <Paper elevation={3} style={paperStyle}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} style={stepContainerStyle}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    onClick={() => handleStepClick(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="h5">{steps[activeStep]}</Typography>
            <div style={stepContentStyle}>
              <Typography variant="body1">
                {stepDescriptions[activeStep]}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default StepperInfo;
