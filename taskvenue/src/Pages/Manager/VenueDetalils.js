import React, { useState, useEffect } from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { TextField, Button, Grid, Container, Typography, Select, MenuItem, FormControl,InputLabel,Box,Accordion, AccordionSummary, AccordionDetails, } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useParams } from "react-router-dom";
import supabase from '../../supabaseClient';
import { useTranslation } from "react-i18next";
import ManagerVenueBreadcrumbs from '../../Components/Breadcrumbs/ManagerVenueBreadcrumbs';
import { useNavigate } from "react-router-dom"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const VenueDetalils = () => {
    const { t, i18n } = useTranslation();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [contractors, setContractors] = useState([]);
    const [selectedContractorId, setSelectedContractorId] = useState('');
    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleFetchData = async () => {
        const { data, error } = await supabase
            .from('venues')
            .select()
            .eq('id', id)
            .eq('id_configuration', idConfig)
            .single();

        if (error) {
            // Handle error if needed
            navigate('/home')
        }
        if (data) {
            setName(data.name)
            setAddress(data.GPS_location)
            setDescription(data.description)
            setSelectedContractorId(data.id_contractor);
        }
    };

    const handleFetchContractors = async (idConfig) => {
        const { data, error } = await supabase
            .from('contractor')
            .select()
            .is('isDeleted', null) 
            .eq('id_configuration', idConfig);

        if (error) {
            console.log(error)
        }
        if (data) {
            setContractors(data)
        }
    };

    const handleUpdateVenue = async () => {
        const { data, error } = await supabase
            .from('venues')
            .update([{ name: name, GPS_location: address, description: description, id_contractor: selectedContractorId }])
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
        handleUpdateVenue();
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
    }

    useEffect(() => {
        if (idConfig) {
            handleFetchContractors(idConfig);
            handleFetchData();
        }
    }, [idConfig]);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedContractorId(value);
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
            <ManagerVenueBreadcrumbs></ManagerVenueBreadcrumbs>
            {/* <Container maxWidth="md"> */}
                    <p></p>
                    <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" fontWeight="bold">{t('Venues details')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <form onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="name"
                                label={t("name")}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="address"
                                label={t("address")}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="description"
                                label={t("description")}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
                                multiline
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
            <InputLabel id="status-select-select-label">{t("Select Contractor")}</InputLabel>
                                <Select
                                    labelId="contractor-select-label"
                                    id="contractor-select"
                                    value={selectedContractorId}
                                    onChange={handleChange}
                                    label={t("Select Contractor")}
                                >
                                    {contractors.map((contractor) => (
                                        <MenuItem key={contractor.id} value={contractor.id}>
                                            {contractor.nameOrCompanyName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

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
        </AccordionDetails>
      </Accordion>


      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">{t('History')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>

        </AccordionDetails>
      </Accordion>
  
                <Snackbar open={open}
                    autoHideDuration={2000}
                    onClose={handleCloseAlert}>
                    <Alert severity="success"> {t("Updated!")}!</Alert>
                </Snackbar>
            {/* </Container> */}
        </div>
    );
};

export default VenueDetalils;
