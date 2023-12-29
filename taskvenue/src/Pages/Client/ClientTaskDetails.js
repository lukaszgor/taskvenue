import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import IconButton from '@mui/material/IconButton';
import ClientNavBar from '../../Components/NavigationBar/ClientNavBar'
import ClientTaskBreadcrumbs from '../../Components/Breadcrumbs/Client/ClientTaskBreadcrumbs';
import ClientBasicDataEdit from '../../Components/Client/Tasks/ClientBasicDataEdit';
import ClientTaskServices from '../../Components/Client/Tasks/ClientTaskServices';
import ClientTaskVenue from '../../Components/Client/Tasks/ClientTaskVenue';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DescriptionIcon from '@mui/icons-material/Description';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ClientTaskDetails() {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleScrollRight = () => {
    if (value < 1) {
      setValue(value + 1);
    }
  };

  const handleScrollLeft = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };
  return (
    <div>
      <ClientNavBar></ClientNavBar>
      <ClientTaskBreadcrumbs></ClientTaskBreadcrumbs>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          allowScrollButtonsMobile 
          variant="scrollable"
          scrollButtons
          sx={{ display: 'flex' }}
        >
          <Tab icon={<DescriptionIcon />} label={t('Basic data')} {...a11yProps(0)} />
          <Tab icon={<CleaningServicesIcon />} label={t('Services')} {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0} handleScrollLeft={handleScrollLeft} handleScrollRight={handleScrollRight}>
          <ClientBasicDataEdit></ClientBasicDataEdit>
        </TabPanel>
        <TabPanel value={value} index={1} handleScrollLeft={handleScrollLeft} handleScrollRight={handleScrollRight}>
          <ClientTaskServices></ClientTaskServices>
        </TabPanel>
      </Box>
    </div>
  );
}

export default ClientTaskDetails;
