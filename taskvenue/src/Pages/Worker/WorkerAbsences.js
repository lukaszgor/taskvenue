import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import WorkerNavBar from '../../Components/NavigationBar/WorkerNavBar';
import { useTranslation } from "react-i18next";
import WorkerAbsencesBreadcrumbs from '../../Components/Breadcrumbs/Worker/WorkerAbsencesBreadcrumbs';
import WorkerOpenAbsences from '../../Components/Worker/Absences/WorkerOpenAbsences';
import WorkerApprovedAndRejectedAbsences from '../../Components/Worker/Absences/WorkerApprovedAndRejectedAbsences';


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

function WorkerAbsences() {
    const { t, i18n } = useTranslation();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <div>
             <WorkerNavBar></WorkerNavBar>
             <WorkerAbsencesBreadcrumbs></WorkerAbsencesBreadcrumbs>
            <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={t("Open")} {...a11yProps(0)} />
          <Tab label={t("Closed")} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <WorkerOpenAbsences></WorkerOpenAbsences>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WorkerApprovedAndRejectedAbsences></WorkerApprovedAndRejectedAbsences>
      </TabPanel>
    </Box>
      </div>   
    );
  }
  
  export default WorkerAbsences;
