import React from 'react';
import HeaderInfo from '../../../Components/Info/MainPage/HeaderInfo';
import ProductInfo from '../../../Components/Info/MainPage/ProductInfo';
import TryInfo from '../../../Components/Info/MainPage/TryInfo';
import Footer from '../../../Components/Info/Footer';
import StepperInfo from '../../../Components/Info/MainPage/StepperInfo';
import InfoNavBar from '../../../Components/NavigationBar/InfoNavBar';
import TargetCompany from '../../../Components/Info/MainPage/TargetCompany';
import Difficulties from '../../../Components/Info/MainPage/Difficulties';
import DescriptionOfTheMainFunction from '../../../Components/Info/MainPage/DescriptionOfTheMainFunction';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import YouTubePlayer from '../../../Components/Info/MainPage/YouTubePlayer';
import CookiesBanner from '../../../Components/Common/CookiesBanner';
import Problems from '../../../Components/Info/MainPage/Problems';
import ContactForm from '../../../Components/Info/MainPage/ContactForm';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Info = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  return (
<div>
<InfoNavBar></InfoNavBar>
<CookiesBanner></CookiesBanner>
<HeaderInfo></HeaderInfo>
{/* <Difficulties></Difficulties> */}
<p></p>
<Problems></Problems>
<p></p>
<DescriptionOfTheMainFunction></DescriptionOfTheMainFunction>
<p></p>
<TargetCompany></TargetCompany>
<p></p>
{/* <ProductInfo></ProductInfo> */}
<p></p>
<Container maxWidth="md" style={{ marginTop: '8rem' }}>
<Typography variant="h4" sx={{
                        mr: 2,
                        mt: 10,
                        // fontFamily: 'lato',
                        fontWeight: 700,
                        textDecoration: 'none',
                        color:"#338ede"
                        
                      }} align="center">
            {t("Formularz kontaktowy")}
          </Typography>
          <p></p>
          <Typography variant="h6" align="center">
            {t("Have questions or suggestions about our software? Contact the Task Venue team in any convenient way.")}
          </Typography>
<ContactForm></ContactForm>
</Container>
<p></p>
<YouTubePlayer videoUrl="plXtqNL1Mh4" title={t('Check us out on Youtube')} />
{/* <p></p>
<StepperInfo></StepperInfo>
<TryInfo></TryInfo> */}
<p></p>
<Footer></Footer>

</div>
  );
};

export default Info;
