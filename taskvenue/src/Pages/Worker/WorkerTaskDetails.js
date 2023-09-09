import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import WorkerNavBar from '../../Components/NavigationBar/WorkerNavBar';
import { useTranslation } from "react-i18next";
import WorkerTaskBreadcrumbs from '../../Components/Breadcrumbs/Worker/WorkerTaskBreadcrumbs';
import WorkerBasicDataEdit from '../../Components/Worker/Tasks/WorkerBasicDataEdit';
import WorkerServices from '../../Components/Worker/Tasks/WorkerServices';
import WorkerVenue from '../../Components/Worker/Tasks/WorkerVenue';
import WorkerWorkingTime from '../../Components/Worker/Tasks/WorkerWorkingTime';


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

function WorkerTaskDetails() {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleScrollRight = () => {
    if (value < 3) {
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
              &#8592;
            </button>
          )}
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label={t("Basic data")} {...a11yProps(0)} />
            <Tab label={t("Venue")} {...a11yProps(1)} />
            <Tab label={t("Services")} {...a11yProps(2)} />
            <Tab label={t("Working time")} {...a11yProps(3)} />
          </Tabs>
          {value < 3 && (
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
              &#8594; 
            </button>
          )}
        </Box>
        <TabPanel value={value} index={0}>
          <WorkerBasicDataEdit></WorkerBasicDataEdit>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WorkerVenue></WorkerVenue>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <WorkerServices></WorkerServices>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <WorkerWorkingTime></WorkerWorkingTime>
        </TabPanel>
      </Box>
    </div>
  );
}

export default WorkerTaskDetails;
