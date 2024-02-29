import React, { useState, useEffect } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import supabase from '../../supabaseClient';
import moment from 'moment';
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography
} from '@mui/material';


function CreateNewConfiguration() {

  const [activeStep, setActiveStep] = useState(0);
  const [organizationName, setOrganizationName] = useState(''); // Stan przechowujący wprowadzoną nazwę organizacji
  const [isOrganizationNameFilled, setIsOrganizationNameFilled] =useState(''); 
  const [userID, setUserID] = useState('');
  const [newRekordId, setNewRekordId] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [validityDate, setValidityDate] = useState('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUserID(data.session.user.id);
      }
    };
    checkSession();
  }, []);


  const steps = [
    {
      label: t("Name the organization"),
      description: t("Provide the name of your company, facility or organization so that we can better tailor our services to your needs"),
    },
    {
      label: t("Free trial period"),
      description:
      t("The trial period lasts 7 days and is completely free. It allows you to use all the features of the TaskVenue system, allowing you to manage your company and add employees to your setup."),
    },
    {
      label: t("Congratulations"),
      description: t("You have successfully created the configuration. Clicking the button below will take you to the system."),
    },
  ];

  const handleNext = () => {
    if (activeStep === 0) {
      // Jeśli jesteśmy w kroku 0, sprawdź, czy pole "Nazwa organizacji" jest wypełnione
      if (organizationName.trim() !== '') {
        setIsOrganizationNameFilled(true);
        handleInsert();
      } else {
        // Tutaj możesz dodać obsługę przypadku, gdy pole jest puste
      }
    } else if (activeStep === 1) {
      updateRecord(userID, newRekordId);
    } else if (activeStep === 2) {
      Home();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleInsert = async () => {
    const { data, error } = await supabase
      .from('configurations')
      .insert([
        {
         name: organizationName,
         validity_date: validityDate,
         idUser: userID,
        },
      ]).select('id').single();
    if (error) {
      console.log(error);
    }
    if (data) {
      setNewRekordId(data.id);
    }
  };

  const updateRecord = async (userID, newRekordId) => {
    try {
      // Zdefiniuj aktualizowane dane
      const updates = {
        profile_type: 'manager',
        id_configuration: newRekordId,
      };
  
      // Wykonaj aktualizację rekordu w bazie danych
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userID);
  
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas aktualizacji rekordu:', error);
    }
  };

useEffect(() => {
  const updateCurrentDateTime = () => {
    const now = moment();
    const formattedDateTime = now.format('DD:MM:YYYY HH:mm');
    setCurrentDateTime(formattedDateTime);

    // Oblicz datę 7 dni w przód i ustaw ją w stanie
    const newValidityDate = now.add(7, 'days').format('DD:MM:YYYY HH:mm');
    setValidityDate(newValidityDate);
  };
  updateCurrentDateTime();
}, []);
  
const Home =  () => {
    navigate('/home')
    }

  return (
    <Box>
              <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">{t("Last step")}</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              {index === 0 && (
                    <div>
                        <p></p>
                        <TextField
                        label={t("Name of the organization")}
                        variant="outlined"
                        value={organizationName}
                        onChange={(e) => {
                            setOrganizationName(e.target.value);
                            setIsOrganizationNameFilled(e.target.value.trim() !== ''); // Aktualizuj stan w zależności od zawartości pola
                        }}
                        required
                        />
                        <Box sx={{ mb: 2 }}>
                        <div>
                            <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                            disabled={!isOrganizationNameFilled} // Wyłącz przycisk "Dalej" w przypadku, gdy pole jest puste
                            >
                            {index === steps.length - 1 ? t("Finish") : t("Continue")}
                            </Button>
                        </div>
                        </Box>
                    </div>
                    )}
                {index === 1 && (
                    <div>
                        <p></p>
                        <p>{t("Your trial period is valid until")}  {validityDate}</p>
                        <Box sx={{ mb: 2 }}>
                        <div>
                            <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                            >
                            {index === steps.length - 1 ? t("Finish") : t("Continue")}
                            </Button>
                        </div>
                        </Box>
                    </div>
                    )}

                {index === 2 && (
                    <div>
                        <p></p>

                        <Box sx={{ mb: 2 }}>
                        <div>
                            <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                            >
                            {index === steps.length - 1 ? t("Finish") : t("Continue")}
                            </Button>
                        </div>
                        </Box>
                    </div>
                    )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <p></p>
      </Grid>
      </Grid>
    </Box>
  );
}
export default CreateNewConfiguration;