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
  'Darmowa prezentacja standardowego rozwiązania',
  'Konfiguracja środowiska, dostosowanie do Twoich potrzeb',
  'Optymalizacja Twojej firmy',
];

const stepDescriptions = [
  'Nasz proces rozpoczyna się od bezpłatnej prezentacji standardowego rozwiązania. Po skontaktowaniu się z nami, umówimy się na spotkanie lub wideokonferencję, aby omówić Twoje potrzeby i cele biznesowe. W trakcie tego spotkania przedstawimy Ci nasze standardowe rozwiązanie, które może stanowić podstawę dla dalszych działań. Dowiesz się, jakie korzyści może przynieść Twojej firmie.',
  'Po zapoznaniu się z naszym standardowym rozwiązaniem, przechodzimy do kroku konfiguracji. Nasz zespół specjalistów będzie pracował nad dostosowaniem i dostarczeniem spersonalizowanej wersji naszego rozwiązania, tak aby idealnie pasowało do Twoich potrzeb. Możemy dostosować funkcje, interfejs użytkownika, a także inne elementy, aby zapewnić maksymalną użyteczność dla Twojej firmy. Naszym celem jest stworzenie rozwiązania, które spełni Twoje oczekiwania i przyniesie korzyści.',
  'Ostatni etap to optymalizacja Twojej firmy. Po wdrożeniu spersonalizowanego rozwiązania, nasz zespół będzie nadal współpracować z Tobą, aby zapewnić, że wszystko działa sprawnie i efektywnie. Monitorujemy wyniki, zbieramy opinie i proponujemy ewentualne udoskonalenia. Naszym celem jest ciągłe doskonalenie Twojej firmy i wspieranie Cię w osiągnięciu sukcesu.',
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
