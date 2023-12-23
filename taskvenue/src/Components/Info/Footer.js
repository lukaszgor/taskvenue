import React from 'react';
import { Container, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const footerStyles = {
  backgroundColor: 'white', // Niebieskie tło
  color: '#338ede', // Biały tekst
  padding: '16px', // Odstępy między elementami
};

const linkStyles = {
  color: '#338ede', // Kolor linków
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

  const handleKnowledge = () => {
    navigate('/knowledge');
  };
  const termsAndConditions = () => {
    navigate('/termsAndConditions');
  };
  const youtube = () => {
    window.open('https://www.youtube.com/channel/UCLozK310C9C_AjE6ka8R1zg', '_blank');
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
          <Link style={linkStyles} onClick={handleKnowledge}>
          {t("Knowledge")}
          </Link>
          <Link style={linkStyles} onClick={termsAndConditions}>
          {t("Terms and conditions")}
          </Link>
          <Link style={linkStyles} onClick={youtube}>
          {t("YouTube")}
          </Link>
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
