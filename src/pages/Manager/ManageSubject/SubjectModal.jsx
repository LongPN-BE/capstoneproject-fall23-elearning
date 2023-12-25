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
  Typography,
} from '@mui/material';
import moment from 'moment';
import Cookies from 'js-cookie';

// const userTmp = JSON.parse(Cookies.get('user'));

const SubjectModal = ({ isOpen, onClose, onSave, onUpdate, subject }) => {
  useEffect(() => {
    if (subject) {
      // Populate the form fields if a subject is provided for editing
      setEditedSubject({
        name: subject.name,
        description: subject.description,
        minPrice: subject.minPrice,
        createDate: subject.createDate,
        // staffId: userTmp.id,
        status: subject.status,
      });
    } else {
      // Clear the form fields if adding a new subject
      setEditedSubject({
        name: '',
        description: '',
        minPrice: '',
        // staffId: userTmp.id,
        status: false,
      });
    }
  }, [subject]);

  const [editedSubject, setEditedSubject] = useState({
    name: '',
    description: '',
    minPrice: '',
    // staffId: userTmp.id,
    status: false,
  });

  const [editedSubjectError, setEditedSubjectError] = useState({
    name: 'Không được để trống hoặc quá dài quá ' + 50 + ' ký tự!',
    description: 'Không được để trống hoặc quá dài quá ' + 150 + ' ký tự!',
    minPrice: 'Không được để trống hoặc giá dưới ' + 100000 + ' VNĐ!',
    status: false,
  });

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedSubject({ ...editedSubject, [fieldName]: value });
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
      // staffId: userTmp.id,
      status: false,
    });

    onClose();
  };

  const invalidSubject = () => {
    return editedSubject.name == "" || editedSubject.description == "" || editedSubject.minPrice == ""
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="d-flex justify-content-sm-between">
        <DialogTitle style={{ fontWeight: 700 }}>{subject ? 'Cập nhật môn học' : 'Tạo mới môn học'}</DialogTitle>
        <div className="p-3">
          <Typography variant="overline" display="block">
            Ngày khởi tạo:  {moment(editedSubject.createDate).format('DD/MM/YYYY')}
          </Typography>
        </div>
      </div>
      <DialogContent>


        <TextField
          variant='filled'
          fullWidth
          label="Tên môn học"
          autoFocus
          margin="dense"
          name="name"
          value={editedSubject.name}
          onChange={(e) => handleInputChange(e, 'name')}
          {
          ...!editedSubject.name && { helperText: editedSubjectError.name, error: false }
          }
        />


        <TextField
          variant='filled'
          fullWidth
          multiline
          minRows={4}
          label="Chú thích"
          autoFocus
          margin="dense"
          name="description"
          value={editedSubject.description}
          onChange={(e) => handleInputChange(e, 'description')}
          {
          ...!editedSubject.description && { helperText: editedSubjectError.description, error: false }
          }
        />

        <TextField
          variant='filled'
          fullWidth
          label="Giá thấp nhất"
          autoFocus
          margin="dense"
          name="minPrice"
          type='number'
          value={editedSubject.minPrice}
          onChange={(e) => handleInputChange(e, 'minPrice')}
          {
          ...!editedSubject.minPrice && { helperText: editedSubjectError.minPrice, error: false }
          }
        />

      </DialogContent>
      <DialogActions>
        <div style={{ paddingRight: '1rem', paddingBottom: '1rem' }}>
          <button onClick={onClose}
            className='btn'
          >
            Hủy
          </button>
          <button disabled={invalidSubject()}
            onClick={handleSave}
            className="btn px-3"
            style={{ backgroundColor: 'blue', color: 'white', borderRadius: 8, fontWeight: 700 }}>
            Lưu
          </button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default SubjectModal;
