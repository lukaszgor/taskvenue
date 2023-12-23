
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import ManagerActiveVenues from '../../Components/Manager/Venue/ManagerActiveVenues';
import ManagerVenuesBreadcrumbs from '../../Components/Breadcrumbs/mainBreadcrumbs/ManagerVenuesBreadcrumbs';
import ManagerArchivedVenues from '../../Components/Manager/Venue/ManagerArchivedVenues';

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

function VenueDashboard() {
    const { t, i18n } = useTranslation();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <div>
<ManagerNavBar></ManagerNavBar>
<ManagerVenuesBreadcrumbs></ManagerVenuesBreadcrumbs>
            <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={t("Active")} {...a11yProps(0)} />
          <Tab label={t("Archived")} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
<ManagerActiveVenues></ManagerActiveVenues>
      </TabPanel>
      <TabPanel value={value} index={1}>
<ManagerArchivedVenues></ManagerArchivedVenues>
      </TabPanel>
    </Box>
      </div>   
    );
  }
  
  export default VenueDashboard;
