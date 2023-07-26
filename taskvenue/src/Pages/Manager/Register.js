import React from 'react';
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';
import { useState,useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography, Select, MenuItem } from '@mui/material';
import supabase from '../../supabaseClient';

const Register = () => {
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
      
      // Utwórz nowy użytkownik w tabeli "users" z dodatkowymi informacjami
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .update({
            username:formData.name,
            id_configuration: 1,
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
          Register
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
                label="Hasło"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Imię i nazwisko"
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="address"
                label="Adres"
                value={formData.address}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone_number"
                label="Numer telefonu"
                value={formData.phone_number}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="description"
                label="Opis"
                value={formData.description}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                name="profile_type"
                label="Typ profilu"
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
                Zarejestruj
              </Button>
            </Grid>
            {errorMessage && <Grid item xs={12}><div>{errorMessage}</div></Grid>}
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Register;
