import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from '@material-ui/core';
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
      <DialogTitle>Cập nhật chính sách</DialogTitle>
      <DialogContent>
        <Typography>Cấu hình hệ thống version {editedConfig.version}</Typography>
        <Typography sx={{ mt: 2 }}>Mô tả cập nhật: {editedConfig.projectName} </Typography>
        <Typography sx={{ mt: 2 }}>Ngày tạo: {editedConfig.dateCreate} </Typography>
        <Typography sx={{ mt: 2 }}>Thời gian học mặc định: {editedConfig.studyingTime} </Typography>
        <Typography sx={{ mt: 2 }}>Số lần làm quiz mặc định: {editedConfig.defaultQuizTime} </Typography>
        <Typography sx={{ mt: 2 }}>Ảnh bìa mặc định: {editedConfig.defaultImage} </Typography>
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
