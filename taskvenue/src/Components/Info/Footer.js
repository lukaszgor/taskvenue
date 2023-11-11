import React from 'react';
import { Container, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const footerStyles = {
  backgroundColor: '#338ede', // Niebieskie tło
  color: '#fff', // Biały tekst
  padding: '16px', // Odstępy między elementami
};

const linkStyles = {
  color: '#fff', // Kolor linków
  textDecoration: 'none',
  marginRight: '16px', // Odstęp między linkami
  '&:hover': {
    textDecoration: 'underline',
  },
};

function Footer() {
    const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/infocontact');
  };

  const handleAboutUs = () => {
    navigate('/aboutus');
  };

  const handleKnowledge = () => {
    navigate('/knowledge');
  };
  const termsAndConditions = () => {
    navigate('/termsAndConditions');
  };


  
  return (
    <footer style={footerStyles}>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
        {t("Copyright © 2023 Task Venue - all rights reserved.")}
        </Typography>
        <Typography variant="body2" align="center">
          <Link style={linkStyles} onClick={handleContactClick}>
          {t("Contact")}
          </Link>
          <Link style={linkStyles} onClick={handleAboutUs}>
          {t("About us")}
          </Link>
          <Link style={linkStyles} onClick={handleKnowledge}>
          {t("Knowledge")}
          </Link>
          <Link style={linkStyles} onClick={termsAndConditions}>
          {t("Terms and conditions")}
          </Link>
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
