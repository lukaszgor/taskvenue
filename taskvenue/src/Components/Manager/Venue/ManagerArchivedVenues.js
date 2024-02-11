import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    DialogContentText,
    Switch,
    Box,Divider
} from '@mui/material';
import supabase from '../../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RoomIcon from '@mui/icons-material/Room';


const ManagerArchivedVenues = () => {
    const [venues, setVenues] = useState([]);
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchNumber, setsearchNumber] = useState('');
    const [searchContractor, setsearchContractor] = useState('');
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    

    const [copyDialogOpen, setCopyDialogOpen] = useState(false); // Dodajemy stan do kontrolowania widoczności dialogu
    const [copyVenue, setCopyVenue] = useState(null); // Dodajemy stan do przechowywania miejsca do skopiowania

    const handleCopyButton = (venue) => {
        setCopyVenue(venue);
        setCopyDialogOpen(true);
    };

    const handleCopyConfirm = () => {
        if (copyVenue) {
            handleCopyButtonClick(copyVenue)
        }
        setCopyVenue(null);
        setCopyDialogOpen(false);
    };

    const handleCopyCancel = () => {
        setCopyVenue(null);
        setCopyDialogOpen(false);
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
            fetchVenues(idConfig);
        }
    }, [idConfig]);

    useEffect(() => {
        let filteredData = venues;

        if (searchName !== '') {
            filteredData = filteredData.filter((venue) =>
                venue.name.toLowerCase().includes(searchName.toLowerCase())
            );
        }
        if (searchNumber !== '') {
            filteredData = filteredData.filter((venue) =>
                venue.id.toString().includes(searchNumber)
            );
        }
        if (searchContractor !== '') {
            filteredData = filteredData.filter((venue) =>
                venue.contractor?.nameOrCompanyName
                    .toLowerCase()
                    .includes(searchContractor.toLowerCase())
            );
        }

        // Dodaj filtr ineffective


        setFilteredVenues(filteredData);
    }, [venues, searchName, searchNumber, searchContractor]);

    const fetchVenues = async (idConfiguration) => {
        const { data, error } = await supabase
            .from('venues')
            .select(`*,
                contractor (
                    nameOrCompanyName
                )
            `)
            .eq('id_configuration', idConfig)
            .not('archived', 'is', null);

        if (error) {
            console.error(error);
        } else {
            setVenues(data);
        }
    };

    const handleButtonClickVenueDetails = (venue) => {
        navigate('/VenueDetalils/' + venue.id);
    };

    const addNewVenue = () => {
        navigate('/AddNewVenue');
    };

    const applyFilters = () => {
        // Domyślnie ustawiamy showIneffective na true, aby wyświetlić wszystkie miejsca
        let filteredData = venues;
        if (searchName !== '') {
            filteredData = filteredData.filter((venue) =>
                venue.name.toLowerCase().includes(searchName.toLowerCase())
            );
        }
        if (searchNumber !== '') {
            filteredData = filteredData.filter((venue) =>
                venue.id.toString().includes(searchNumber)
            );
        }
        if (searchContractor !== '') {
            filteredData = filteredData.filter((venue) =>
                venue.contractor?.nameOrCompanyName
                    .toLowerCase()
                    .includes(searchContractor.toLowerCase())
            );
        }

        setFilteredVenues(filteredData);
        setIsFilterPopupOpen(false);
    };

    const handleCopyButtonClick = async (venue) => {
        try {
          // Pobierz dane z istniejącego taska
          const { id,name,id_configuration,description,id_contractor,GPS_location } = venue;
      
          // Utwórz nowy task na podstawie danych z istniejącego taska
          const newVenue = {
            name: name,
            id_configuration:id_configuration,
            description:description,
            GPS_location:GPS_location,
            id_contractor:id_contractor,
          };
    
          const { data, error } = await supabase.from('venues').insert([newVenue]);
      
          if (error) {
            console.error(error);
          } else {
            // console.log('Kopiowanie taska zakończone sukcesem!', data);
            fetchVenues(idConfig);
          }
        } catch (error) {
          console.error('Wystąpił błąd podczas kopiowania taska:', error.message);
        }
      };

    return (
        <div>
            <p></p>
            {/* <Button
                style={{ marginLeft: '20px', marginBottom: '20px' }}
                type="submit"
                variant="contained"
                color="primary"
                onClick={addNewVenue}
                startIcon={<AddIcon />}
            >
                {t('Add')}
            </Button> */}
            <Button
                style={{ marginLeft: '20px', marginBottom: '20px' }}
                variant="contained"
                color="primary"
                onClick={() => setIsFilterPopupOpen(true)}
                startIcon={<FilterListIcon />}
            >
                {t('Open Filter')}
            </Button>
            <Dialog open={isFilterPopupOpen} onClose={() => setIsFilterPopupOpen(false)}>
                <DialogTitle>{t('Filter Venues')}</DialogTitle>
                <DialogContent>
                    <p></p>
                    <div style={{ marginBottom: '16px' }}>
                        <TextField
                            label={t('Search by number')}
                            variant="outlined"
                            value={searchNumber}
                            onChange={(e) => setsearchNumber(e.target.value)}
                            style={{ marginBottom: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <TextField
                            label={t('Search by name')}
                            variant="outlined"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            style={{ marginBottom: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <TextField
                            label={t('Search by contractor')}
                            variant="outlined"
                            value={searchContractor}
                            onChange={(e) => setsearchContractor(e.target.value)}
                            style={{ marginBottom: '8px' }}
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={applyFilters}
                        style={{ marginTop: '16px' }}
                    >
                        {t('Apply Filters')}
                    </Button>
                </DialogContent>
            </Dialog>

            <Grid container spacing={3}>
                {filteredVenues.sort((a, b) => b.id - a.id).map((venue) => (
                    <Grid key={venue.id} item xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardContent>
                            <div  onClick={() => handleButtonClickVenueDetails(venue)} style={{ cursor: 'pointer' }}>
                            <Divider textAlign='right'>{t('ID')} {venue.id} </Divider>
                                {/* <Typography variant="h6" gutterBottom>
                                    ID: {venue.id}
                                </Typography> */}
                <Typography variant="h6"> <RoomIcon style={{  marginRight: '10px', fontSize: 'large' }} />
                {venue.name}
                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {t('Description')} : {venue.description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {t('Contractor')} : {venue.contractor?.nameOrCompanyName}
                                </Typography>
                                </div>
                                <p></p>
                                <Box display="inline-block" padding={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleButtonClickVenueDetails(venue)}
                                    startIcon={<EditIcon />}
                                >
                                    {t('details')}
                                </Button>
                                </Box>
                                <Box display="inline-block" padding={1}>
                                <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleCopyButton(venue)}
                                startIcon={<ContentCopyIcon />}
                                > {t('Copy')} 
                                </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog
                open={copyDialogOpen}
                onClose={handleCopyCancel}
                aria-labelledby="copy-dialog-title"
                aria-describedby="copy-dialog-description"
            >
                <DialogTitle id="copy-dialog-title">{t('Copy')}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="copy-dialog-description">
                        {t('Do you want to copy this venue?')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCopyCancel} color="primary">
                        {t('Cancel')}
                    </Button>
                    <Button onClick={handleCopyConfirm} color="primary" variant="contained">
                        {t('Copy')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManagerArchivedVenues;
