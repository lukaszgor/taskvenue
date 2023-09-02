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
import Contractors from '../../Components/Manager/Administration/Contractors';
import TaskTypeDictionary from '../../Components/Manager/Administration/TaskTypeDictionary';
import ManagerAdministrationBreadcrumbs from '../../Components/Breadcrumbs/mainBreadcrumbs/ManagerAdministrationBreadcrumbs';

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
          <Typography component={'span'} variant={'body2'}>
            {children}
          </Typography>
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
          {value > 0 && (
            <button
              onClick={handleScrollLeft}
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                zIndex: 1,
              }}
            >
              &#8592; {/* Strzałka w lewo */}
            </button>
          )}
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label={t("Users")} {...a11yProps(0)} />
            <Tab label={t("License")} {...a11yProps(1)} />
            <Tab label={t("Settings")} {...a11yProps(2)} />
            <Tab label={t("Services")} {...a11yProps(3)} />
            <Tab label={t("Contractors")} {...a11yProps(4)} />
            <Tab label={t("Task type")} {...a11yProps(5)} />
          </Tabs>
          {value < 5 && (
            <button
              onClick={handleScrollRight}
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                zIndex: 1,
              }}
            >
              &#8594; {/* Strzałka w prawo */}
            </button>
          )}
        </Box>
        <TabPanel value={value} index={0}>
          <Users></Users>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <License></License>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Settings></Settings>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ServicesDictionary></ServicesDictionary>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Contractors></Contractors>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <TaskTypeDictionary></TaskTypeDictionary>
        </TabPanel>
      </Box>
    </div>
  );
}

export default Administration;
