import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import WorkerNavBar from '../../Components/NavigationBar/WorkerNavBar';
import WorkerTaskBreadcrumbs from '../../Components/Breadcrumbs/Worker/WorkerTaskBreadcrumbs';
import WorkerBasicDataEdit from '../../Components/Worker/Tasks/WorkerBasicDataEdit';
import WorkerServices from '../../Components/Worker/Tasks/WorkerServices';
import WorkerVenue from '../../Components/Worker/Tasks/WorkerVenue';
import WorkerWorkingTime from '../../Components/Worker/Tasks/WorkerWorkingTime';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import IconButton from '@mui/material/IconButton';

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

function WorkerTaskDetails() {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleScrollRight = () => {
    if (value < 2) {
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
      <WorkerNavBar></WorkerNavBar>
      <WorkerTaskBreadcrumbs></WorkerTaskBreadcrumbs>
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
          <Tab label={t('Basic data')} {...a11yProps(0)} />
          <Tab label={t('Services')} {...a11yProps(1)} />
          <Tab label={t('Working time')} {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0} handleScrollLeft={handleScrollLeft} handleScrollRight={handleScrollRight}>
          <WorkerBasicDataEdit></WorkerBasicDataEdit>
        </TabPanel>
        <TabPanel value={value} index={1} handleScrollLeft={handleScrollLeft} handleScrollRight={handleScrollRight}>
          <WorkerServices></WorkerServices>
        </TabPanel>
        <TabPanel value={value} index={2} handleScrollLeft={handleScrollLeft} handleScrollRight={handleScrollRight}>
          <WorkerWorkingTime></WorkerWorkingTime>
        </TabPanel>
      </Box>
    </div>
  );
}

export default WorkerTaskDetails;
