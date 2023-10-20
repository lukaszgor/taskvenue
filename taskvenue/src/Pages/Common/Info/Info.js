import React from 'react';
import HeaderInfo from '../../../Components/Info/MainPage/HeaderInfo';
import ProductInfo from '../../../Components/Info/MainPage/ProductInfo';
import TryInfo from '../../../Components/Info/MainPage/TryInfo';
import Footer from '../../../Components/Info/Footer';
import StepperInfo from '../../../Components/Info/MainPage/StepperInfo';
import InfoNavBar from '../../../Components/NavigationBar/InfoNavBar';
import TargetCompany from '../../../Components/Info/MainPage/TargetCompany';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Info = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  return (
<div>
<InfoNavBar></InfoNavBar>
<HeaderInfo></HeaderInfo>
<ProductInfo></ProductInfo>
<TryInfo></TryInfo>
<p></p>
<TargetCompany></TargetCompany>
<p></p>
<StepperInfo></StepperInfo>
<p></p>
<Footer></Footer>

</div>
  );
};

export default Info;
