import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import supabase from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';

function SuperAdminConfigurationView() {
  const { t, i18n } = useTranslation();
  const [fetchError, setFetchError] = useState(null);
  const [config, setConfig] = useState(null);
  const navigate = useNavigate();
  const [userID, setUserID] = useState('');
  const [name, setName] = useState('');
  const [validityDate, setValidityDate] = useState('');

  // State for dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [configDialogId, setConfigDialogId] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUserID(data.session.user.id);
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    FetchConfigurations();
  }, []);

  const FetchConfigurations = async () => {
    const { data, error } = await supabase.from('configurations').select();
    if (error) {
      console.log(error);
      setConfig(null);
      setFetchError(t('No config'));
    }
    if (data) {
      setConfig(data);
      setFetchError(null);
    }
  };

  const ConfigDetails = (event, cellValues) => {
    setName(cellValues.row.name);
    setValidityDate(cellValues.row.validity_date);
    setConfigDialogId(cellValues.row.id);

    // Open the dialog
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    // Close the dialog
    setOpenDialog(false);
  };

  const handleEditAndCloseDialog = async () => {
    const formattedValidityDate = moment(validityDate).format('DD.MM.YYYY HH:mm');
    const editedConfig = {
      name,
      validity_date: formattedValidityDate,
    };

    // Update the configuration in the "configurations" table
    const { data, error } = await supabase
      .from('configurations')
      .update(editedConfig)
      .eq('id', configDialogId);

    if (error) {
      console.error(error);
      // Handle the error here
    } else {
      // Success, update the state and show a success alert
      handleClickAlert();
      FetchConfigurations();
      // Close the dialog
      setOpenDialog(false);
    }
  };

  // Alert configuration
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

  const columns = [
    { field: 'id', headerName: 'id_configuration', width: 300 },
    { field: 'validity_date', headerName: t('validity_date'), width: 250 },
    { field: 'name', headerName: t('name'), width: 250 },
    {
      field: 'Akcje',
      headerName: t('Action'),
      width: 600,
      renderCell: (cellValues) => {
        return (
          <Button
            color="primary"
            onClick={(event) => {
              ConfigDetails(event, cellValues);
            }}
          >
            {t('details')}
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">
            {t('Add new configuration')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          <form>
            <Container maxWidth="md">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label={t('Name')}
                    fullWidth
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>{t('Validity Date')}</label>
                  <TextField
                    type="datetime-local"
                    fullWidth
                    required
                    value={validityDate}
                    onChange={(e) => setValidityDate(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Container>
          </form>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight="bold">
            {t('Configurations')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography></Typography>
          {fetchError && <p>{fetchError}</p>}
          {config && (
            <div>
              <p> </p>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={config} columns={columns} pageSize={12} rowsPerPageOptions={[12]} />
              </div>
              <div></div>
            </div>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Dialog for editing configuration */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t('Edit Configuration')}</DialogTitle>
        <DialogContent>
          <Container maxWidth="md">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label={t('Name')}
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <label>{t('Validity Date')}</label>
                <TextField
                  type="datetime-local"
                  fullWidth
                  required
                  value={validityDate}
                  onChange={(e) => setValidityDate(e.target.value)}
                />
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            {t('Cancel')}
          </Button>
          <Button onClick={handleEditAndCloseDialog} color="primary">
            {t('Save')}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseAlert}>
        <Alert severity="success">{t('Updated!')}</Alert>
      </Snackbar>
    </div>
  );
}

export default SuperAdminConfigurationView;
