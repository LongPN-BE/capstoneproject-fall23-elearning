import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@material-ui/core';
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
  const [editedAccountError, setEditedAccountError] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    status: '',
  });

  // useEffect(() => {
  //   if (account) {
  //     // Populate the form fields if a account is provided for editing
  //     setEditedAccount({
  //       username: account.username,
  //       firstName: account.profile.firstName,
  //       lastName: account.profile.lastName,
  //       email: account.profile.email,
  //       password: account.password,
  //       role: account.role,
  //     });
  //   } else {
  //     // Clear the form fields if adding a new account
  //     setEditedAccount({
  //       username: '',
  //       firstName: '',
  //       lastName: '',
  //       password: '',
  //       email: '',
  //       role: '',
  //     });
  //   }
  // }, [account]);

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedAccount({ ...editedAccount, [fieldName]: value });
    switch (fieldName) {
      case "username":
        if (value === '' || value.length >= 50) {
          setEditedAccountError({
            ...editedAccountError,
            [fieldName]: 'Không được để trống hoặc quá dài quá ' + 50 + ' ký tự!',
          });
        } else {
          setEditedAccountError({ ...editedAccountError, [fieldName]: '' });
        }
        break;
      case "firstName":
        if (value === '' || value.length >= 50) {
          setEditedAccountError({
            ...editedAccountError,
            [fieldName]: 'Không được để trống hoặc quá dài quá ' + 50 + ' ký tự!',
          });
        } else {
          setEditedAccountError({ ...editedAccountError, [fieldName]: '' });
        }
        break;
      case "lastName":
        if (value === '' || value.length >= 50) {
          setEditedAccountError({
            ...editedAccountError,
            [fieldName]: 'Không được để trống hoặc quá dài quá ' + 70 + ' ký tự!',
          });
        } else {
          setEditedAccountError({ ...editedAccountError, [fieldName]: '' });
        }
        break;
      case "email":
        if (value === '' || value.length >= 50) {
          setEditedAccountError({
            ...editedAccountError,
            [fieldName]: 'Không được để trống hoặc quá dài quá ' + 70 + ' ký tự!',
          });
        } else {
          setEditedAccountError({ ...editedAccountError, [fieldName]: '' });
        }
        break;
    }




    // if (value == '' || value.length >= max) {
    //   setEditedAccountError({
    //     ...editedAccountError,
    //     [fieldName]: 'Không được để trống hoặc quá dài quá ' + max + ' ký tự!',
    //   });
    // } else {
    //   setEditedAccountError({ ...editedAccountError, [fieldName]: '' });
    // }
  };

  const handleSave = () => {
    if (!editedAccount.username || !editedAccount.email) {
      // Show an error message or handle the validation as needed
      alert('Please fill in all required fields.');
      return;
    }

    if (account) {
      // If editing an existing account, call the onUpdate function
      onUpdate({ ...account, ...editedAccount });

      //-- end function update
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
      <DialogTitle>{account ? 'Cập nhật tài khoản' : 'Thêm mới tài khoản giáo viên'}</DialogTitle>
      <DialogContent>
        {editedAccountError.username === '' ? (
          <>
            <TextField
              fullWidth
              label="Tài khoản"
              autoFocus
              margin="dense"
              value={editedAccount.username}
              onChange={(e) => handleInputChange(e, 'username')}
              required
            />
          </>
        ) : (
          <>
            <TextField
              error
              fullWidth
              label="Tài khoản"
              autoFocus
              margin="dense"
              value={editedAccount.username}
              onChange={(e) => handleInputChange(e, 'username')}
              helperText={editedAccountError.username}
              required
            />
          </>
        )}

        {/* {editedAccountError.password == '' ? (
          <>
            {' '}
            <TextField
              fullWidth
              label="Mật khẩu"
              type="password"
              autoFocus
              margin="dense"
              value={editedAccount.password}
              onChange={(e) => handleInputChange(e, 'password')}
              required
            />
          </>
        ) : (
          <>
            <TextField
              error
              fullWidth
              label="Mật khẩu"
              autoFocus
              type="password"
              margin="dense"
              value={editedAccount.password}
              onChange={(e) => handleInputChange(e, 'password')}
              helperText={editedAccountError.password}
              required
            />
          </>
        )} */}

        {editedAccountError.firstName === '' ? (
          <>
            <TextField
              fullWidth
              multiline
              label="Tên"
              autoFocus
              margin="dense"
              value={editedAccount.firstName}
              onChange={(e) => handleInputChange(e, 'firstName')}
              required
            />
          </>
        ) : (
          <>
            <TextField
              error
              fullWidth
              multiline
              label="Tên"
              autoFocus
              margin="dense"
              value={editedAccount.firstName}
              onChange={(e) => handleInputChange(e, 'firstName')}
              helperText={editedAccountError.firstName}
              required
            />{' '}
          </>
        )}

        {editedAccountError.lastName === '' ? (
          <>
            <TextField
              fullWidth
              label="Họ"
              autoFocus
              margin="dense"
              value={editedAccount.lastName}
              onChange={(e) => handleInputChange(e, 'lastName')}
              required
            />
          </>
        ) : (
          <>
            <TextField
              error
              fullWidth
              label="Họ"
              autoFocus
              margin="dense"
              value={editedAccount.lastName}
              onChange={(e) => handleInputChange(e, 'lastName')}
              helperText={editedAccountError.lastName}
              required
            />
          </>
        )}

        {editedAccountError.email === '' ? (
          <>
            <TextField
              fullWidth
              label="Email"
              autoFocus
              type="email"
              margin="dense"
              value={editedAccount.email}
              onChange={(e) => handleInputChange(e, 'email')}
              disabled={false}
              required
            />
          </>
        ) : (
          <>
            <TextField
              error
              fullWidth
              label="Email"
              autoFocus
              type="email"
              margin="dense"
              value={editedAccount.email}
              onChange={(e) => handleInputChange(e, 'email')}
              helperText={editedAccountError.email}
              disabled={false}
              required
            />
          </>
        )}

        <TextField
          fullWidth
          label="Vai trò"
          autoFocus
          margin="dense"
          value={account ? editedAccount.role : 'Giáo viên'}
          onChange={(e) => handleInputChange(e, 'role')}
          disabled={true}
        />
        {/* <TextField
          fullWidth
          autoFocus
          margin="dense"
          label="Trạng thái"
          name="status"
          value={editedAccount.status ? 'Đang hoạt động' : 'Chưa kích hoạt'}
          onChange={(e) => handleInputChange(e, 'status')}
          disabled={true}
        /> */}
        {/* {account?.enabled ? (
          <Button onClick={handleSave} color="danger">
            Vô hiệu hóa
          </Button>
        ) : (
          <Button onClick={handleSave} color="danger">
            Kíck hoạt tài khoản
          </Button>
        )} */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountModal;
