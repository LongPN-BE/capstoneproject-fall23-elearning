import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@material-ui/core';
const SubjectModal = ({ isOpen, onClose, onSave, onUpdate, subject }) => {
  const [editedSubject, setEditedSubject] = useState({
    name: '',
    description: '',
    minPrice: '',
    createDate: '',
    staffId: '',
    status: ''
  });

  useEffect(() => {
    if (subject) {
      // Populate the form fields if a subject is provided for editing
      setEditedSubject({
        name: subject.name,
        description: subject.description,
        minPrice: subject.min_price,
        createDate: subject.created_date,
        staffId: subject.staff_id,
        status: subject.status,
      });
    } else {
      // Clear the form fields if adding a new subject
      setEditedSubject({
        name: '',
        description: '',
        minPrice: '',
        createDate: '',
        staffId: '',
        status: '',
      });
    }
  }, [subject]);

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedSubject({ ...editedSubject, [fieldName]: value });
  };

  const handleSave = () => {
    if (!editedSubject.name || !editedSubject.description) {
      // Show an error message or handle the validation as needed
      alert('Please fill in all required fields.');
      return;
    }

    if (subject) {
      // If editing an existing subject, call the onUpdate function
      onUpdate({ ...subject, ...editedSubject });
      // add function api here
      alert(editedSubject.name)

      //-- end function update
    } else {
      // If adding a new subject, call the onSave function
      onSave(editedSubject);
      // add function api here
      alert(editedSubject.name)
      //-- end function add new
      clearModal();
    }

  };

  const clearModal = () => {
    setEditedSubject({
      name: '',
      description: '',
      minPrice: '',
      createDate: '',
      staffId: '',
      status: '',
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{subject ? 'Edit Subject' : 'New Subject'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Subject Name"
          autoFocus
          margin="dense"
          name="name"
          value={editedSubject.name}
          onChange={(e) => handleInputChange(e, 'name')}
          required
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          autoFocus
          margin="dense"
          name="description"
          value={editedSubject.description}
          onChange={(e) => handleInputChange(e, 'description')}
          required
        />
        <TextField
          fullWidth
          label="Minimum price"
          autoFocus
          margin="dense"
          name="min_price"
          value={editedSubject.min_price}
          onChange={(e) => handleInputChange(e, 'min_price')}
        />
        <TextField
          fullWidth
          label="Created date"
          autoFocus
          margin="dense"
          name="created_date"
          value={editedSubject.created_date}
          onChange={(e) => handleInputChange(e, 'created_date')}
          disabled={true}
        />
        <TextField
          fullWidth
          label="Staff ID"
          autoFocus
          margin="dense"
          name="staff_id"
          value={editedSubject.staff_id}
          onChange={(e) => handleInputChange(e, 'staff_id')}
          disabled={true}
        />
        <TextField
          fullWidth
          autoFocus
          margin="dense"
          label="Status"
          name="asset"
          value={editedSubject.status}
          onChange={(e) => handleInputChange(e, 'status')}
          disabled={true}
        />
        {subject?.status == 'enable' ? (
          <Button onClick={handleSave} color="danger">
            Disable subject
          </Button>
        ) : (
          <Button onClick={handleSave} color="danger">
            Enable subject
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

export default SubjectModal;
