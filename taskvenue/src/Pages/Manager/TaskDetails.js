import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { useTranslation } from "react-i18next";
import ManagerBasicDataEdit from '../../Components/Manager/Tasks/ManagerBasicDataEdit';
import ManagerServicesEdit from '../../Components/Manager/Tasks/ManagerServicesEdit';
import ManagerVenueEdit from '../../Components/Manager/Tasks/ManagerVenueEdit';
import ManagerWorkingTimeEdit from '../../Components/Manager/Tasks/ManagerWorkingTimeEdit';
import ManagerTaskBreadcrumbs from '../../Components/Breadcrumbs/ManagerTaskBreadcrumbs';


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

function TaskDetails() {
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
      <ManagerNavBar></ManagerNavBar>
      <ManagerTaskBreadcrumbs></ManagerTaskBreadcrumbs>
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
          <ManagerBasicDataEdit></ManagerBasicDataEdit>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ManagerVenueEdit></ManagerVenueEdit>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ManagerServicesEdit></ManagerServicesEdit>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ManagerWorkingTimeEdit></ManagerWorkingTimeEdit>
        </TabPanel>
      </Box>
    </div>
  );
}

export default TaskDetails;
