import React from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { useState,useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography, Select, MenuItem } from '@mui/material';
import supabase from '../../supabaseClient';
import FetchSupabaseData from '../../Config/FetchSupabaseData';
import { useTranslation } from "react-i18next";

const Register = () => {
    const { t, i18n } = useTranslation();
const [receivedData, setReceivedData] = useState({ userId: '', idConfiguration: '', profileType: '' });
    const handleGetData = (userId, idConfiguration, profileType) => {
        setReceivedData({ userId, idConfiguration, profileType });
      };
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    address: '',
    phone_number: '',
    description: '',
    profile_type: 'worker'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
try {
      const { data, error } = await supabase.auth.signUp(
        {
            email:formData.email,
            password:formData.password,
          options: {
            data: {
              full_name: formData.email,
            }
          }
        }
      )
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .update({
            username:formData.name,
            id_configuration: receivedData.idConfiguration,
            profile_type: formData.profile_type,
            description: formData.description,
            phone_number: formData.phone_number,
            address:formData.address,
        })
        .eq('full_name', formData.email)
      if (userError) {
        throw new Error(userError.message);
      }
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas rejestracji użytkownika:', error);
      setErrorMessage('Wystąpił błąd podczas rejestracji użytkownika: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <ManagerNavBar></ManagerNavBar>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
       {t("Register")} 
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label="Adres email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="password"
                type="password"
                label={t("password")}
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label={t("First and last name")}
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="address"
                label={t("address")}
                value={formData.address}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone_number"
                label={t("phone number")}
                value={formData.phone_number}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="description"
                label={t("description")}
                value={formData.description}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                name="profile_type"
                label={t("profile type")}
                value={formData.profile_type}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="worker">Worker</MenuItem>
                <MenuItem value="client">Client</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
              >
                {t("Register")}
              </Button>
            </Grid>
            {errorMessage && <Grid item xs={12}><div>{errorMessage}</div></Grid>}
          </Grid>
          <div>
    </div>
        </form>
      </Container>
      <FetchSupabaseData sendData={handleGetData}></FetchSupabaseData>
      {/* <div>
      <p>Received Data in ComponentB:</p>
      <ul>
        <li>Data 1: {receivedData.userId}</li>
        <li>Data 2: {receivedData.idConfiguration}</li>
        <li>Data 3: {receivedData.profileType}</li>
      </ul>
    </div> */}
    </div>
  );
};

export default Register;
