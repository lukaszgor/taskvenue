import React, { useState, useEffect } from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox, 
  FormControlLabel
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import supabase from '../../supabaseClient';
import { useTranslation } from 'react-i18next';
import ManagerVenueBreadcrumbs from '../../Components/Breadcrumbs/ManagerVenueBreadcrumbs';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VenueHistory from '../../Components/Manager/Venue/VenueHistory';
import ManagerVenueAttachments from '../../Components/Manager/Attachments/ManagerVenueAttachments';
import Tooltip from '@mui/material/Tooltip';
import ConstantWorkingVenueSheet from '../../Components/Reports/ConstantWorkingVenueSheet';
import { Map, Marker, ZoomControl } from 'pigeon-maps';

const VenueDetalils = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [address, setAddress] = useState(''); // Default value
  const [description, setDescription] = useState('');
  const [contractors, setContractors] = useState([]);
  const [selectedContractorId, setSelectedContractorId] = useState('');
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false); 
  const navigate = useNavigate();
  const [center, setCenter] = useState([50.06503192508109, 19.943415777331357]);
  const [zoom, setZoom] = useState(18);

  const handleFetchData = async () => {
    const { data, error } = await supabase
      .from('venues')
      .select()
      .eq('id', id)
      .eq('id_configuration', idConfig)
      .single();

    if (error) {
      navigate('/home');
    }
    if (data) {
      setName(data.name);
      setAddress(data.GPS_location);
      setDescription(data.description);
      setSelectedContractorId(data.id_contractor);
      setIsChecked(data.archived === 1);

      const gpsCoords = data.GPS_location.split(',').map(coord => parseFloat(coord.trim()));
      if (gpsCoords.length === 2) {
        setCenter(gpsCoords);
      }
    }
  };

  const handleFetchContractors = async (idConfig) => {
    const { data, error } = await supabase
      .from('contractor')
      .select()
      .is('isDeleted', null)
      .eq('id_configuration', idConfig);

    if (error) {
      console.log(error);
    }
    if (data) {
      setContractors(data);
    }
  };

  const handleUpdateVenue = async () => {
    const { data, error } = await supabase
      .from('venues')
      .update([
        {
          name: name,
          GPS_location: address,
          description: description,
          id_contractor: selectedContractorId,
          archived: isChecked ? 1 : null,
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
   
    const geolocationPattern = /^[0-9.-]+\s*,\s*[0-9.-]+$/;
    if (!geolocationPattern.test(address)) {
      window.alert(t("Invalid geolocation data"));
    } else {
      handleUpdateVenue();
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
      handleFetchData();
    }
  }, [idConfig]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedContractorId(value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
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

  const handleMapClick = ({ latLng }) => {
    setAddress(`${latLng[0]}, ${latLng[1]}`);
  };

  return (
    <div>
      <ManagerNavBar></ManagerNavBar>
      <ManagerVenueBreadcrumbs></ManagerVenueBreadcrumbs>
      <p></p>
      <Container maxWidth="md">
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">
            {t('Venues details')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <Container maxWidth="md">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    label={t('name')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Tooltip title={t('Enter an address in the geolocation data form and add text information about the address in the description field.')} arrow>
                  <TextField
                    name="address"
                    label={t('address')}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                  />
                  </Tooltip>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="description"
                    label={t('description')}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    multiline
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="status-select-select-label">
                      {t('Select Contractor')}
                    </InputLabel>
                    <Select
                      labelId="contractor-select-label"
                      id="contractor-select"
                      value={selectedContractorId}
                      onChange={handleChange}
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
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label= {t('Archived')}
                  />
                </Grid>
                <Map 
              height={300} 
              center={center} 
              zoom={zoom}
              onClick={handleMapClick}
            >
              {address && <Marker anchor={[parseFloat(address.split(',')[0]), parseFloat(address.split(',')[1])]} />}
            </Map>

                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button color="primary" onClick={() => navigate('/AddNewTask')}>
                      {t("Add task")}
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

          </Container>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">
            {t('Attachments')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <ManagerVenueAttachments></ManagerVenueAttachments>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">
            {t('Tasks history')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <VenueHistory></VenueHistory>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">
            {t('Confirmation of location')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <ConstantWorkingVenueSheet></ConstantWorkingVenueSheet>
        </AccordionDetails>
      </Accordion>

      </Container>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleCloseAlert}
      >
        <Alert severity="success"> {t('Updated!')}!</Alert>
      </Snackbar>
    </div>
  );
};

export default VenueDetalils;
