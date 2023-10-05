import React from 'react';
import HeaderInfo from '../../../Components/Info/MainPage/HeaderInfo';
import ProductInfo from '../../../Components/Info/MainPage/ProductInfo';
import TryInfo from '../../../Components/Info/MainPage/TryInfo';
import BenefitsInfo from '../../../Components/Info/MainPage/BenefitsInfo';
import Footer from '../../../Components/Info/Footer';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Info = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  return (
<div>
<HeaderInfo></HeaderInfo>
<ProductInfo></ProductInfo>
<TryInfo></TryInfo>
<BenefitsInfo></BenefitsInfo>
<p></p>
<Footer></Footer>

</div>
  );
};

export default Info;
