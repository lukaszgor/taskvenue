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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import supabase from '../../../supabaseClient';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ManagerTaskAttachments from '../Attachments/ManagerTaskAttachments';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import sendEmail from '../../../Config/EmailSender';
import ManagerCopyTaskToUsers from './ManagerCopyTaskToUsers';


const DateTimeInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
`;

const ManagerBasicDataEdit = () => {
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
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();
  const [errorDate, setErrorDate] = useState(null);

  const [originalAssignedUserId, setOriginalAssignedUserId] = useState('');


  const [email, setEmail] = useState('lukasz.gg13@gmail.com');
  const [message, setMessage] = useState(t("If you are an employee then click to move to a specific task ")+"https://taskvenue.com/WorkerTaskDetails/"+id);
  const [subject, setSubject] = useState(t("You have been assigned to a task ")+id);

  const [openDialog, setOpenDialog] = useState(false);

  // Your existing functions and useEffect hooks...

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
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
      setOriginalAssignedUserId(data.asigned_user); 
      setCreatedDate(data.createdDate);
      setKickoff(data.kickoffDate);
      setDeadline(data.deadline);
      setSettled(data.settled);
      setStatus(data.status);
      setAuthor(data.author);
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
      .in('profile_type', ['manager', 'worker'])
      .is('isBlocked', null);

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
          status: status
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
        if (originalAssignedUserId !== selectedAsignedId) {
          // Została zmieniona wartość assigned_user, wyświetl alert
          sendEmail({
            toEmail: email, 
            subject: subject,
            message: message,
          });
        }
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
    const selectedUserProfile = profiles.find((profile) => profile.id === value);
    if (selectedUserProfile) {
      setEmail(selectedUserProfile.full_name);
    }
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
                  <MenuItem value="cancelled">{t('Cancelled')}</MenuItem>
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
                        type="datetime-local"
                        id="startDate"
                        value={kickoff}
                        onChange={handleKickoffChange}
                        fullWidth
                        margin="normal"
                        label={t('Start date')}
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
                        />
                    </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                  type="datetime-local"
                  id="Date"
                  value={createdDate} disabled 
                  fullWidth
                  label={t('Creation date')}
              />
            </Grid>
                    <Grid item xs={12} sm={6}>
              <TextField
                name="Author"
                label={t('Author')}
                value={author}
                fullWidth
                multiline
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
            <Grid item xs={12} sm={12}>
       
       <Accordion defaultExpanded >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('Attachments')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <ManagerTaskAttachments></ManagerTaskAttachments>
             </AccordionDetails>
      </Accordion>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
              <Button
                color="primary"
                style={{ minWidth: 'auto',margin:'1px'}}
                onClick={handleDialogOpen}
                >
            {t('Copy to users')}
                </Button>
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


            <Dialog
                  open={openDialog}
                  onClose={handleDialogClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{t('Copy to users')}</DialogTitle>
                  <DialogContent>
                    <ManagerCopyTaskToUsers></ManagerCopyTaskToUsers>
                  </DialogContent>
                  {/* <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                      {t('Cancel')}
                    </Button>
                  </DialogActions> */}
                </Dialog>

      </Container>
    </div>
  );
};

export default ManagerBasicDataEdit;
