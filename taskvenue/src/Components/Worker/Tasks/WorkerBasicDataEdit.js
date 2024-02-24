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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import supabase from '../../../supabaseClient';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import WorkerVenue from './WorkerVenue';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ManagerTaskAttachments from '../../Manager/Attachments/ManagerTaskAttachments';
import WorkerTasksWorkingSheet from './WorkerTasksWorkingSheet';

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
  const [isSettled, setSettled] = useState(null);
  const [selectedContractorId, setSelectedContractorId] = useState('');
  const [selectedAsignedId, setSelectedAsignedId] = useState('');
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [open, setOpen] = useState(false);
  const [deadline, setDeadline] = useState('');
  const [kickoff, setKickoff] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const navigate = useNavigate();
  const [errorDate, setErrorDate] = useState(null);

  const [openChangeStatusDialog, setOpenChangeStatusDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);

  const handleOpenChangeStatusDialog = () => {
    setSelectedStatus(status);
    setOpenChangeStatusDialog(true);
  };
  const handleCloseChangeStatusDialog = () => {
    setOpenChangeStatusDialog(false);
  
  };

  const handleChangeStatus = () => {
    setStatus(selectedStatus);
    handleCloseChangeStatusDialog();
    handleUpdateStatus(selectedStatus);
    handleUpdateTask();
  
  };

  const handleUpdateStatus = async (selectedStatus) => {
    const { data, error } = await supabase
      .from('tasks')
      .update([
        {
          status: selectedStatus,
        },
      ])
      .eq('id', id);
    if (error) {
      console.log(error);
    }
    if (data) {
      handleClickAlert();
    }
  };

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
      setSettled(data.settled);
      setStatus(data.status);
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
          // status: status, // status aktualnie zmieniany jest w innej funkcji
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



  useEffect(() => {
    if (idConfig) {
      handleFetchContractors(idConfig);
      handleFetchUsers(idConfig);
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

        <Grid item xs={12}>
  <Box display="flex" justifyContent="flex-end">
   <Button
      variant="contained"
      color="primary"
      style={{ minWidth: 'auto', marginRight: '16px' }}
      onClick={handleOpenChangeStatusDialog}
      startIcon={<SaveIcon />}
      disabled={status === 'completed' ||  status === 'cancelled'}
    >
      {t('Submit')}
    </Button>

  </Box>
</Grid>
<p></p>
<Grid item xs={12}>
             <Accordion defaultExpanded >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" fontWeight="bold">{t('Confirmation of location')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
             <WorkerTasksWorkingSheet></WorkerTasksWorkingSheet>
             </AccordionDetails>
      </Accordion>
             </Grid>

<p></p>
             <Grid item xs={12}>
             <Accordion defaultExpanded >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Venue')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
             <WorkerVenue></WorkerVenue>
             </AccordionDetails>
      </Accordion>
             </Grid>
<p></p>
        <Grid item xs={12} sm={12}>
          <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Basic data')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
                  disabled
                  // disabled={status === 'completed'}
                >
                  <MenuItem value="open">{t('Open')}</MenuItem>
                  <MenuItem value="inProgress">{t('In progress')}</MenuItem>
                  <MenuItem value="completed">{t('Completed')}</MenuItem>
                  <MenuItem value="cancelled">{t('Cancelled')}</MenuItem>
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
                <TextField
                  type="datetime-local"
                  id="Date"
                  value={createdDate} disabled 
                  fullWidth
                  label={t('Creation date')}
              />
            </Grid> */}
                        <Grid item xs={12} sm={6}>
                        <TextField
                        type="datetime-local"
                        id="startDate"
                        value={kickoff}
                        onChange={handleKickoffChange}
                        fullWidth
                        margin="normal"
                        label={t('Start date')}
                        disabled={status === 'completed' ||  status === 'cancelled'}
                        focused
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        type="datetime-local"
                        id="startDate"
                        value={deadline}
                        onChange={handleDeadlineChange}
                        fullWidth
                        margin="normal"
                        label={t('Deadline')}
                        focused
                        disabled={status === 'completed' ||  status === 'cancelled'}
                        />
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
            <Grid item xs={12} sm={6}>
              <TextField
                name="Description"
                label={t('Description')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                disabled={status === 'completed' ||  status === 'cancelled'}
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
            </Grid>
             </AccordionDetails>
      </Accordion>
      </Grid>
   <p></p>          
             <Grid item xs={12} sm={12}>
       <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Attachments')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <ManagerTaskAttachments></ManagerTaskAttachments>
             </AccordionDetails>
      </Accordion>
            </Grid>
            <p></p>
      <Dialog
        open={openChangeStatusDialog}
        onClose={handleCloseChangeStatusDialog}
      >
        <DialogTitle>{t('Change Status')}</DialogTitle>
        <DialogContent>
        <Typography variant="h6" style={{ fontSize: '14px' }}>{t('Changing the status of the task to complete will not allow you to edit it later.')}</Typography>
        <RadioGroup
  aria-label="status"
  name="status"
  value={selectedStatus}
  onChange={(e) => setSelectedStatus(e.target.value)}
>
  <FormControlLabel
    value="open"
    control={<Radio />}
    label={t('Open')}
  />
  <FormControlLabel
    value="inProgress"
    control={<Radio />}
    label={t('In progress')}
  />
  <FormControlLabel
    value="completed"
    control={<Radio />}
    label={t('Completed')}
  />
    <FormControlLabel
    value="cancelled"
    control={<Radio />}
    label={t('Cancelled')}
  />
</RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangeStatusDialog} color="primary">
            {t('Cancel')}
          </Button>
          <Button onClick={handleChangeStatus} color="primary" >
            {t('Submit')}
          </Button>
      
        </DialogActions>
      </Dialog>
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
