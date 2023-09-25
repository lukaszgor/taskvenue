import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Box,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import supabase from '../../../supabaseClient';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DateTimeInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
`;

const WorkerBasicDataEdit = () => {
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
  const [open, setOpen] = useState(false);
  const [deadline, setDeadline] = useState('');
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [kickoff, setKickoff] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [taskTypes, setTaskTypes] = useState([]);
  const navigate = useNavigate();
  const [errorDate, setErrorDate] = useState(null);

  const handleFetchData = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .eq('id', id)
      .eq('id_configuration', idConfig)
      .single();

    if (error) {
      // Handle error if needed
      navigate('/home');
    }
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setSelectedContractorId(data.id_contractor);
      setSelectedAsignedId(data.asigned_user);
      setCreatedDate(data.createdDate);
      setKickoff(data.kickoffDate);
      setDeadline(data.deadline);
      setEstimatedTime(data.estimatedTime);
      setSettled(data.settled);
      setStatus(data.status);
      setType(data.type);
    }
  };

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

  const handleUpdateTask = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .update([
        {
          name: name,
          description: description,
          asigned_user: selectedAsignedId,
          createdDate: createdDate,
          kickoffDate: kickoff,
          deadline: deadline,
          status: status,
          type: type,
          estimatedTime: estimatedTime,
        },
      ])
      .eq('id', id);
    handleClickAlert();
    if (error) {
      console.log(error);
    }
    if (data) {
      handleClickAlert();
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
        handleUpdateTask();
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
      handleFetchData();
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

  const handleClickAlert = () => {
    setOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleCheckboxChange = (event) => {
    setSettled((prevState) => (prevState === null ? 1 : null));
  };

  const handleKickoffChange = (event) => {
    setKickoff(event.target.value); // Przechowuje datę i godzinę w formacie YYYY-MM-DDTHH:MM
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value); // Przechowuje datę i godzinę w formacie YYYY-MM-DDTHH:MM
  };

  return (
    <div>
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
                disabled
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
                  disabled={status === 'completed'}
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
                  disabled
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
              <FormControl fullWidth disabled>
                <InputLabel id="contractor-select-select-label">
                  {t('Select Contractor')}
                </InputLabel>
                <Select
                  labelId="contractor-select-label"
                  id="contractor-select"
                  value={selectedContractorId}
                  disabled
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
            {/* <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled>
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
              <label>{t('Creation date')}</label>
              <DateTimeInput type="datetime-local" value={createdDate} disabled />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <label>{t('Start of implementation')}</label>
              <DateTimeInput
                type="datetime-local"
                value={kickoff}
                onChange={handleKickoffChange}
                disabled={status === 'completed'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>{t('Deadline')}</label>
              <DateTimeInput
                type="datetime-local"
                value={deadline}
                onChange={handleDeadlineChange}
                disabled={status === 'completed'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="Estimated time"
                label={t('Estimated time')}
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                fullWidth
                type="number"
                disabled
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
                disabled={status === 'completed'}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <FormControlLabel disabled
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
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleCloseAlert}
        >
          <Alert severity="success">{t('Updated!')}</Alert>
        </Snackbar>
        <Snackbar open={!!errorDate} autoHideDuration={2000} onClose={() => setErrorDate(null)}>
                <Alert severity="error" onClose={() => setErrorDate(null)}>
                    {errorDate}
                </Alert>
            </Snackbar>
      </Container>
    </div>
  );
};

export default WorkerBasicDataEdit;
