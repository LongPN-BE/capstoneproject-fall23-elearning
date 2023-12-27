import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Typography } from '@material-ui/core';
import moment from 'moment';
const AccountModal = ({ isOpen, onClose, onSave, onUpdate, account }) => {
  const [editedAccount, setEditedAccount] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: 'onlearn/123@123a',
    email: '',
    role: '',
    status: '',
  });
  const [editedAccountError] = useState({
    username: 'Không được để trống hoặc quá dài quá ' + 50 + ' ký tự!',
    firstName: 'Không được để trống hoặc quá dài quá ' + 50 + ' ký tự!',
    lastName: 'Không được để trống hoặc quá dài quá ' + 50 + ' ký tự!',
    email: 'Không được để trống hoặc quá dài quá ' + 50 + ' ký tự!',
    role: '',
    status: '',
  });

  useEffect(() => {
    if (account) {
      // Populate the form fields if a account is provided for editing
      setEditedAccount({
        username: account.username,
        firstName: account.profile.firstName,
        lastName: account.profile.lastName,
        email: account.profile.email,
        password: account.password,
        role: account.role,
      });
    } else {
      // Clear the form fields if adding a new account
      setEditedAccount({
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        role: '',
      });
    }
  }, [account]);

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedAccount({ ...editedAccount, [fieldName]: value });
  }


  const handleSave = () => {
    if (account) {
      // If editing an existing account, call the onUpdate function
      onUpdate({ ...account, ...editedAccount });
    } else {
      // If adding a new account, call the onSave function
      onSave(editedAccount);
      clearModal();
    }
  };

  const clearModal = () => {
    setEditedAccount({
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      role: '',
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="d-flex justify-content-sm-between">
        <DialogTitle>{account ? 'Cập nhật tài khoản' : 'Thêm mới tài khoản giáo viên'}</DialogTitle>
        <div className="p-3">
          <Typography variant="overline" display="block">
            Ngày khởi tạo:  {moment(editedAccount.createDate).format('DD/MM/YYYY')}
          </Typography>
        </div>
      </div>

      <DialogContent>

        <TextField
          variant='filled'
          fullWidth
          label="Tài khoản"
          autoFocus
          margin="dense"
          value={editedAccount.username}
          onChange={(e) => handleInputChange(e, 'username')}
          {
          ...(!editedAccount.username || editedAccount.username.length >= 50) && { helperText: editedAccountError.username, error: false }
          }
        />


        <TextField
          variant='filled'
          fullWidth
          multiline
          label="Tên"
          autoFocus
          margin="dense"
          value={editedAccount.firstName}
          onChange={(e) => handleInputChange(e, 'firstName')}
          {
          ...(!editedAccount.firstName || editedAccount.firstName.length >= 50) && { helperText: editedAccountError.firstName, error: false }
          }
        />


        <TextField
          variant='filled'
          fullWidth
          label="Họ"
          autoFocus
          margin="dense"
          value={editedAccount.lastName}
          onChange={(e) => handleInputChange(e, 'lastName')}
          {
          ...(!editedAccount.lastName || editedAccount.lastName.length >= 50) && { helperText: editedAccountError.lastName, error: false }
          }
        />

        <TextField
          variant='filled'
          fullWidth
          label="Email"
          autoFocus
          type="email"
          margin="dense"
          value={editedAccount.email}
          onChange={(e) => handleInputChange(e, 'email')}
          {
          ...(!editedAccount.email || editedAccount.email.length >= 50) && { helperText: editedAccountError.email, error: false }
          }
        />


        <TextField
          fullWidth
          label="Vai trò"
          autoFocus
          variant='filled'
          margin="dense"
          value={account ? editedAccount.role : 'Giáo viên'}
          onChange={(e) => handleInputChange(e, 'role')}
          disabled={true}
        />

      </DialogContent>
      <div style={{ paddingRight: '1rem', paddingBottom: '1rem' }}>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Xác nhận
          </Button>
        </DialogActions>
      </div>

    </Dialog>
  );
};

export default AccountModal;
