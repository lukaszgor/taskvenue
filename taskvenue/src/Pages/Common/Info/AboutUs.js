import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import HeaderAboutUs from '../../../Components/Info/AboutUs/HeaderAboutUs';
import TryAboutus from '../../../Components/Info/AboutUs/TryAboutus';
import ScoresAboutUs from '../../../Components/Info/AboutUs/ScoresAboutUs';
import OurValuesAboutUs from '../../../Components/Info/AboutUs/OurValuesAboutUs';
import InfoNavBar from '../../../Components/NavigationBar/InfoNavBar';
import Footer from '../../../Components/Info/Footer';

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  return (
<div>
    <InfoNavBar></InfoNavBar>
    <HeaderAboutUs></HeaderAboutUs>
    {/* <TryAboutus></TryAboutus> */}
    <p></p>
    <ScoresAboutUs></ScoresAboutUs>
    <p></p>
    <OurValuesAboutUs></OurValuesAboutUs>
    <p></p>
    <Footer></Footer>

</div>
  );
};

export default AboutUs;
