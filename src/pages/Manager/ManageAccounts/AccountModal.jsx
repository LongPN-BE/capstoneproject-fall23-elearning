import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@material-ui/core';
const AccountModal = ({ isOpen, onClose, onSave, onUpdate, account }) => {
  const [editedAccount, setEditedAccount] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    status: '',
  });

  useEffect(() => {
    if (account) {
      // Populate the form fields if a account is provided for editing
      setEditedAccount({
        username: account.username,
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        role: account.role,
        status: account.status,
      });
    } else {
      // Clear the form fields if adding a new account
      setEditedAccount({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        status: '',
      });
    }
  }, [account]);

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedAccount({ ...editedAccount, [fieldName]: value });
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
      // add function api here
      alert(editedAccount.username);

      //-- end function update
    } else {
      // If adding a new account, call the onSave function
      onSave(editedAccount);
      // add function api here
      alert(editedAccount.username);
      //-- end function add new
      clearModal();
    }
  };

  const clearModal = () => {
    setEditedAccount({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      status: '',
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{account ? 'Edit Account' : 'New Account'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Username"
          autoFocus
          margin="dense"
          name="username"
          value={editedAccount.username}
          onChange={(e) => handleInputChange(e, 'username')}
          required
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="First name"
          autoFocus
          margin="dense"
          name="firstName"
          value={editedAccount.firstName}
          onChange={(e) => handleInputChange(e, 'firstName')}
          required
        />
        <TextField
          fullWidth
          label="Last name"
          autoFocus
          margin="dense"
          name="lastName"
          value={editedAccount.lastName}
          onChange={(e) => handleInputChange(e, 'lastName')}
          required
        />
        <TextField
          fullWidth
          label="Email"
          autoFocus
          margin="dense"
          name="email"
          value={editedAccount.email}
          onChange={(e) => handleInputChange(e, 'email')}
          disabled={false}
          required
        />
        <TextField
          fullWidth
          label="Role"
          autoFocus
          margin="dense"
          name="role"
          value={editedAccount.role}
          onChange={(e) => handleInputChange(e, 'role')}
          disabled={true}
        />
        <TextField
          fullWidth
          autoFocus
          margin="dense"
          label="Status"
          name="status"
          value={editedAccount.status}
          onChange={(e) => handleInputChange(e, 'status')}
          disabled={true}
        />
        {account?.status == 'enable' ? (
          <Button onClick={handleSave} color="danger">
            Disable account
          </Button>
        ) : (
          <Button onClick={handleSave} color="danger">
            Enable account
          </Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountModal;
