import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Box, Snackbar, Alert, Checkbox, FormControlLabel } from '@mui/material';
import sendEmail from '../../../Config/EmailSender';
import { useTranslation } from 'react-i18next';

function ContactForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [messageFromForm, setMessageFromForm] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // New state for Snackbar
  const { t, i18n } = useTranslation();
  const [checked, setChecked] = useState(false);

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, phone, message });

    const newMessageFromForm = 'Wiadomość od: ' + email + '. Numer telefonu: ' + phone + '. Treść wiadomości: ' + message;
    setMessageFromForm(newMessageFromForm);

    // Clear form fields
    setEmail('');
    setPhone('');
    setMessage('');

    // Show success alert
    setOpenSnackbar(true);
  };

  useEffect(() => {
    if (messageFromForm) {
      sendEmail({
        toEmail: 'lukasz.gg13@gmail.com',
        subject: 'Nowa szansa Task Venue',
        message: messageFromForm,
      });
    }
  }, [messageFromForm]);

  // Function to close Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Paper style={{ padding: '20px', margin: '20px' }}>
      <form onSubmit={handleSubmit}>
        <Box marginBottom={2}>
          <TextField
            required
            fullWidth
            label={t('E-mail')}
            name="email"
            value={email}
            onChange={handleChange(setEmail)}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            fullWidth
            label={t('Phone')}
            name="phone"
            value={phone}
            onChange={handleChange(setPhone)}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            required
            fullWidth
            label={t('Content of the message')}
            name="message"
            multiline
            rows={4}
            value={message}
            onChange={handleChange(setMessage)}
          />
        </Box>
        <Box marginBottom={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleCheckboxChange}
              name="agreement"
            />
          }
          label={t("You agree to be contacted by telephone and electronically to process this application. You agree to the use of email communication for marketing purposes")}
        />
        </Box>

        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" type="submit" disabled={!checked}>
            {t('Send')}
          </Button>
        </Box>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {t('Sent')}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default ContactForm;
