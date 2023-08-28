import React, { useState,useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTranslation } from "react-i18next";


function OpenAndInProgressLegend() {
    const { t, i18n } = useTranslation();
    const statuses = [
        { color: '#EF8354', label: t('In progress') },
        { color: '#B2E8A6', label: t('Open') },
      ];
    return (   
        <Box p={3} border="1px solid #ccc" boxShadow={1}>
        <Typography variant="h6">{t("Legend")} </Typography>
        <List>
          {statuses.map((status, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemIcon>
                <div style={{ backgroundColor: status.color, width: 20, height: 20, borderRadius: '50%' }}></div>
              </ListItemIcon>
              <ListItemText primary={status.label} />
            </ListItem>
          ))}
        </List>
      </Box>
     
      
    );
  }
  
  export default OpenAndInProgressLegend;
  