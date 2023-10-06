import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

const languageOptions = [
  { value: 'en', label: '🇬🇧 English' },
  { value: 'pl', label: '🇵🇱 Polish' },
  { value: 'de', label: '🇩🇪 German' },
];

function LanguageForInfo() {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("lng") || "pl");

  const handleChangeLng = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  return (
    <Box display="flex" justifyContent="center">
      <FormControl variant="outlined" style={{ marginRight: '16px', width: 'auto' }}>
        <Select
          value={selectedLanguage}
          onChange={(event) => {
            const selectedLng = event.target.value;
            handleChangeLng(selectedLng);
            setSelectedLanguage(selectedLng);
          }}
          sx={{
            color: 'white', // Kolor tekstu w Select
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2196f300 !important', // Kolor obramowania pola Select
            },
            '& .MuiInputLabel-root': {
              color: '#2196f300 !important', // Kolor etykiety
            },
            '& .MuiMenuItem-root': {
              color: 'black', // Kolor tekstu w MenuItem
              backgroundColor: '#2196f300 !important', // Kolor tła MenuItem
            },
          }}
        >
          {languageOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default LanguageForInfo;
