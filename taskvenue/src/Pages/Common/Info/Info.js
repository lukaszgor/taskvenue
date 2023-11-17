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
