import React from 'react';
import { Container, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const footerStyles = {
  backgroundColor: '#2196F3', // Niebieskie tło
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
    navigate('/Contact');
  };

  const handlePrivacyPolicyClick = () => {
    navigate('/Polityka');
  };

  const handleTermsOfServiceClick = () => {
    navigate('/Regulamin');
  };

  return (
    <footer style={footerStyles}>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
        {t("Copyright © 2023 Task Venue - all rights reserved.")}
        </Typography>
        <Typography variant="body2" align="center">
          <Link style={linkStyles} onClick={handleContactClick}>
            Kontakt
          </Link>
          <Link style={linkStyles} onClick={handlePrivacyPolicyClick}>
            Polityka prywatności
          </Link>
          <Link style={linkStyles} onClick={handleTermsOfServiceClick}>
            Regulamin
          </Link>
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
