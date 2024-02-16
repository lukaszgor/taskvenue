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
import ManagerAdministrationBreadcrumbs from '../../Components/Breadcrumbs/mainBreadcrumbs/ManagerAdministrationBreadcrumbs';
import TaskNameDictionary from '../../Components/Manager/Administration/TaskNameDictionary';

import GroupIcon from '@mui/icons-material/Group';
import PublicIcon from '@mui/icons-material/Public';
import SettingsIcon from '@mui/icons-material/Settings';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

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
            <Tab icon={<GroupIcon />} label={t("Users")} {...a11yProps(0)} />
            <Tab icon={<PublicIcon />} label={t("License")} {...a11yProps(1)} />
            <Tab icon={<SettingsIcon />} label={t("Settings")} {...a11yProps(2)} />
            <Tab icon={<CleaningServicesIcon />} label={t("Services")} {...a11yProps(3)} />
            <Tab icon={<NoteAddIcon />} label={t("Dictionaries")} {...a11yProps(4)} />
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
          <TaskNameDictionary></TaskNameDictionary>
        </TabPanel>
      </Box>
    </div>
  );
}

export default Administration;
