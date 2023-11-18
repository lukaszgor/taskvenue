

import emailjs from 'emailjs-com';

const sendEmail = async ({ toEmail, subject, message }) => {
  const templateParams = {
    to_email: toEmail,
    subject: subject,
    message: message,
  };

  try {
    const response = await emailjs.send(
        'service_oquw5kr',
        'template_lvrrvtl',
        templateParams,
        'uG2QytcRXYF6WMuk6'
    );
    console.log('E-mail został wysłany:', response);
  } catch (error) {
    console.error('Błąd podczas wysyłania e-maila:', error);
  }
};

export default sendEmail;