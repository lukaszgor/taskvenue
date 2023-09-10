import React from 'react';
import { useState, useEffect } from 'react';
import FetchSupabaseData from '../../Config/FetchSupabaseData';
import { TextField, Button, Grid, Container,Accordion, AccordionSummary, AccordionDetails, Typography  } from '@mui/material';
import { useTranslation } from "react-i18next";
import clipboardCopy from 'clipboard-copy';
import WaitingRoomNavBar from '../../Components/NavigationBar/WaitingRoomNavBar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';
import Game from '../../Components/Common/Game';
import Username from '../../Components/Common/Username';

const WaitingRoomForNewUser = () => {
    const { t, i18n } = useTranslation();
    const [receivedData, setReceivedData] = useState({ userId: '', idConfiguration: '', profileType: '' });
    const handleGetData = (userId, idConfiguration, profileType) => {
        setReceivedData({ userId, idConfiguration, profileType });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await clipboardCopy(receivedData.userId);
          } catch (error) {
            console.error( error);
          }
    }

      return (

        <div>
<WaitingRoomNavBar></WaitingRoomNavBar>
<p></p>


<Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Hi, your ID can be found below')} <WavingHandOutlinedIcon /></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <FetchSupabaseData sendData={handleGetData}></FetchSupabaseData>
            <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="UserID"
                label= {t("User ID")}
                value={receivedData.userId}
                fullWidth
                required
                disabled
              />
            </Grid>
            <Grid item xs={12}>
            <div style={{ textAlign: 'center' }}>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                // style={{ width: '200px' }}
                fullWidth
              >
                {t("Copy")}
              </Button>
            </div>

            </Grid>
            <Grid item xs={12}>
            <p> {t("Copy the ID and deliver to your administrator to add you to the appropriate configuration")}</p>
            </Grid>
          
          </Grid>
          <div>
    </div>
        </form>
      </Container>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t("First and last name")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
<Username></Username>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t("Are you waiting? let's play a game")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
<Game></Game>
        </AccordionDetails>
      </Accordion>


 
      
      </div>
      );
};

export default WaitingRoomForNewUser;