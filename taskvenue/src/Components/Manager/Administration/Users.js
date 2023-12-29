import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import supabase from '../../../supabaseClient';
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";
import { TextField, Button,Checkbox, Grid, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Select, MenuItem, FormControlLabel, FormControl, InputLabel, Box, Card, CardContent, CardActions, Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,Divider,
  DialogContentText, } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';

function Users() {
    const { t, i18n } = useTranslation();
    const [fetchError, setFetchError] = useState(null);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const [userID, setUserID] = useState('');
    const [idConfig, setIdConfiguration] = useState('');
    const [foreignUserID, setForeignUserID] = useState('');
    const [foreignProfileType, setProfileForeignType] = useState('worker');

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [searchID, setsearchID] = useState('');
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(true);
    const [showActive, setShowActive] = useState(true);
    const [showBlocked, setShowBlocked] = useState(false);

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

    useEffect(() => {
        if (idConfig) {
            fetchUsers(idConfig);
        }
    }, [idConfig,openFilter]);


  
    useEffect(() => {
      let filteredData = user;
  
      if (searchName !== '') {
        filteredData = filteredData.filter((user) =>
          user.username.toLowerCase().includes(searchName.toLowerCase())
        );
      }
      if (searchID !== '') {
        filteredData = filteredData.filter((user) =>
          user.id.toLowerCase().includes(searchID.toLowerCase())
        );
      }
      if (searchEmail !== '') {
        filteredData = filteredData.filter((user) =>
          user.full_name.toLowerCase().includes(searchEmail.toLowerCase())
        );
        
      }
      if (!showBlocked) {
        filteredData = filteredData.filter((user) => user.isBlocked !== 1);
      }
      if (!showActive) {
        filteredData = filteredData.filter((user) => user.isBlocked !== null);
      }
    
      setFilteredUsers(filteredData);
    }, [user, searchName, searchID,searchEmail]);

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

    const fetchUsers = async (idConfig) => {
        const { data, error } = await supabase
            .from('profiles')
            .select()
            .eq('id_configuration', idConfig);
        if (error) {
            console.log(error)
            setUser(null)
            setFetchError(t("No users"))
        } if (data) {
            setUser(data)
            setFetchError(null)
        }
    }

    const UserDetails = (event, cellValues) => {
        navigate('/UserDetails/' + cellValues.row.id);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateUser();
        setForeignUserID('');
    };

    const updateUser = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .update({ 'profile_type': foreignProfileType, 'id_configuration': idConfig })
            .eq('id', foreignUserID);
        handleClickAlert();
        fetchUsers(idConfig);
    }

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

function formatProfileType(profileType) {
  switch (profileType) {
    case 'client':
      return t('Client');
    case 'worker':
      return t('Worker');
    case 'manager':
      return t('Manager');
    default:
      return profileType;
  }
}
const applyFilters = () => {
  let filteredData = user;

  if (searchName !== '') {
    filteredData = filteredData.filter((user) =>
      user.username.toLowerCase().includes(searchName.toLowerCase())
    );
  }
  if (searchID !== '') {
    filteredData = filteredData.filter((user) =>
      user.id.toString().includes(searchID)
    );
  }
  if (searchEmail !== '') {
    filteredData = filteredData.filter((user) =>
      user.full_name.toString().includes(searchEmail)
    );
  }
  if (!showBlocked) {
    filteredData = filteredData.filter((user) => user.isBlocked !== 1);
  }
  if (!showActive) {
    filteredData = filteredData.filter((user) => user.isBlocked !== null);
  }

  setFilteredUsers(filteredData);
  setIsFilterPopupOpen(false);
};

const handleOpenFilterChange = () => {
  setOpenFilter(!openFilter);
};


    return (
        <div>
            <Container maxWidth="md">
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" fontWeight="bold">{t('Add new user')}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography></Typography>
                    <form onSubmit={handleSubmit} >
                        <Container maxWidth="md">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="User ID"
                                        label={t("User ID")}
                                        onChange={(e) => setForeignUserID(e.target.value)}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="status-select-select-label">{t("profile type")}</InputLabel>
                                        <Select
                                            name="profile_type"
                                            label={t("profile type")}
                                            value={foreignProfileType}
                                            onChange={(e) => setProfileForeignType(e.target.value)}
                                            fullWidth
                                            required
                                        >
                                            <MenuItem value="manager">{t('Manager')}</MenuItem>
                                            <MenuItem value="worker">{t('Worker')}</MenuItem>
                                            <MenuItem value="client">{t('Client')}</MenuItem>
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
                                            disabled={!foreignUserID}
                                        >
                                            {t('Submit')}
                                        </Button>
                                    </Box>
                                    <Snackbar open={open}
                                        autoHideDuration={2000}
                                        onClose={handleCloseAlert}>
                                        <Alert severity="success"> {t("Updated!")}!</Alert>
                                    </Snackbar>
                                </Grid>
                            </Grid>
                        </Container>
                    </form>
                </AccordionDetails>
            </Accordion>
            
<p></p>
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
        <DialogTitle>{t('Filter Tasks')}</DialogTitle>
        <p></p>
        <DialogContent>
          <div style={{ marginBottom: '16px' }}>
            <TextField
              label={t('ID')}
              variant="outlined"
              value={searchID}
              onChange={(e) => setsearchID(e.target.value)}
              style={{ marginBottom: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <TextField
              label={t('Search by User')}
              variant="outlined"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              style={{ marginBottom: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <TextField
              label={t('Search by Email')}
              variant="outlined"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              style={{ marginBottom: '8px' }}
            />
          </div>
          <div>
  <FormControlLabel
    control={<Checkbox checked={showActive} onChange={(e) => setShowActive(e.target.checked)} />}
    label={t('Active')}
  />
  <FormControlLabel
    control={<Checkbox checked={showBlocked} onChange={(e) => setShowBlocked(e.target.checked)} />}
    label={t('Blocked')}
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

                    <Typography></Typography>
                    <Grid container spacing={3}>
                    {fetchError && (<p>{fetchError}</p>)}
                    {user && filteredUsers.sort((a, b) => b.id - a.id).map((user) => (
                                      <Grid item xs={12} sm={6} md={6} lg={6} key={user.id}>
                                    <Card>
                                        <CardContent>
                                        <div onClick={(event) => UserDetails(event, { row: user })} style={{ cursor: 'pointer' }}>
                                        <Divider textAlign="right">{t("Status")}: {user.isBlocked === 1 ? t("Blocked") : t("Active")}</Divider>
                                        {/* <Typography variant="h6">{user.id}</Typography> */}
                                            <Typography variant="h6">{user.username}</Typography>
                                            <Typography> {user.full_name}</Typography>
                                            <Typography>{t("Type")}: {formatProfileType(user.profile_type)}</Typography>
                                            </div>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                color="primary"
                                                onClick={(event) => UserDetails(event, { row: user })}
                                            >
                                                {t("details")}
                                            </Button>
                                        </CardActions>
                                    </Card>
                                    </Grid>
                                ))}
                      </Grid>
    

            </Container>
        </div>
    );
}

export default Users;
