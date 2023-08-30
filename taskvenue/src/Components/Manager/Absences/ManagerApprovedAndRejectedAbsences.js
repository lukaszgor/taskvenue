import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import supabase from '../../../supabaseClient';
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";
import FilterListIcon from '@mui/icons-material/FilterList'; 

const ManagerApprovedAndRejectedAbsences = () => {
    const [absences, setAbsences] = useState([]);
    const [filtredAbsences, setFiltredAbsences] = useState([]);
    const [searchNumber, setsearchNumber] = useState('');
    const [searchUser, setsearchUser] = useState('');
    const { t, i18n } = useTranslation();
    const navigate = useNavigate()

    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    
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

    useEffect(() => {
        if (idConfig) {
            fetchAbsences(idConfig);
        }
    }, [idConfig]);

    useEffect(() => {
        let filteredData = absences;

        if (searchNumber !== '') {
            filteredData = filteredData.filter((absence) => absence.id.toString().includes(searchNumber));
        }
        if (searchUser !== '') {
            filteredData = filteredData.filter((absence) => absence.profiles?.username.toLowerCase().includes(searchUser.toLowerCase()));
        }

        setFiltredAbsences(filteredData);
    }, [absences,searchNumber, searchUser]);

    const fetchAbsences = async (idConfig) => {
        const { data, error } = await supabase
            .from('absences')
            .select(`*,
            profiles!absences_id_owner_user_fkey(
                    username
                )
            ` )
            .eq('id_configuration', idConfig)
            .in('status', ['approved', 'rejected']);

        if (error) {
            console.error(error);
        } else {
            setAbsences(data);
        }
    };

    const handleButtonClickAbsenceDetails = (absence) => {
        navigate('/Absence/' + absence.id)
    };


    const applyFilters = () => {
        let filteredData = absences;

        if (searchNumber !== '') {
            filteredData = filteredData.filter((absence) => absence.id.toString().includes(searchNumber));
        }
        if (searchUser !== '') {
            filteredData = filteredData.filter((absence) => absence.profiles?.username.toLowerCase().includes(searchUser.toLowerCase()));
        }

        setFiltredAbsences(filteredData);
        setIsFilterPopupOpen(false);
    };

    return (
        <div>
            <Button
                style={{ marginLeft: '20px', marginBottom: '20px' }}
                variant="contained"
                color="primary"
                onClick={() => setIsFilterPopupOpen(true)}
                startIcon={<FilterListIcon />}
            >
                {t("Open Filter")}
            </Button>

            <Dialog open={isFilterPopupOpen} onClose={() => setIsFilterPopupOpen(false)}>
                <DialogTitle>{t("Filter Tasks")}</DialogTitle>
     <p></p>
                <DialogContent>
                    <div style={{ marginBottom: '16px' }}>
                        <TextField
                            label={t("Search by number")}
                            variant="outlined"
                            value={searchNumber}
                            onChange={(e) => setsearchNumber(e.target.value)}
                            style={{ marginBottom: '8px' }} 
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <TextField
                            label={t("Search by User")}
                            variant="outlined"
                            value={searchUser}
                            onChange={(e) => setsearchUser(e.target.value)}
                            style={{ marginBottom: '8px' }} 
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={applyFilters}
                        style={{ marginTop: '16px' }} 
                    >
                        {t("Apply Filters")}
                    </Button>
                </DialogContent>
            </Dialog>

            <Grid container spacing={3}>
                {filtredAbsences.map((absence) => (
                    <Grid key={absence.id} item xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    ID: {absence.id}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {t("User")} : {absence.profiles?.username}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" >
                                    {t("Absence")} : {{ vacation: t("Vacation"),sickleave: t("Sick leave")}[absence.typeOfAbsence]}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {t("Start date")} : {absence.kickoffDate}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {t("End date")} : {absence.finishDate}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {t("Status")} : {{ open: t("Open"),approved: t("Approved"),rejected:t("Rejected")}[absence.status]}
                                </Typography>
                                <p></p>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleButtonClickAbsenceDetails(absence)}
                                >
                                    {t("details")}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ManagerApprovedAndRejectedAbsences;
