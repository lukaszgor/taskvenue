import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, TextField } from '@mui/material';
import supabase from '../../supabaseClient';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { useTranslation } from "react-i18next";

const VenueDashboard = () => {
    const [venues, setVenues] = useState([]);
    const [filteredVenues, setFilteredVenues] = useState([]);
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
                fetchVenues(idConfig);
            }
          }, [idConfig]);

// Filtruj dane na podstawie nazwy i statusu
useEffect(() => {
    let filteredData = venues;

    if (searchName !== '') {
      filteredData = filteredData.filter((venue) => venue.name.toLowerCase().includes(searchName.toLowerCase()));
    }
    if (searchNumber !== '') {
        filteredData = filteredData.filter((venue) => venue.id.toString().includes(searchNumber));
      }
      if (searchContractor !== '') {
        filteredData = filteredData.filter((venue) => venue.contractor?.nameOrCompanyName.toLowerCase().includes(searchContractor.toLowerCase()));
      }

      setFilteredVenues(filteredData);
  }, [venues, searchName,searchNumber,searchContractor]);
  
        const fetchVenues = async (idConfiguration) => {
            const { data, error } = await supabase
                .from('venues')
                .select(`*,
                contractor (
                    nameOrCompanyName
                )
                ` ) .eq('id_configuration', idConfig);

        if (error) {
          console.error(error);
        } else {
          setVenues(data);
        }
      };

      //redirection to details room
      const handleButtonClickRoomDetails=(venue)=>{
        
        navigate('/settings/'+venue.id)
    }
    const addNewRoom=()=>{
        navigate('/Add')
    }

    return (
        <div>
            <ManagerNavBar></ManagerNavBar>
<p></p>
            <div style={{ marginBottom: '20px' }}>
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
        {venues &&(
        <Grid container spacing={3}>
          {filteredVenues.map((venue) => (
            <Grid key={venue.id} item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    ID: {venue.id}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                  {t("Name")} : {venue.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                  {t("Description")} : {venue.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                  {t("Contractor")} {venue.contractor?.nameOrCompanyName}
                  </Typography>
                  <p></p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClickRoomDetails(venue)}
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

export default VenueDashboard;