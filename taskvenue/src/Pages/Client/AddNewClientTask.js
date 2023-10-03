import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import {TextField,Button,Grid,Container,Select,MenuItem,FormControl,FormControlLabel,Checkbox,InputLabel,Box} from '@mui/material';
import { useParams } from 'react-router-dom';
import supabase from '../../supabaseClient';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import moment from 'moment';
import ClientTasksBreadcrumbs from '../../Components/Breadcrumbs/Client/ClientTasksBreadcrumbs';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ClientNavBar from '../../Components/NavigationBar/ClientNavBar';


const DateTimeInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
`;
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

function AddNewClientTask() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [contractors, setContractors] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [status, setStatus] = useState('open');
  const [type, setType] = useState('');
  const [isSettled, setSettled] = useState(null);
  const [selectedContractorId, setSelectedContractorId] = useState('');
  const [selectedAsignedId, setSelectedAsignedId] = useState('');
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [deadline, setDeadline] = useState('');
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [kickoff, setKickoff] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [taskTypes, setTaskTypes] = useState([]);
  const [taskName, setTaskName] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [errorDate, setErrorDate] = useState(null);
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const formattedDate = moment().format('YYYY-MM-DDTHH:mm');
    setCurrentDate(formattedDate);
  }, []); 


  const handleFetchContractors = async (idConfig) => {
    const { data, error } = await supabase
      .from('contractor')
      .select()
      .eq('id_configuration', idConfig);

    if (error) {
      console.log(error);
    }
    if (data) {
      setContractors(data);
    }
  };

  const handleFetchUsers = async (idConfig) => {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id_configuration', idConfig)
      .in('profile_type', ['manager', 'worker']);

    if (error) {
      console.log(error);
    }
    if (data) {
      setProfiles(data);
    }
  };
 
  const handleInsertTask = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          name: name,
          description: description,
        //   asigned_user: selectedAsignedId,
        //   kickoffDate: kickoff,
        //   deadline: deadline,
          status: status,
        //   type: type,
        //   estimatedTime: estimatedTime,
          id_configuration:idConfig,
          id_contractor:selectedContractorId,
          createdDate:currentDate,
          author:author
        },
      ]).select('id').single();
    if (error) {
      console.log(error);
    }
    if (data) {
      const insertedRecordId = data.id; 
      navigate('/ClientTaskDetails/' + insertedRecordId);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
        setErrorDate(null);
        handleInsertTask();
    
};

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUserID(data.session.user.id);
        fetchData(data.session.user.id);
      }
    };
    checkSession();
  }, []);

  const fetchData = async (userId) => {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id_configuration,username,id_contractor')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.log(profileError);
    } else if (profileData) {
      setIdConfiguration(profileData.id_configuration);
      setAuthor(profileData.username);
      setSelectedContractorId(profileData.id_contractor);
    }
  };

  const handleFetchTaskTypes = async (idConfig) => {
    const { data, error } = await supabase
      .from('task_type_dictionary')
      .select('name')
      .eq('id_configuration', idConfig);

    if (error) {
      console.log(error);
    }
    if (data) {
      setTaskTypes(data);
    }
  };


  const handleFetchTaskName = async (idConfig) => {
    const { data, error } = await supabase
      .from('task_name_dictionary')
      .select('name')
      .eq('id_configuration', idConfig);

    if (error) {
      console.log(error);
    }
    if (data) {
      setTaskName(data);
    }
  };

  useEffect(() => {
    if (idConfig) {
      handleFetchContractors(idConfig);
      handleFetchUsers(idConfig);
      handleFetchTaskTypes(idConfig);
      handleFetchTaskName(idConfig);
    }
  }, [idConfig]);


  const handleChangeContractor = (event) => {
    const value = event.target.value;
    setSelectedContractorId(value);
  };

  const handleChangeAsignedUser = (event) => {
    const value = event.target.value;
    setSelectedAsignedId(value);
  };

  const handleCheckboxChange = (event) => {
    setSettled((prevState) => (prevState === null ? 1 : null));
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const handleKickoffChange = (event) => {
    setKickoff(event.target.value);
  };

    const [value, setValue] = useState(0);
    const navigate = useNavigate()
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <div>
             <ClientNavBar></ClientNavBar>
             <ClientTasksBreadcrumbs></ClientTasksBreadcrumbs>
            <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={t("Basic data")} {...a11yProps(0)} />
          <Tab label={t("Services")} {...a11yProps(1)} disabled />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                name="Name"
                label={t('Name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </Grid> */}
               <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="type-select-label">
                    {t('Name')}
                    </InputLabel>
                <Select
                   name="name"
                  label={t('Name')}
                  labelId="name-select-label"
                  id="name-select"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                >
                  {taskName.map((taskName) => (
                    <MenuItem key={taskName.name} value={taskName.name}>
                      {taskName.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="status-select-select-label">
                  {t('Status')}
                </InputLabel>
                <Select
                  name="Status"
                  label={t('Status')}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  fullWidth
                  disabled

                >
                  <MenuItem value="open">{t('Open')}</MenuItem>
                  <MenuItem value="inProgress">{t('In progress')}</MenuItem>
                  <MenuItem value="completed">{t('Completed')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="type-select-label">
                    {t('Type')}
                    </InputLabel>
                <Select
                   name="type"
                  label={t('Type')}
                  labelId="type-select-label"
                  id="type-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  fullWidth
                >
                  {taskTypes.map((taskType) => (
                    <MenuItem key={taskType.name} value={taskType.name}>
                      {taskType.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="contractor-select-select-label">
                  {t('Select Contractor')}
                </InputLabel>
                <Select
                  labelId="contractor-select-label"
                  id="contractor-select"
                  value={selectedContractorId}
                  onChange={handleChangeContractor}
                  label={t('Select Contractor')}
                  disabled
                >
                  {contractors.map((contractor) => (
                    <MenuItem key={contractor.id} value={contractor.id}>
                      {contractor.nameOrCompanyName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="asigned-select-label">
                  {t('Select Asigned user')}
                </InputLabel>
                <Select
                  labelId="asigned-select-label"
                  id="asigned-select"
                  value={selectedAsignedId}
                  onChange={handleChangeAsignedUser}
                  label={t('Select Asigned user')}
                >
                  {profiles.map((profile) => (
                    <MenuItem key={profile.id} value={profile.id}>
                      {profile.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <TextField
                name="Estimated time"
                label={t('Estimated time')}
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                fullWidth
                type="number" 
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
            <label>{t('Creation date')}</label>
            <DateTimeInput
            value={createdDate} 
                type="datetime-local"
                disabled
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <label>{t('Start of implementation')}</label>
              <DateTimeInput
                type="datetime-local"
                value={kickoff}
                onChange={handleKickoffChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>{t('Deadline')}</label>
              <DateTimeInput
                type="datetime-local"
                value={deadline}
                onChange={handleDeadlineChange}
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="Description"
                label={t('Description')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSettled !== null}
                    onChange={handleCheckboxChange}
                    color="primary"
                  />
                }
                label={t('Settled')}
              />
            </Grid> */}

            <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ minWidth: 'auto' }}
                >
                {t('Submit')}
                </Button>
            </Box>
            </Grid>
          </Grid>
        </form>
        <Snackbar open={!!errorDate} autoHideDuration={2000} onClose={() => setErrorDate(null)}>
                <Alert severity="error" onClose={() => setErrorDate(null)}>
                    {errorDate}
                </Alert>
            </Snackbar>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1} >
      <p>Services</p>
      </TabPanel>
    </Box>

      </div>   
    );
  }
  
  export default AddNewClientTask;
