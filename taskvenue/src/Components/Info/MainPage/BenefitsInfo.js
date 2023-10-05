import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const BenefitsInfo = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        {/* 1 kontener */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {/* Tekst dla pierwszego kontenera */}
                Linijka 1
                <br />
                Linijka 2
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Obrazek dla pierwszego kontenera */}
        <Grid item xs={12} sm={6}>
          <img src="/logo192.png" alt="Obrazek" />
        </Grid>


        {/* 2 kontener */}

        {/* Obrazek dla drugiego kontenera */}
        <Grid item xs={12} sm={6}>
          <img src="/logo192.png" alt="Obrazek" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {/* Tekst dla drugiego kontenera */}
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
              </Typography>
            </CardContent>
          </Card>
        </Grid>

          {/* 3 kontener */}
          <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {/* Tekst dla drugiego kontenera */}
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Obrazek dla drugiego kontenera */}
        <Grid item xs={12} sm={6}>
          <img src="/logo192.png" alt="Obrazek" />
        </Grid>

              {/* 4 kontener */}

        {/* Obrazek dla drugiego kontenera */}
        <Grid item xs={12} sm={6}>
          <img src="/logo192.png" alt="Obrazek" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {/* Tekst dla drugiego kontenera */}
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
};

export default BenefitsInfo;
