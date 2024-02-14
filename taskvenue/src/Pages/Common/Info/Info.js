import React from 'react';
import HeaderInfo from '../../../Components/Info/MainPage/HeaderInfo';
import Footer from '../../../Components/Info/Footer';
import InfoNavBar from '../../../Components/NavigationBar/InfoNavBar';
import TargetCompany from '../../../Components/Info/MainPage/TargetCompany';
import DescriptionOfTheMainFunction from '../../../Components/Info/MainPage/DescriptionOfTheMainFunction';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import YouTubePlayer from '../../../Components/Info/MainPage/YouTubePlayer';
import CookiesBanner from '../../../Components/Common/CookiesBanner';
import Problems from '../../../Components/Info/MainPage/Problems';
import ContactForm from '../../../Components/Info/MainPage/ContactForm';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Summary from '../../../Components/Info/MainPage/Summary';
import GifManagerView from '../../../Components/Info/MainPage/GifManagerView';

const Info = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  return (
<div>
<InfoNavBar></InfoNavBar>
<CookiesBanner></CookiesBanner>
<HeaderInfo></HeaderInfo>

<p></p>
<Problems></Problems>
<p></p>
<DescriptionOfTheMainFunction></DescriptionOfTheMainFunction>
<p></p>
<TargetCompany></TargetCompany>
<p></p>
<Container maxWidth="md" style={{ marginTop: '2rem' }}>
<Typography variant="h4" sx={{
                        mr: 2,
                        mt: 2,
                        // fontFamily: 'lato',
                        fontWeight: 700,
                        textDecoration: 'none',
                        color:"#338ede"
                        
                      }} align="center">
            {t("Contact form")}
          </Typography>
          <p></p>
          <Typography variant="h6" align="center">
            {t("Have questions or suggestions about our software? Contact the Task Venue team in any convenient way.")}
          </Typography>
<ContactForm></ContactForm>
</Container>
<p></p>
<GifManagerView></GifManagerView>
<p></p>
{/* <YouTubePlayer videoUrl="plXtqNL1Mh4" /> */}
<Summary></Summary>
<p></p>
<Footer></Footer>

</div>
  );
};

export default Info;
