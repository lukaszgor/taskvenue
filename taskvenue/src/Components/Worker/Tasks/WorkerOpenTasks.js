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
  Switch,} from '@mui/material';
import supabase from '../../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FilterListIcon from '@mui/icons-material/FilterList';
import moment from 'moment';

const WorkerOpenTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchNumber, setsearchNumber] = useState('');
  const [searchContractor, setsearchContractor] = useState('');
  const [openFilter, setOpenFilter] = useState(true);
  const [inProgressFilter, setInProgressFilter] = useState(true);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

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
  };

  useEffect(() => {
    if (idConfig) {
      fetchTasks(idConfig,userID);
    }
  }, [idConfig, openFilter, inProgressFilter,userID]);

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

    setFilteredTasks(filteredData);
  }, [tasks, searchName, searchNumber, searchContractor]);

  const fetchTasks = async (idConfig,userID) => {
    const statusFilters = [];
    if (openFilter) {
      statusFilters.push('open');
    }
    if (inProgressFilter) {
      statusFilters.push('inProgress');
    }

    const { data, error } = await supabase
      .from('tasks')
      .select(`*,
                contractor (
                    nameOrCompanyName
                )
            `)
      .eq('id_configuration', idConfig)
      .in('status', statusFilters)
      .eq('asigned_user', userID);

    if (error) {
      console.error(error);
    } else {
      setTasks(data);
    }
  };

  const handleButtonClickTaskDetails = (task) => {
    navigate('/WorkerTaskDetails/' + task.id);
  };

//   const addNewTask = () => {
//     navigate('/AddNewTask');
//   };

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

    setFilteredTasks(filteredData);
    setIsFilterPopupOpen(false);
  };

  const handleOpenFilterChange = () => {
    setOpenFilter(!openFilter);
  };

  const handleInProgressFilterChange = () => {
    setInProgressFilter(!inProgressFilter);
  };

  const formatDate = (dateStr) => {
    const formattedDate = moment(dateStr).format('DD.MM.YY HH:mm');
    return formattedDate;
  }

  return (
    <div>
      {/* <Button
        style={{ marginLeft: '20px', marginBottom: '20px' }}
        type="submit"
        variant="contained"
        color="primary"
        onClick={addNewTask}
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
        <DialogTitle>{t('Filter Tasks')}</DialogTitle>
        <p></p>
        <DialogContent>
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
          <div style={{ marginBottom: '16px' }}>
            <div>
              <Typography>{t('Open')}</Typography>
              <Switch
                color="warning" 
                checked={openFilter}
                onChange={handleOpenFilterChange}
              />
            </div>
            <div>
              <Typography>{t('In progress')}</Typography>
              <Switch
                color="secondary"
                checked={inProgressFilter}
                onChange={handleInProgressFilterChange}
              />
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
                {/* <Typography variant="body2" color="textSecondary">
                  {t('Description')} : {task.description}
                </Typography> */}
                <Typography variant="body2" color="textSecondary">
                  {t('Status')} :{' '}
                  {task.status === 'open'
                    ? t('Open')
                    : task.status === 'inProgress'
                    ? t('In progress')
                    : ''}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {t('Contractor')} : {task.contractor?.nameOrCompanyName}
                </Typography>
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

export default WorkerOpenTasks;
