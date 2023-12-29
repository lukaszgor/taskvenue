import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import supabase from '../../../supabaseClient';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';

function ServicesDictionary() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState(0);
  const [unit, setUnit] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [service, setService] = useState(null);

  // Dialog state
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedService, setSelectedService] = useState(null);


  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');

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
      fetchServices(idConfig);
    }
  }, [idConfig]);

  const handleSubmit = (event) => {
    event.preventDefault();
    insertService();
    setName('');
    setDescription('');
    setCost(0);
    setUnit('');
  };

  //insert
  const insertService = async () => {
    const { data, error } = await supabase
      .from('service_dictionary')
      .insert([
        {
          id_configuration: idConfig,
          name: name,
          cost: cost,
          description: description,
          unit: unit,
        },
      ]);
    handleClickAlert();
    fetchServices(idConfig);
    if (error) {
      console.log(error);
    }
    if (data) {
    }
  };
  const handleDeleteClick = async (service) => {
    await supabase
      .from('service_dictionary')
      .delete()
      .eq('id', service.id);

      fetchServices(idConfig);

    handleClickAlert();
  };
  //download data
  const fetchServices = async (idConfig) => {
    const { data, error } = await supabase
      .from('service_dictionary')
      .select()
      .eq('id_configuration', idConfig)
    if (error) {
      console.log(error);
      setService(null);
      setFetchError(t('No products'));
    }
    if (data) {
      setService(data);
      setFetchError(null);
    }
  };

  //alert configuration
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

  // Dialog functions
  const handleEditClick = (service) => {
    setSelectedService(service);
    setName(service.name);
    setDescription(service.description);
    setCost(service.cost);
    setUnit(service.unit);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSaveEdit = async () => {
    await supabase
      .from('service_dictionary')
      .update({
        name,
        cost,
        description,
        unit,
      })
      .eq('id', selectedService.id);

      fetchServices(idConfig);

    setOpenEditDialog(false);

    handleClickAlert();
  };

  return (
    <div>
      <div>
        <p></p>
        <Container maxWidth="md">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">
                {t('Add')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography></Typography>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Container maxWidth="md">
                  <Typography variant="h4" align="center" gutterBottom>
                    <p></p>
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label={t('Name')}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        style={{ marginRight: '10px' }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label={t('Description')}
                        value={description}
                        onChange={(event) =>
                          setDescription(event.target.value)
                        }
                        style={{ marginRight: '10px' }}
                        fullWidth
                        multiline
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label={t('Cost')}
                        value={cost}
                        onChange={(event) => setCost(event.target.value)}
                        style={{ marginRight: '10px' }}
                        type="number"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label={t('Unit')}
                        value={unit}
                        onChange={(event) => setUnit(event.target.value)}
                        style={{ marginRight: '10px' }}
                        fullWidth
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
                  <div></div>
                  <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleCloseAlert}
                  >
                    <Alert severity="success"> {t('Updated!')}</Alert>
                  </Snackbar>
                </Container>
              </form>
            </AccordionDetails>
          </Accordion>

          <div>
            <p></p>
            <Grid container spacing={3}>
              {service &&
                service.sort((a, b) => b.id - a.id).map((item) => {
                  return (
                    <Grid item xs={12} sm={6} md={6} lg={6} key={item.id}>
                      <Card>
                        <CardContent>
                        <div onClick={() => handleEditClick(item)} style={{ cursor: 'pointer' }}>
                          <Typography variant="h6">{item.name}</Typography>
                          <Typography>{item.description}</Typography>
                          <Typography>
                            {t('Cost')}: {item.cost}
                          </Typography>
                          <Typography>
                            {t('Unit')}: {item.unit}
                          </Typography>
                          </div>
                          <p></p>
                          <Box display="inline-block" marginRight={1}>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleEditClick(item)}
                          >
                            {t('Edit')}
                          </Button>
                          </Box>
                          <Box display="inline-block" marginRight={1}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleDeleteClick(item)}
                          >
                            {t('Delete')}
                          </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
        </Container>
      </div>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>{t('Edit')}</DialogTitle>
        <DialogContent>
        <p></p>
          <TextField
            label={t('Name')}
            value={name}
            onChange={(event) => setName(event.target.value)}
            style={{ marginBottom: '10px' }}
            fullWidth
          />
          <TextField
            label={t('Description')}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            style={{ marginBottom: '10px' }}
            fullWidth
            multiline
          />
          <TextField
            label={t('Cost')}
            value={cost}
            onChange={(event) => setCost(event.target.value)}
            style={{ marginBottom: '10px' }}
            type="number"
            fullWidth
          />
          <TextField
            label={t('Unit')}
            value={unit}
            onChange={(event) => setUnit(event.target.value)}
            style={{ marginBottom: '10px' }}
            fullWidth
          />

        </DialogContent>
        <DialogActions >
          <Button onClick={handleCloseEditDialog} color="primary">
            {t('Cancel')}
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            {t('Save')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ServicesDictionary;
