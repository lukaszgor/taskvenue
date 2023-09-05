import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

  const languageOptions = [
    { value: 'en', label: '🇬🇧 English' },
    { value: 'pl', label: '🇵🇱 Polish' },
    { value: 'de', label: '🇩🇪 German' },
  ];

function Language() {
	const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("lng") || "en");

	const handleChangeLng = (lng) => {
		i18n.changeLanguage(lng);
		localStorage.setItem("lng", lng);
	};

return (

<FormControl variant="outlined" style={{ marginRight: '16px', width: 'auto' }}>
      <InputLabel id="language-select-label">Select Language</InputLabel>
      <Select
        labelId="language-select-label"
        value={selectedLanguage}
        onChange={(event) => {
          const selectedLng = event.target.value;
          handleChangeLng(selectedLng);
          setSelectedLanguage(selectedLng);
        }}
        label="Select Language"
      >
        {languageOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
      }
export default Language;
