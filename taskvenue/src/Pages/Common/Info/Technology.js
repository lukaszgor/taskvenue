import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Link, Box,Container,Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import InfoNavBar from '../../../Components/NavigationBar/InfoNavBar';
import Footer from '../../../Components/Info/Footer';

function Technology() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
<InfoNavBar></InfoNavBar>
<Container maxWidth="md">

<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px',minHeight: '80vh' }}>
<Grid container spacing={2}>
<Grid item xs={12} sm={12}>
      <Box p={2} style={{ maxWidth: '900px' }}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight="bold">
              React
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {t("React is a popular JavaScript library for creating interactive web applications. It is relatively easy to learn and uses the concept of components, which are self-contained units of the user interface. The main advantage of React is the efficient management of interface updates, thanks to the virtual DOM tree, which minimizes manipulation of the real DOM tree and improves application performance. React also promotes one-way data flow, making it easier to manage data in your application. You can create reusable components to speed up application development, and use development tools to debug and analyze applications. For beginner developers, React offers a simple path to learn and develop skills in creating modern and responsive web applications. React is a popular JavaScript library for creating interactive web applications. It is relatively easy to learn and uses the concept of components, which are self-contained units of the user interface. The main advantage of React is the efficient management of interface updates, thanks to the virtual DOM tree, which minimizes manipulation of the real DOM tree and improves application performance. React also promotes one-way data flow, making it easier to manage data in your application. You can create reusable components to speed up application development, and use development tools to debug and analyze applications. For beginner programmers, React offers a simple path to learning and developing skills in creating modern and responsive web applications.")}
            </Typography>
            <br />
            <Link href="https://www.reactjs.org" target="_blank" rel="noopener">
            {t("Read more on the official website")}
            </Link>
          </AccordionDetails>
        </Accordion>
      </Box>
      </Grid>


      <Grid item xs={12} sm={12}>
      <Box p={2} style={{ maxWidth: '900px'}}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight="bold">
              Supabase
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            {t("Supabase is a platform that makes it easy to build database-driven web applications. It is based on the PostgreSQL database and provides a range of tools and features for building and managing applications. You can use Supabase to store data, manage users, create authentication, support real-time communication and much more. It is a flexible solution that offers simple access to data via REST API and supports file storage. Supabase is user-friendly, scalable, and available as an open source project, making it an attractive tool for both beginners and experienced developers who want to quickly create modern web applications.")}
            </Typography>
            <br />
            <Link href="https://supabase.com/" target="_blank" rel="noopener">
            {t("Read more on the official website")}
            </Link>
          </AccordionDetails>
        </Accordion>
      </Box>
      </Grid>
      </Grid>
    </div>
    
    </Container>
    <Footer></Footer>
    </div>


  );
}

export default Technology;
