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
  InputLabel,
  Switch,
} from '@mui/material';
import supabase from '../../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FilterListIcon from '@mui/icons-material/FilterList';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';

const ClientClosedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchNumber, setSearchNumber] = useState('');
  const [searchContractor, setSearchContractor] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [idContractor, setIdContractor] = useState();

  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  const [showCompleted, setShowCompleted] = useState(true);
  const [showCancelled, setShowCancelled] = useState(false);

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
      .select('id_configuration,id_contractor')
      .eq('id', userId)
      .single();
    if (profileError) {
      console.log(profileError);
    } else if (profileData) {
      setIdConfiguration(profileData.id_configuration);
      setIdContractor(profileData.id_contractor)
    }
  };

  useEffect(() => {
    if (idConfig) {
        if (idContractor){
            fetchTasks(idConfig,idContractor);
        }
    }
  }, [idConfig,idContractor]);

  useEffect(() => {
    let filteredData = tasks;

    if (searchName !== '') {
      filteredData = filteredData.filter((task) =>
        task.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (searchNumber !== '') {
      filteredData = filteredData.filter((task) =>
        task.id.toString().includes(searchNumber)
      );
    }
    if (searchContractor !== '') {
      filteredData = filteredData.filter((task) =>
        task.contractor?.nameOrCompanyName
          .toLowerCase()
          .includes(searchContractor.toLowerCase())
      );
    }
    if (searchUser !== '') {
      filteredData = filteredData.filter((task) =>
        task.profiles?.username
          .toLowerCase()
          .includes(searchUser.toLowerCase())
      );
    }

    if (startDate !== '' && endDate !== '') {
      filteredData = filteredData.filter((task) => {
        const taskDate = new Date(task.createdDate);
        const startFilterDate = new Date(startDate);
        const endFilterDate = new Date(endDate);

        return taskDate >= startFilterDate && taskDate <= endFilterDate;
      });
    }

    if (!showCompleted) {
      filteredData = filteredData.filter((task) => task.status !== 'completed');
    }

    if (!showCancelled) {
      filteredData = filteredData.filter((task) => task.status !== 'cancelled');
    }

    setFilteredTasks(filteredData);
  }, [tasks, searchName, searchNumber, searchContractor, searchUser, startDate, endDate, showCompleted, showCancelled]);

  const fetchTasks = async (idConfig,idContractor) => {
    const { data, error } = await supabase
      .from('tasks')
      .select(`*,
            contractor (
                nameOrCompanyName
            ),profiles (username)
            `)
      .eq('id_configuration', idConfig)
      .eq('id_contractor', idContractor)
      .in('status', ['completed', 'cancelled']); // Wybierz tylko statusy 'completed' i 'cancelled'

    if (error) {
      console.error(error);
    } else {
      setTasks(data);
    }
  };

  const handleButtonClickTaskDetails = (task) => {
    navigate('/TaskDetails/' + task.id);
  };

  const addNewTask = () => {
    navigate('/AddNewTask');
  };

  const applyFilters = () => {
    let filteredData = tasks;

    if (searchName !== '') {
      filteredData = filteredData.filter((task) =>
        task.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (searchNumber !== '') {
      filteredData = filteredData.filter((task) =>
        task.id.toString().includes(searchNumber)
      );
    }
    if (searchContractor !== '') {
      filteredData = filteredData.filter((task) =>
        task.contractor?.nameOrCompanyName
          .toLowerCase()
          .includes(searchContractor.toLowerCase())
      );
    }
    if (searchUser !== '') {
      filteredData = filteredData.filter((task) =>
        task.profiles?.username
          .toLowerCase()
          .includes(searchUser.toLowerCase())
      );
    }

    if (startDate !== '' && endDate !== '') {
      filteredData = filteredData.filter((task) => {
        const taskDate = new Date(task.createdDate);
        const startFilterDate = new Date(startDate);
        const endFilterDate = new Date(endDate);

        return taskDate >= startFilterDate && taskDate <= endFilterDate;
      });
    }

    if (!showCompleted) {
      filteredData = filteredData.filter((task) => task.status !== 'completed');
    }

    if (!showCancelled) {
      filteredData = filteredData.filter((task) => task.status !== 'cancelled');
    }

    setFilteredTasks(filteredData);
    setIsFilterPopupOpen(false);
  };

  const formatDate = (dateStr) => {
    const formattedDate = moment(dateStr).format('DD.MM.YY HH:mm');
    return formattedDate;
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
        {t('Open Filter')}
      </Button>

      <Dialog open={isFilterPopupOpen} onClose={() => setIsFilterPopupOpen(false)}>
        <DialogTitle>{t('Filter Tasks')}</DialogTitle>
        <p></p>
        <DialogContent>
          <div style={{ marginBottom: '16px' }}>
            <TextField
              label={t('Search by number')}
              variant="outlined"
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
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
          {/* <div style={{ marginBottom: '16px' }}>
            <TextField
              label={t('Search by contractor')}
              variant="outlined"
              value={searchContractor}
              onChange={(e) => setSearchContractor(e.target.value)}
              style={{ marginBottom: '8px' }}
            />
          </div> */}
          {/* <div style={{ marginBottom: '16px' }}>
            <TextField
              label={t('Search by User')}
              variant="outlined"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              style={{ marginBottom: '8px' }}
            />
          </div> */}
          <div style={{ marginBottom: '16px' }}>
            <InputLabel id="Start Date-select-select-label">
              {t('Start Date')}
            </InputLabel>
            <TextField
              variant="outlined"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ marginBottom: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <InputLabel id="End Date-select-select-label">
              {t('End Date')}
            </InputLabel>
            <TextField
              variant="outlined"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ marginBottom: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <InputLabel>{t('Status')}</InputLabel>
            <div>
              <Switch
                checked={showCompleted}
                onChange={() => setShowCompleted(!showCompleted)}
                color="primary"
                name="showCompleted"
                inputProps={{ 'aria-label': 'Show Completed' }}
              />
              <span>{t('Completed')}</span>
            </div>
            <div>
              <Switch
                checked={showCancelled}
                onChange={() => setShowCancelled(!showCancelled)}
                color="primary"
                name="showCancelled"
                inputProps={{ 'aria-label': 'Show Cancelled' }}
              />
              <span>{t('Cancelled')}</span>
            </div>
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
        {filteredTasks.map((task) => (
          <Grid key={task.id} item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ID: {task.id}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {t('Name')} : {task.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {t('Status')} :{' '}
                  {task.status === 'completed'
                    ? t('Completed')
                    : task.status === 'cancelled'
                    ? t('Cancelled')
                    : ''}
                </Typography>
                {/* <Typography variant="body2" color="textSecondary">
                  {t('Contractor')} : {task.contractor?.nameOrCompanyName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {t('User')} : {task.profiles?.username}
                </Typography> */}
                <Typography variant="body2" color="textSecondary">
                  {t('Start of implementation')}: {formatDate(task.kickoffDate)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {t('Deadline')}: {formatDate(task.deadline)}
                </Typography>
                <p></p>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleButtonClickTaskDetails(task)}
                  startIcon={<EditIcon />}
                >
                  {t('details')}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ClientClosedTasks;
