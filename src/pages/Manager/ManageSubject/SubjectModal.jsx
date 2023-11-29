import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import moment from 'moment';
import Cookies from 'js-cookie';

const userTmp = JSON.parse(Cookies.get('user'));

const SubjectModal = ({ isOpen, onClose, onSave, onUpdate, subject }) => {
  useEffect(() => {
    if (subject) {
      // Populate the form fields if a subject is provided for editing
      setEditedSubject({
        name: subject.name,
        description: subject.description,
        minPrice: subject.minPrice,
        createDate: subject.createDate,
        staffId: userTmp.id,
        status: subject.status,
      });
    } else {
      // Clear the form fields if adding a new subject
      setEditedSubject({
        name: '',
        description: '',
        minPrice: '',
        staffId: userTmp.id,
        status: false,
      });
    }
  }, [subject]);

  const [editedSubject, setEditedSubject] = useState({
    name: '',
    description: '',
    minPrice: '',
    staffId: userTmp.id,
    status: false,
  });

  const [editedSubjectError, setEditedSubjectError] = useState({
    name: '',
    description: '',
    minPrice: '',
    staffId: userTmp.id,
    status: false,
  });

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedSubject({ ...editedSubject, [fieldName]: value });
    switch (fieldName) {
      case 'name':
        if (value == '' || value.length >= 50) {
          setEditedSubjectError({
            ...editedSubjectError,
            [fieldName]: 'Không được để trống hoặc quá dài quá ' + 50 + ' ký tự!',
          });
        } else {
          setEditedSubjectError({ ...editedSubjectError, [fieldName]: '' });
        }
        // console.log('name valid');
        break;
      case 'description':
        if (value == '' || value.length >= 150) {
          setEditedSubjectError({
            ...editedSubjectError,
            [fieldName]: 'Không được để trống hoặc quá dài quá ' + 150 + ' ký tự!',
          });
        } else {
          setEditedSubjectError({ ...editedSubjectError, [fieldName]: '' });
        }
        // console.log('description valid');
        break;
      case 'minPrice':
        if (value == '' || value < 100000) {
          setEditedSubjectError({
            ...editedSubjectError,
            [fieldName]: 'Không được để trống hoặc giá dưới ' + 100000 + ' VNĐ!',
          });
        } else {
          setEditedSubjectError({ ...editedSubjectError, [fieldName]: '' });
        }
        // console.log('minPrice valid');
        break;
    }
  };

  const handleSave = () => {
    // if (!editedSubject.name || !editedSubject.description) {
    //   // Show an error message or handle the validation as needed
    //   alert('Please fill in all required fields.');
    //   return;
    // }

    if (subject) {
      // If editing an existing subject, call the onUpdate function
      onUpdate({ ...subject, ...editedSubject });
      // add function api here
      // alert(editedSubject.name);

      //-- end function update
    } else {
      // If adding a new subject, call the onSave function
      onSave(editedSubject);
      // add function api here
      // alert(editedSubject.name);
      //-- end function add new
      clearModal();
    }
  };

  const clearModal = () => {
    setEditedSubject({
      name: '',
      description: '',
      minPrice: '',
      createDate: new Date(),
      staffId: userTmp.id,
      status: false,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{subject ? 'Cập nhật môn học' : 'Tạo mới môn học'}</DialogTitle>
      <DialogContent>
        {editedSubjectError.name == '' ? (
          <>
            <TextField
              fullWidth
              label="Tên môn học"
              autoFocus
              margin="dense"
              name="name"
              value={editedSubject.name}
              onChange={(e) => handleInputChange(e, 'name')}
              required
            />
          </>
        ) : (
          <>
            <TextField
              error
              fullWidth
              label="Tên môn học"
              autoFocus
              margin="dense"
              name="name"
              value={editedSubject.name}
              onChange={(e) => handleInputChange(e, 'name')}
              helperText={editedSubjectError.name}
              required
            />
          </>
        )}

        {editedSubjectError.description == '' ? (
          <>
            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Chú thích"
              autoFocus
              margin="dense"
              name="description"
              value={editedSubject.description}
              onChange={(e) => handleInputChange(e, 'description')}
              required
            />
          </>
        ) : (
          <>
            <TextField
              error
              fullWidth
              multiline
              minRows={4}
              label="Chú thích"
              autoFocus
              margin="dense"
              name="description"
              value={editedSubject.description}
              onChange={(e) => handleInputChange(e, 'description')}
              helperText={editedSubjectError.description}
              required
            />
          </>
        )}

        {editedSubjectError.minPrice == '' ? (
          <>
            <TextField
              fullWidth
              label="Giá thấp nhất"
              autoFocus
              margin="dense"
              name="minPrice"
              value={editedSubject.minPrice}
              onChange={(e) => handleInputChange(e, 'minPrice')}
            />
          </>
        ) : (
          <>
            <TextField
              error
              fullWidth
              label="Giá thấp nhất"
              autoFocus
              margin="dense"
              name="minPrice"
              value={editedSubject.minPrice}
              onChange={(e) => handleInputChange(e, 'minPrice')}
              helperText={editedSubjectError.minPrice}
            />
          </>
        )}

        <TextField
          fullWidth
          label="Ngày khởi tạo"
          autoFocus
          margin="dense"
          name="createDate"
          value={moment(editedSubject.createDate).format('DD/MM/YYYY')}
          onChange={(e) => handleInputChange(e, 'createDate')}
          disabled={true}
        />

        {/* <TextField fullWidth label="ID" autoFocus margin="dense" name="staffId" value={userTmp.id} disabled={true} /> */}
        {/* <TextField
          fullWidth
          autoFocus
          margin="dense"
          label="Trạng thái"
          name="asset"
          value={editedSubject.status}
          onChange={(e) => handleInputChange(e, 'status')}
          disabled={true}
        /> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={editedSubject.status}
            label="Trạng  thái"
            onChange={(e) => handleInputChange(e, 'status')}
            disabled
          >
            <MenuItem value={false}>Không hoạt động</MenuItem>
            <MenuItem value={true}>Hoạt động</MenuItem>
          </Select>
        </FormControl>
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

export default SubjectModal;
