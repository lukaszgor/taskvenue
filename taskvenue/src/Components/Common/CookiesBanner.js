import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";
import Link from "@mui/material/Link";



const CookiesBanner = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Sprawdź, czy użytkownik zaakceptował pliki cookie
    const acceptedCookies = localStorage.getItem('acceptedCookies');
    if (!acceptedCookies) {
      // Jeśli nie, pokaż baner z informacją o plikach cookie
      setOpen(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    // Zapisz informację o zaakceptowaniu plików cookie w localstorage
    localStorage.setItem('acceptedCookies', 'true');
    // Ukryj baner
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{t("This site uses cookies")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
        {t("By using it according to your current browser settings, you agree to their use. For more information on cookies and privacy, see Terms and Conditions.")}
        </DialogContentText>
        <Link
            onClick={() => navigate('/termsAndConditions')} // Kliknij, aby nawigować do '/termsAndConditions'
          >
            {t("Terms and Conditions")}
          </Link>
          <p></p>
        <Button onClick={handleAcceptCookies} color="primary">
        {t("Accept")}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CookiesBanner;
