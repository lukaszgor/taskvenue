import React, { useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const choices = ['rock', 'paper', 'scissors'];

function Game() {
  const { t } = useTranslation();
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');

  const handleChoice = (choice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    setPlayerChoice(choice);
    setComputerChoice(computerChoice);

    if (choice === computerChoice) {
      setResult(t('game.tie'));
    } else if (
      (choice === 'rock' && computerChoice === 'scissors') ||
      (choice === 'paper' && computerChoice === 'rock') ||
      (choice === 'scissors' && computerChoice === 'paper')
    ) {
      setResult(t('game.playerWins'));
    } else {
      setResult(t('game.computerWins'));
    }
  };

  return (
    <Container maxWidth="sm">

      <Grid container spacing={2}>
        {choices.map((choice) => (
          <Grid item key={choice}>
            <Button variant="outlined" onClick={() => handleChoice(choice)}>
              {t(`game.${choice}`)}
            </Button>
          </Grid>
        ))}
      </Grid>
      {playerChoice && (
        <Typography variant="h6" color="textSecondary" style={{ marginTop: '16px' }}>
          {t('game.playerChoice', { choice: t(`game.${playerChoice}`) })}
        </Typography>
      )}
      {computerChoice && (
        <Typography variant="h6" color="textSecondary">
          {t('game.computerChoice', { choice: t(`game.${computerChoice}`) })}
        </Typography>
      )}
      {result && (
        <Typography variant="h5" style={{ marginTop: '16px' }}>
          {t(result)}
        </Typography>
      )}
    </Container>
  );
}

export default Game;
