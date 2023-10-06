



import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const OurValuesAboutUs = () => {
  return (
    <Container >
      <Grid container spacing={2}>
        {/* 1 kontener */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
            <Typography variant="h6" gutterBottom>
            Nasza wizja            
            </Typography>
              <Typography variant="body2" color="text.secondary">
                {/* Tekst dla pierwszego kontenera */}
                Dzisiejsze oprogramowanie do zarządzania działalnością sprzatania itp  nie rozwija się bardzo szybko, oferując ograniczoną funkcjonalność. Tworząc i rozwijając Task Venue chcemy przysłuchać się potrzebą naszych klientów na runku. Chcemu dostarczać  dokładnie te narzędzia, których potrzebujesz do efektywnego zarządzania biznesem. Ponadto staramy się, aby korzystanie z Task Venue było jak najprostsze i nieskomplikowane.
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
          <Card>
            <CardContent>
            <Typography variant="h6" gutterBottom>
            Nasza misja         
            </Typography>
              <Typography variant="body2" color="text.secondary">
                {/* Tekst dla drugiego kontenera */}
                Misją jest dostarczanie naszym klientom maksymalnej wartości poprzez projektowanie, rozwój i wdrażanie odpowiedniej i efektywnej funkcjonalności, która przyniesie korzyści biznesowi usługowemu. Ponadto wszystko to jest dostępne i możliwe nawet na Twoim smartfonie! „Kieszonkowy” system pozwala łatwo zalogować się do swojego konta za pomocą smartfona, gdziekolwiek jesteś: w każdej chwili możesz monitorować całą pracę swojej ekipy pracowników, przeglądać zamówienia i analizy bez przerywania innych ważnych spraw.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img src="/logo192.png" alt="Obrazek" />
        </Grid>

      </Grid>
    </Container>
  );
};

export default OurValuesAboutUs;
