import React, { useState, useEffect } from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { TextField, Button, Grid, Container, Typography, Select, MenuItem, FormControl,InputLabel,Box } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useParams } from "react-router-dom";
import supabase from '../../supabaseClient';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import ManagerAbsenceBreadcrumbs from '../../Components/Breadcrumbs/ManagerAbsenceBreadcrumbs';
import Divider from '@mui/material/Divider';

const DateTimeInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
`;

const AbsenceDetails = () => {
    const { t, i18n } = useTranslation();
    const { id } = useParams();
    const [profiles, setProfiles] = useState([]);
    const [id_owner_user, setId_ownerUser] = useState('');
    const [description, setDescription] = useState('');
    const [kickoffDate, setKickoffDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [typeOfAbsence, setTypeOfAbsence] = useState('');
    const [status, setStatus] = useState('');
    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');
    const [open, setOpen] = useState(false);
    const [errorDate, setErrorDate] = useState(null);


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
    }

    const handleFetchData = async (idConfig) => {

        const { data, error } = await supabase
            .from('absences')
            .select()
            .eq('id', id)
            .eq('id_configuration', idConfig)
            .single();
        if (error) {
            // Handle error if needed
        }
        if (data) {
            setId_ownerUser(data.id_owner_user)
            setDescription(data.description)
            setKickoffDate(data.kickoffDate);
            setFinishDate(data.finishDate)
            setTypeOfAbsence(data.typeOfAbsence)
            setStatus(data.status);
        }
    };

    const handleFetchProfiles = async (idConfig) => {
        const { data, error } = await supabase
            .from('profiles')
            .select()
            .eq('id_configuration', idConfig)
            .in('profile_type', ['manager', 'worker'])
            .is('isBlocked', null);

        if (error) {
            console.log(error)
        }
        if (data) {
            setProfiles(data)
        }
    };

    const handleUpdateAbsences = async () => {
        const { data, error } = await supabase
            .from('absences')
            .update([{ description: description, status: status, kickoffDate: kickoffDate, finishDate: finishDate }])
            .eq('id', id);
            handleClickAlert();
        if (error) {
            console.log(error)
        }
        if (data) {
            handleClickAlert();
  
        }
    };

   
    const handleSubmit = (event) => {
        event.preventDefault();
        if (new Date(finishDate) < new Date(kickoffDate)) {
            // Ustaw błąd w stanie
            setErrorDate(t('Incorrect dates'));
        } else {
            // Jeśli dane są poprawne, zresetuj stan błędu i wykonaj aktualizację absencji
            setErrorDate(null);
            handleUpdateAbsences();
        }
    };

    useEffect(() => {
        if (idConfig) {
            handleFetchProfiles(idConfig);
            handleFetchData(idConfig);
        }
    }, [idConfig]);

    const handleChange = (event) => {
        const value = event.target.value;
        setId_ownerUser(value);
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

    return (
        <div>
            <ManagerNavBar></ManagerNavBar>
 <ManagerAbsenceBreadcrumbs></ManagerAbsenceBreadcrumbs>
            <Container maxWidth="md">
            <Divider textAlign="left">{t('Absence')}</Divider>
                    <p></p>
                <form onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        type="datetime-local"
                        id="startDate"
                        value={kickoffDate}
                        onChange={(e) => setKickoffDate(e.target.value)}
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
                        value={finishDate}
                        onChange={(e) => setFinishDate(e.target.value)}
                        fullWidth
                        margin="normal"
                        label={t('End date')}
                        focused
                        />
                    </Grid>
                            <Grid item xs={12} sm={6}>
                            <FormControl fullWidth disabled>
                                <InputLabel id="status-select-select-label">
                                {t('Absence')}
                                </InputLabel>
                                <Select
                                name="typeOfAbsence"
                                label={t('Absence')}
                                value={typeOfAbsence}
                                onChange={(e) => setTypeOfAbsence(e.target.value)}
                                fullWidth
                                required
                                >
                                <MenuItem value="sickleave">{t('Sick leave')}</MenuItem>
                                <MenuItem value="vacation">{t('Vacation')}</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                      
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="description"
                                label={t("description")}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
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
                                <MenuItem value="approved">{t('Approved')}</MenuItem>
                                <MenuItem value="rejected">{t('Rejected')}</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                        <Grid item xs={12} sm={6}>
                        {profiles.length > 0 && (
                            <FormControl fullWidth disabled>
                                <InputLabel id="status-select-select-label">
                                    {t("User")}
                                </InputLabel>
                                <Select
                                    labelId="user-select-label"
                                    id="user-select"
                                    value={id_owner_user}
                                    onChange={handleChange}
                                    label={t("User")}
                                >
                                    {profiles.map((data) => (
                                        <MenuItem key={data.id} value={data.id}>
                                            {data.username}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

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
                <Snackbar open={open}
                    autoHideDuration={2000}
                    onClose={handleCloseAlert}>
                    <Alert severity="success"> {t("Updated!")}</Alert>
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

export default AbsenceDetails;
