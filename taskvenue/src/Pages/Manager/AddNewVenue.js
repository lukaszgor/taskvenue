import React, { useState, useEffect } from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import supabase from '../../supabaseClient';
import { useTranslation } from "react-i18next";
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
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert
} from '@mui/material';
import ManagerVenueBreadcrumbs from '../../Components/Breadcrumbs/ManagerVenueBreadcrumbs';
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Map, Marker, ZoomControl } from 'pigeon-maps';

const AddNewVenue = () => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [contractors, setContractors] = useState([]);
  const [selectedContractorId, setSelectedContractorId] = useState(null);
  const navigate = useNavigate();
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [center, setCenter] = useState([50.06503192508109, 19.943415777331357]);
  const [zoom, setZoom] = useState(18);

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
      FetchContractors(idConfig)
    }
  }, [idConfig]);

  const FetchContractors = async (idConfig) => {
    const { data, error } = await supabase
      .from('contractor')
      .select()
      .eq('id_configuration', idConfig);
    if (error) {
      console.log(error)
    } if (data) {
      setContractors(data)
    }
  }

  const handleChange = (event) => {
    setSelectedContractorId(event.target.value);
  };

  const insertVenue = async () => {
    const { data, error } = await supabase
      .from('venues')
      .insert([{ id_configuration: idConfig, name: name, GPS_location: address, description: description, who_created: userID, id_contractor: selectedContractorId }])
    handleClickAlert()
    navigate('/VenueDashboard');
    if (error) {
      console.log(error)
    } if (data) {

    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const geolocationPattern = /^[0-9.-]+\s*,\s*[0-9.-]+$/;
    if (!geolocationPattern.test(address)) {
      window.alert(t("Invalid geolocation data"));
    } else {
      insertVenue();
    }
  };

  const handleMapClick = ({ latLng }) => {
    setAddress(`${latLng[0]}, ${latLng[1]}`);
  };

  // Get user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
      }, (error) => {
        console.log(error);
      });
    }
  }, []);

  const [open, setOpen] = useState(null);

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
      <ManagerNavBar />
      <ManagerVenueBreadcrumbs />
      <Container maxWidth="md">
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight="bold">
              {t('Add')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={handleSubmit}>
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
                  <Tooltip title={t('Enter an address in the geolocation data form and add text information about the address in the description field.')} arrow>
                    <TextField
                      name="GPS"
                      label={t("GPS")}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      fullWidth
                      disabled
                    />
                  </Tooltip>
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
                    <InputLabel id="contractor-select-label">
                      {t('Select Contractor')}
                    </InputLabel>
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
                <Grid item xs={12} sm={12}>
                  <Map
                    height={300}
                    center={center}
                    zoom={zoom}
                    onClick={handleMapClick}
                  >
                    {address && <Marker anchor={[parseFloat(address.split(',')[0]), parseFloat(address.split(',')[1])]} />}
                    <ZoomControl />
                  </Map>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      {t("Submit")}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <Snackbar open={open}
                autoHideDuration={2000}
                onClose={handleCloseAlert}>
                <Alert severity="success"> {t("Updated!")}!</Alert>
              </Snackbar>
            </form>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
};

export default AddNewVenue;
