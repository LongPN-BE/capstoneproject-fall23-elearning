import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button, TextField } from '@material-ui/core';
import moment from 'moment/moment';
const ViewConfig = ({ isOpen, onClose, onSave, onUpdate, config }) => {
  const [editedConfig, setEditedConfig] = useState({
    version: '',
    projectName: '',
    dateCreate: '',
    studyingTime: '',
    retryTestTime: '',
    defaultImage: '',
    defaultQuizTime: '',
  });

  useEffect(() => {
    if (config) {
      // Populate the form fields if a config is provided for editing
      setEditedConfig({
        version: config.version,
        projectName: config.projectName,
        dateCreate: config.dateCreate,
        studyingTime: config.studyingTime,
        retryTestTime: config.retryTestTime,
        defaultImage: config.defaultImage,
        defaultQuizTime: config.defaultQuizTime,
      });
    } else {
      // Clear the form fields if adding a new config
      setEditedConfig({
        version: '',
        projectName: '',
        dateCreate: '',
        studyingTime: '',
        retryTestTime: '',
        defaultImage: '',
        defaultQuizTime: '',
      });
    }
  }, [config]);

  const handleSave = () => {
    if (!editedConfig.name || !editedConfig.description) {
      // Show an error message or handle the validation as needed
      alert('Please fill in all required fields.');
      return;
    }

    if (config) {
      // If editing an existing config, call the onUpdate function
      onUpdate({ ...config, ...editedConfig });
      // add function api here
      alert(editedConfig.name);

      //-- end function update
    } else {
      // If adding a new config, call the onSave function
      onSave(editedConfig);
      // add function api here
      alert(editedConfig.name);
      //-- end function add new
      clearModal();
    }
  };

  const clearModal = () => {
    setEditedConfig({
      version: '',
      projectName: '',
      dateCreate: '',
      studyingTime: '',
      retryTestTime: '',
      defaultImage: '',
      defaultQuizTime: '',
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <Typography className="text-end p-3" variant="caption">
        VERSION {editedConfig.version}
      </Typography>
      <div className="d-flex justify-content-center">
        <DialogTitle>Chi tiết cấu hình</DialogTitle>
      </div>

      <DialogContent>
        <Typography>Mô tả cập nhật: </Typography>
        <TextField
          helperText=" "
          value={editedConfig.projectName}
          id="demo-helper-text-aligned-no-helper"
          variant="filled"
          multiline
          minRows={4}
          fullWidth
        />
        <div className="d-flex row">
          <div className="col-6">
            <Typography>Thời gian học mặc định: </Typography>
            <TextField
              helperText=" "
              value={editedConfig.studyingTime}
              id="demo-helper-text-aligned-no-helper"
              variant="filled"
              fullWidth
            />
          </div>
          <div className="col-6">
            <Typography>Số lần làm quiz mặc định: </Typography>
            <TextField
              helperText=" "
              value={editedConfig.defaultQuizTime}
              id="demo-helper-text-aligned-no-helper"
              variant="filled"
              fullWidth
            />
          </div>
        </div>
        <Typography>Ngày tạo: </Typography>
        <TextField
          helperText=" "
          value={moment(editedConfig.dateCreate).format('DD/MM/YYYY, h:mm A')}
          id="demo-helper-text-aligned-no-helper"
          variant="filled"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewConfig;
