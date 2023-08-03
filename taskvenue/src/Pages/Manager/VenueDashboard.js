import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import supabase from '../../supabaseClient';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import ManagerNavBar from '../../Components/NavigationBar/ManagerNavBar';

const VenueDashboard = () => {
    return (
        <div>
            <ManagerNavBar></ManagerNavBar>
            <p>VenueDashboard</p>
      
      </div>
      );
};

export default VenueDashboard;