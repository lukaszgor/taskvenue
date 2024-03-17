import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Button, Chip, OutlinedInput,  Grid,Box,
    Container, } from '@mui/material';
import { createClient } from '@supabase/supabase-js';
import supabase from '../../../supabaseClient';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function ManagerCopyTaskToUsers() {
    const { t, i18n } = useTranslation();
    const { id } = useParams();
  const [usernames, setUsernames] = useState([]);
  const [selectedUsernames, setSelectedUsernames] = useState([]);
  const [userID, setUserID] = useState('');
  const [idConfig, setIdConfiguration] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [contractors, setContractors] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [status, setStatus] = useState('');
  const [isSettled, setSettled] = useState(null);
  const [selectedContractorId, setSelectedContractorId] = useState('');
  const [selectedAsignedId, setSelectedAsignedId] = useState('');
  const [open, setOpen] = useState(false);
  const [deadline, setDeadline] = useState('');
  const [kickoff, setKickoff] = useState('');
  const [id_venue, setIdVenue] = useState(null);
  const [createdDate, setCreatedDate] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');


  useEffect(() => {
    const formattedDate = moment().format('YYYY-MM-DDTHH:mm');
    setCurrentDate(formattedDate);
  }, []); 


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
    // Pobieranie danych z Supabase
    const fetchProfiles = async (idConfig) => {
      const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id_configuration', idConfig)
      .in('profile_type', ['manager', 'worker'])
      .is('isBlocked', null);
      
      if (error) {
        console.error('Błąd przy pobieraniu danych: ', error);
      } else {
        setProfiles(data);
      }
    };

    if (idConfig) {
        fetchProfiles(idConfig);
        handleFetchData(idConfig);
      }

  }, [idConfig]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedUsernames(typeof value === 'string' ? value.split(',') : value);
  };

  const handleCopy = async () => {
    // Pobierz dane aktualnego zadania do skopiowania
    const taskToCopy = {
      id: id,
      name: name,
      kickoffDate: kickoff,
      deadline: deadline,
      id_configuration: idConfig,
      description: description,
      asigned_user: selectedAsignedId, // To zostanie zmienione dla każdej kopii
      settled: isSettled,
      id_contractor: selectedContractorId,
      id_venue: id_venue, // Uzupełnij odpowiednio, jeśli jest potrzebne
    };

    // Dla każdego wybranego użytkownika stwórz kopię zadania
    for (const username of selectedUsernames) {
      const userToAssign = profiles.find(profile => profile.username === username);
      if (userToAssign) {
        const newTask = { ...taskToCopy, asigned_user: userToAssign.id };
        await handleCopyButtonClick(newTask);
      }
    }
  };


  const handleFetchData = async (idConfig) => {
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .eq('id', id)
      .eq('id_configuration', idConfig)
      .single();

    if (error) {
      // Handle error if needed
    
    }
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setSelectedContractorId(data.id_contractor);
      setSelectedAsignedId(data.asigned_user);
      setCreatedDate(data.createdDate);
      setKickoff(data.kickoffDate);
      setDeadline(data.deadline);
      setSettled(data.settled);
      setStatus(data.status);
      setAuthor(data.author);
      setIdVenue(data.id_venue);
    }
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
        navigate('/Tasks');
        
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas kopiowania taska:', error.message);
    }
  };
  
  return (
    <Container maxWidth="md">
     <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="chip-select-label">{t('Users')}</InputLabel>
        <Select
          labelId="chip-select-label"
          multiple
          value={selectedUsernames}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={t('Users')} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value}/>
              ))}
              </Box>
          )}
        >
          {profiles.map((profile) => (
            <MenuItem key={profile.id} value={profile.username}>
              {profile.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={12} sm={12}>
      <Box display="flex" justifyContent="flex-end">
      <Button variant="contained" onClick={handleCopy}>{t('Copy')} </Button>
      </Box>
      </Grid>
      </Grid>
    </Container>
  );
}

export default ManagerCopyTaskToUsers;
