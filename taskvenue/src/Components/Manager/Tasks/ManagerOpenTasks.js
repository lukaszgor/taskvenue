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
  InputLabel,
  Box,Divider
} from '@mui/material';
import supabase from '../../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FilterListIcon from '@mui/icons-material/FilterList';
import moment from 'moment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';

const ManagerOpenTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchNumber, setsearchNumber] = useState('');
  const [searchContractor, setsearchContractor] = useState('');
  const [searchUser, setsearchUser] = useState('');
  const [openFilter, setOpenFilter] = useState(true);
  const [inProgressFilter, setInProgressFilter] = useState(true);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [author, setAuthor] = useState('');


  const [copyDialogOpen, setCopyDialogOpen] = useState(false); // Dodajemy stan do kontrolowania widoczności dialogu
  const [copyTask, setCopyTask] = useState(null); // Dodajemy stan do przechowywania miejsca do skopiowania

  const handleCopyButton = (task) => {
    setCopyTask(task);
      setCopyDialogOpen(true);
  };

  const handleCopyConfirm = () => {
      if (copyTask) {
           handleCopyButtonClick(copyTask)
      }
      setCopyTask(null);
      setCopyDialogOpen(false);
  };

  const handleCopyCancel = () => {
    setCopyTask(null);
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
      .select('id_configuration,username')
      .eq('id', userId)
      .single();
    if (profileError) {
      console.log(profileError);
    } else if (profileData) {
      setIdConfiguration(profileData.id_configuration);
      setAuthor(profileData.username);
    }
  };

  useEffect(() => {
    if (idConfig) {
      fetchTasks(idConfig);
    }
  }, [idConfig, openFilter, inProgressFilter]);

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

    setFilteredTasks(filteredData);
  }, [tasks, searchName, searchNumber, searchContractor, searchUser, startDate, endDate]);

  useEffect(() => {
    const formattedDate = moment().format('YYYY-MM-DDTHH:mm');
    setCurrentDate(formattedDate);
  }, []); 


  const fetchTasks = async (idConfig) => {
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
                ),profiles (username)
            `)
      .eq('id_configuration', idConfig)
      .in('status', statusFilters);

    if (error) {
      console.error(error);
    } else {
      setTasks(data);
    }
  };

  const handleButtonClickTaskDetails = (task) => {
    navigate('/TaskDetails/' + task.id);
  };
  const handleCopyButtonClick = async (task) => {
    try {
      // Pobierz dane z istniejącego taska
      const { id, name,kickoffDate, deadline,id_configuration,description,asigned_user,settled,id_contractor,id_venue } = task;
  
      // Utwórz nowy task na podstawie danych z istniejącego taska
      const newTask = {
        name: name,
        id_configuration:id_configuration,
        description:description,
        asigned_user:asigned_user,
        settled:settled,
        id_contractor:id_contractor,
        id_venue:id_venue,
        kickoffDate: kickoffDate,
        deadline: deadline,
        createdDate:currentDate,
        status: 'open', // Ustaw status na 'open', ponieważ to jest nowy task
        author:author
      };

      const { data, error } = await supabase.from('tasks').insert([newTask]);
  
      if (error) {
        console.error(error);
      } else {
        // console.log('Kopiowanie taska zakończone sukcesem!', data);
        fetchTasks(idConfig);
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas kopiowania taska:', error.message);
    }
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
        task.profiles?.username.toLowerCase().includes(searchUser.toLowerCase())
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
    const formattedDate = moment(dateStr).format('YYYY-MM-DD');
    return formattedDate;
  };


  return (
    <div>
      <Button
        style={{ marginLeft: '20px', marginBottom: '20px' }}
        type="submit"
        variant="contained"
        color="primary"
        onClick={addNewTask}
        startIcon={<AddIcon />}
      >
      {t('Add')}
      </Button>
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
            <TextField
              label={t('Search by User')}
              variant="outlined"
              value={searchUser}
              onChange={(e) => setsearchUser(e.target.value)}
              style={{ marginBottom: '8px' }}
            />
          </div>
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
              fullWidth
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
              fullWidth
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
        {filteredTasks.sort((a, b) => b.id - a.id).map((task) => (
          <Grid key={task.id} item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
              <div  onClick={() => handleButtonClickTaskDetails(task)} style={{ cursor: 'pointer' }}>
                {/* <Typography variant="h6" gutterBottom>
                  ID: {task.id}
                </Typography> */}
                {/* <Divider variant="middle"/> */}
                <Divider textAlign='right'>{t('ID')} {task.id} </Divider>
                <Typography variant="h6"> <DescriptionIcon style={{  marginRight: '10px', fontSize: 'large' }} />
                {task.name}
                </Typography>
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
                  {t('User')} : {task.profiles?.username}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {t('Start of implementation')}: {formatDate(task.kickoffDate)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {t('Deadline')}: {formatDate(task.deadline)}
                </Typography>
                </div>
                <p></p>
           
                <Box display="inline-block" padding={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleButtonClickTaskDetails(task)}
                  startIcon={<EditIcon />}
                > {t('details')}
                </Button>
                </Box>
                <Box display="inline-block" padding={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleCopyButton(task)}
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
                        {t('Do you want to copy this task?')}
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

export default ManagerOpenTasks;
