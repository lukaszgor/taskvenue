import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import {TextField,Button,Grid,Container,Select,MenuItem,FormControl,FormControlLabel,Checkbox,InputLabel,Box} from '@mui/material';
import { useParams } from 'react-router-dom';
import supabase from '../../supabaseClient';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import moment from 'moment';
import ManagerTaskBreadcrumbs from '../../Components/Breadcrumbs/ManagerTaskBreadcrumbs';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


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

function AddNewTask() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [contractors, setContractors] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [status, setStatus] = useState('');
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
  const [currentDate, setCurrentDate] = useState('');
  const [errorDate, setErrorDate] = useState(null);

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
          asigned_user: selectedAsignedId,
          kickoffDate: kickoff,
          deadline: deadline,
          status: status,
          type: type,
          estimatedTime: estimatedTime,
          id_configuration:idConfig,
          id_contractor:selectedContractorId,
          createdDate:currentDate
        },
      ]).select('id').single();
    if (error) {
      console.log(error);
    }
    if (data) {
      const insertedRecordId = data.id; 
      navigate('/TaskDetails/' + insertedRecordId);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (new Date(deadline) < new Date(kickoff)) {
        // Ustaw błąd w stanie
        setErrorDate(t('Incorrect dates'));
    } else {
        // Jeśli dane są poprawne, zresetuj stan błędu i wykonaj aktualizację absencji
        setErrorDate(null);
        handleInsertTask();
    }
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
      .select('id_configuration')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.log(profileError);
    } else if (profileData) {
      setIdConfiguration(profileData.id_configuration);
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

  useEffect(() => {
    if (idConfig) {
      handleFetchContractors(idConfig);
      handleFetchUsers(idConfig);
      handleFetchTaskTypes(idConfig);
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
             <ManagerNavBar></ManagerNavBar>
             <ManagerTaskBreadcrumbs></ManagerTaskBreadcrumbs>
            <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={t("Basic data")} {...a11yProps(0)} />
          <Tab label={t("Venue")} {...a11yProps(1)} disabled />
          <Tab label={t("Services")} {...a11yProps(2)} disabled />
          <Tab label={t("Working time")} {...a11yProps(3)} disabled />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="Name"
                label={t('Name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
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
                  required
                >
                  <MenuItem value="open">{t('Open')}</MenuItem>
                  <MenuItem value="inProgress">{t('In progress')}</MenuItem>
                  <MenuItem value="completed">{t('Completed')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
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
                >
                  {contractors.map((contractor) => (
                    <MenuItem key={contractor.id} value={contractor.id}>
                      {contractor.nameOrCompanyName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="Estimated time"
                label={t('Estimated time')}
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                fullWidth
                type="number" 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <label>{t('Creation date')}</label>
            <DateTimeInput
            value={createdDate} 
                type="datetime-local"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
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
            <Grid item xs={12} sm={6}>
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
            </Grid>

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
      <p>Venue</p>
      </TabPanel>
      <TabPanel value={value} index={2} >
      <p>Services</p>
      </TabPanel>
      <TabPanel value={value} index={3} >
      <p>Working time</p>
      </TabPanel>
    </Box>

      </div>   
    );
  }
  
  export default AddNewTask;
