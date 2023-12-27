import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

const CustomBreadcrumbs = ({ items }) => {
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {items.map((item, index) => {
        if (index === items.length - 1) {
          return (
            <Typography key={index} color="textPrimary">
              {item.label}
            </Typography>
          );
        } else {
          return (
            <Link key={index} color="inherit" to={item.url}>
              {item.label}
            </Link>
          );
        }
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
