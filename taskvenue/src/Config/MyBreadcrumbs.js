import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const MyBreadcrumbs = ({ items }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((item, index) => {
        if (index === items.length - 1) {
          return (
            <Typography key={index} color="textPrimary">
              {item.text}
            </Typography>
          );
        } else {
          return (
            <Link key={index} color="inherit" href={item.url}>
              {item.text}
            </Link>
          );
        }
      })}
    </Breadcrumbs>
  );
};

export default MyBreadcrumbs;
