import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  Typography,
  Avatar,
  Grid,
  Divider,
} from '@material-ui/core';
import { useEffect } from 'react';
import moment from 'moment';
const AccountModal = ({ isOpen, onClose, account }) => {
  const [editedAccount, setEditedAccount] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    status: '',
    avatar: '',
    phone: '',
    description: '',
    address: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    if (account) {
      // Populate the form fields if a account is provided for editing
      setEditedAccount({
        username: account.username,
        firstName: account.profile.firstName,
        lastName: account.profile.lastName,
        email: account.profile.email,
        role: account.role,
        status: account.active,
        avatar: account.profile.avatar,
        phone: account.profile.phone,
        description: account.profile.description,
        address: account.profile.address,
        dateOfBirth: account.profile.dateOfBirth,
      });
    }
  }, [account]);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="d-flex justify-content-sm-between">
        <DialogTitle>Chi tiết tài khoản</DialogTitle>

        {editedAccount.role === 'STUDENT' ? (
          <div className="p-3">
            <Typography style={{ color: '#bdc3c7', fontWeight: 'bold' }} variant="overline" display="block">
              <b>NGƯỜI HỌC</b>
            </Typography>
          </div>
        ) : editedAccount.role === 'TEACHER' ? (
          <div className="p-3">
            <Typography style={{ color: '#bdc3c7', fontWeight: 'bold' }} variant="overline" display="block">
              <b>GIÁO VIÊN</b>
            </Typography>
          </div>
        ) : editedAccount.role === 'STAFF' ? (
          <div className="p-3">
            <Typography style={{ color: '#bdc3c7', fontWeight: 'bold' }} variant="overline" display="block">
              <b>NHÂN VIÊN</b>
            </Typography>
          </div>
        ) : (
          <div className="p-3">
            <Typography style={{ color: '#bdc3c7', fontWeight: 'bold' }} variant="overline" display="block">
              <b>QUẢN TRỊ VIÊN</b>
            </Typography>
          </div>
        )}
      </div>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Avatar style={{ height: '55px', width: '55px' }} alt={editedAccount.avatar} src={editedAccount.avatar} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" style={{ mt: '-30px' }}>
              {editedAccount.lastName} {editedAccount.firstName}
            </Typography>
            <Typography variant="caption">{editedAccount.email} </Typography>
          </Grid>
          <Grid item xs={4}>
            {editedAccount.status ? (
              <Typography style={{ color: '#00CC00', fontWeight: 'bold', float: 'right' }}>Đang hoạt động</Typography>
            ) : (
              <Typography style={{ color: '#FF0000', fontWeight: 'bold', float: 'right' }}>Ngưng hoạt động</Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogContent dividers>
        <div style={{ fontSize: '1.2rem' }}>
          <Typography variant="inherit">Họ và tên: </Typography>
          <Typography variant="inherit">
            {' '}
            {editedAccount.lastName} {editedAccount.firstName}
          </Typography>{' '}
          <br />
          <Typography variant="inherit">Email: </Typography>
          <Typography variant="inherit">{editedAccount.email}</Typography>   <br />
          <Typography variant="inherit">Ngày sinh: </Typography>
          <Typography variant="inherit">{moment(editedAccount.dateOfBirth).format('DD - MM -YYYY')}</Typography>   <br />
          <Typography variant="inherit">Điện thoại: </Typography>
          <Typography variant="inherit">{editedAccount.phone}</Typography>   <br />
          <Typography variant="inherit">Địa chỉ: </Typography>
          <Typography variant="inherit">{editedAccount.address}</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <div style={{ padding: '1rem' }}>
          <button onClick={onClose} className="btn px-3"
            style={{
              backgroundColor: '#3366FF', color: 'white', width: '7rem',
              borderRadius: 8, fontWeight: 700
            }}>
            Thoát
          </button>
        </div>
      </DialogActions>
    </Dialog >
  );
};

export default AccountModal;
