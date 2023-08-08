import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, TextField } from '@mui/material';
import supabase from '../../../supabaseClient';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";

const ManagerOpenTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchNumber, setsearchNumber] = useState('');
    const [searchContractor, setsearchContractor] = useState('');
    const { t, i18n } = useTranslation();
    const navigate = useNavigate()

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
        }
     useEffect(() => {
            if (idConfig) {
                fetchTasks(idConfig);
            }
          }, [idConfig]);

// Filtruj dane na podstawie nazwy i statusu
useEffect(() => {
    let filteredData = tasks;

    if (searchName !== '') {
      filteredData = filteredData.filter((task) => task.name.toLowerCase().includes(searchName.toLowerCase()));
    }
    if (searchNumber !== '') {
        filteredData = filteredData.filter((task) => task.id.toString().includes(searchNumber));
      }
      if (searchContractor !== '') {
        filteredData = filteredData.filter((task) => task.contractor?.nameOrCompanyName.toLowerCase().includes(searchContractor.toLowerCase()));
      }

      setFilteredTasks(filteredData);
  }, [tasks, searchName,searchNumber,searchContractor]);
  
        const fetchTasks = async (idConfiguration) => {
            const { data, error } = await supabase
                .from('tasks')
                .select(`*,
                contractor (
                    nameOrCompanyName
                )
                ` ) .eq('id_configuration', idConfig);

        if (error) {
          console.error(error);
        } else {
          setTasks(data);
        }
      };

      //redirection to details venue
      const handleButtonClickTaskDetails=(task)=>{
        // navigate('/VenueDetalils/'+venue.id)
    }
    const addNewTask=()=>{
        // navigate('/AddNewVenue')
    }

    return (
        <div>
<p></p>
 <p></p>
            <div style={{ marginBottom: '20px' }}>
            <Button  style={{ marginLeft: '20px',marginBottom: '20px' }} type="submit" variant="contained" color="primary"  onClick={addNewTask} >
                {t("Add")}
              </Button>
          <TextField
          style={{ marginLeft: '20px',marginBottom: '20px' }}
            label={t("Search by number")}
            variant="outlined"
            value={searchNumber}
            onChange={(e) => setsearchNumber(e.target.value)}
          />
           <TextField
          style={{ marginLeft: '20px',marginBottom: '20px' }}
            label={t("Search by name")}
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <TextField
          style={{ marginLeft: '20px',marginBottom: '20px' }}
            label={t("Search by contractor")}
            variant="outlined"
            value={searchContractor}
            onChange={(e) => setsearchContractor(e.target.value)}
          />
     
        </div>
        {tasks &&(
        <Grid container spacing={3}>
          {filteredTasks.map((task) => (
            <Grid key={task.id} item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    ID: {task.id}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                  {t("Name")} : {task.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                  {t("Description")} : {task.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                  {t("Contractor")} : {task.contractor?.nameOrCompanyName}
                  </Typography>
                  <p></p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClickTaskDetails(task)}
                  >
                    {t("details")}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        )}
      </div>      
    );



};

export default ManagerOpenTasks;