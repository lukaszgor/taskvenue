import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import ManagerContractorsInvoices from './ManagerContractorsInvoices';
import ManagerContractorsContracts from './ManagerContractorsContracts';
import ManagerContractorsOthers from './ManagerContractorsOthers';
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

function ManagerContractorsDocuments() {
    const { t, i18n } = useTranslation();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <div>
            <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={t("Contracts")} {...a11yProps(0)} />
          <Tab label={t("Invoices")} {...a11yProps(1)} />
          <Tab label={t("Others")} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
       <ManagerContractorsContracts></ManagerContractorsContracts>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <ManagerContractorsInvoices></ManagerContractorsInvoices>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ManagerContractorsOthers></ManagerContractorsOthers>
      </TabPanel>
    </Box>
      </div>   
    );
  }
  
  export default ManagerContractorsDocuments;
