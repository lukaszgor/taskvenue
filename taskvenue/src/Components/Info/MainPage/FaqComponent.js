import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';

const FaqComponent = () => {
    const { t, i18n } = useTranslation();
  // Przykładowe pytania i odpowiedzi
  const faqs = [
    {
        question:  t("What is the cost of implementing and maintaining your software?"),
        answer: t("The cost depends on the chosen package and the range of necessary features. We offer various pricing models, including subscription options and one-time payments, to fit the budget of any company.")
      },
      {
        question:  t("Is the software scalable as my company grows?"),
        answer: t("Absolutely, our solutions are scalable and can be adjusted to meet the growing needs of your business. We offer flexible options to meet both short and long-term business requirements.")
      },
      {
        question:  t("Can I try the software for free?"),
        answer: t("Yes. We offer a free 30-minute consultation, which allows you to quickly learn the system and configure all the necessary elements.")
      },
      {
        question:  t("How long can I try the software for free?"),
        answer: t("The default trial period is 7 days.")
      },
      {
        question: t("What technology is the software written in?"),
        answer: t("The application is built on React. Additionally, we have strengthened our application by integrating with the Supabase cloud."),
      }
    ,
    // Możesz dodać więcej pytań i odpowiedzi tutaj
  ];

  return (
    <Container maxWidth="md">
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FaqComponent;
