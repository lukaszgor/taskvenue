import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { useTranslation } from "react-i18next";
import License from '../../Components/Manager/Administration/License';
import ServicesDictionary from '../../Components/Manager/Administration/ServicesDictionary';
import Settings from '../../Components/Manager/Administration/Settings';
import Users from '../../Components/Manager/Administration/Users';
import TaskTypeDictionary from '../../Components/Manager/Administration/TaskTypeDictionary';
import ManagerAdministrationBreadcrumbs from '../../Components/Breadcrumbs/mainBreadcrumbs/ManagerAdministrationBreadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import IconButton from '@mui/material/IconButton';
import TaskNameDictionary from '../../Components/Manager/Administration/TaskNameDictionary';

function TabPanel(props) {
  const { children, value, index, handleScrollLeft, handleScrollRight } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ position: 'relative' }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {value > 0 && (
            <IconButton
              onClick={handleScrollLeft}
              style={{
                position: 'fixed',
                left: 0,
                top: '35%',
                transform: 'translateY(-50%)',
                zIndex: 1,
              }}
            >
              <NavigateBeforeIcon />
            </IconButton>
          )}
          {value < 5 && (
            <IconButton
              onClick={handleScrollRight}
              style={{
                position: 'fixed',
                right: 0,
                top: '35%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                // backgroundColor: 'blue', // Kolor niebieski
                // color: 'white', // Kolor tekstu na przycisku
              }}
            >
              <NavigateNextIcon />
            </IconButton>
          )}
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  handleScrollLeft: PropTypes.func.isRequired,
  handleScrollRight: PropTypes.func.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function Administration() {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleScrollRight = () => {
    if (value < 5) {
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
      <ManagerNavBar></ManagerNavBar>
      <ManagerAdministrationBreadcrumbs></ManagerAdministrationBreadcrumbs>
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
            <Tab label={t("Users")} {...a11yProps(0)} />
            <Tab label={t("License")} {...a11yProps(1)} />
            <Tab label={t("Settings")} {...a11yProps(2)} />
            <Tab label={t("Services")} {...a11yProps(3)} />
            <Tab label={t("Dictionaries")} {...a11yProps(4)} />
          </Tabs>
        <TabPanel value={value} index={0}  handleScrollLeft={handleScrollLeft} handleScrollRight={handleScrollRight}>
          <Users></Users>
        </TabPanel>
        <TabPanel value={value} index={1}  handleScrollLeft={handleScrollLeft} handleScrollRight={handleScrollRight}>
          <License></License>
        </TabPanel>
        <TabPanel value={value} index={2}  handleScrollLeft={handleScrollLeft} handleScrollRight={handleScrollRight}>
          <Settings></Settings>
        </TabPanel>
        <TabPanel value={value} index={3}  handleScrollLeft={handleScrollLeft} handleScrollRight={handleScrollRight}>
          <ServicesDictionary></ServicesDictionary>
        </TabPanel>
        <TabPanel value={value} index={4}  handleScrollLeft={handleScrollLeft} handleScrollRight={handleScrollRight}>
          <TaskTypeDictionary></TaskTypeDictionary>
          <TaskNameDictionary></TaskNameDictionary>
        </TabPanel>
      </Box>
    </div>
  );
}

export default Administration;
