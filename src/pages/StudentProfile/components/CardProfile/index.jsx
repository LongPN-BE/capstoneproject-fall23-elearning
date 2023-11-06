import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import LinkIcon from '@mui/icons-material/Link';
import moment from 'moment/moment';

function CardProfile({ user }) {
  return (
    <Card variant="outlined" style={{ height: '100%', width: '100%', borderRadius: '16px' }}>
      <CardContent style={{ height: '100%' }} className="d-flex align-items-center justify-content-start gap-1 py-4">
        <div className="col-4">
          <Avatar
            sx={{ width: '60%', height: '60%' }}
            alt="Avatar"
            src={user?.avatar}
            style={{ margin: 'auto', minHeight: '120px' }}
          />
        </div>
        <div className="col-8 flex-grows-1">
          <div className="row">
            <Typography variant="h4">{user?.name}</Typography>
          </div>
          <div className="row">
            <div className="row">
              <div className="col-4">Email:</div>
              <div className="col-8">{user?.email}</div>
            </div>
            <div className="row">
              <div className="col-4">Phone:</div>
              <div className="col-8">{user?.phone}</div>
            </div>
            <div className="row">
              <div className="col-4">Address:</div>
              <div className="col-8">{user?.address}</div>
            </div>
            <div className="row">
              <div className="col-4">Created At:</div>
              <div className="col-8">{moment(user?.createdAt).format('DD/MM/YYYY')}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardProfile;
