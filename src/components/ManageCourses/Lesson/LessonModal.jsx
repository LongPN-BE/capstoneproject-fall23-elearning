import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Select,
    MenuItem
} from '@material-ui/core';

const LessonModal = ({ isOpen, onClose, onSave, onUpdate, lesson }) => {
    const [editedLesson, setEditedLesson] = useState({
        name: '',
        description: '',
        url: '',
        status: '',
        estimateTime: '',
    });

    useEffect(() => {
        if (lesson) {
            // Populate the form fields if a lesson is provided for editing
            setEditedLesson({
                name: lesson.name,
                description: lesson.description,
                url: lesson.url,
                status: lesson.status,
                estimateTime: lesson.estimateTime,
            });
        } else {
            // Clear the form fields if adding a new lesson
            setEditedLesson({
                name: '',
                description: '',
                url: '',
                status: 'false',
                estimateTime: '',
            });
        }
    }, [lesson]);

    const handleInputChange = (e, fieldName) => {
        const { value } = e.target;
        setEditedLesson({ ...editedLesson, [fieldName]: value });
    };

    const handleSave = () => {
        if (!editedLesson.name || !editedLesson.description) {
            // Show an error message or handle the validation as needed
            alert('Please fill in all required fields.');
            return;
        }

        if (lesson) {
            // If editing an existing lesson, call the onUpdate function
            onUpdate({ ...lesson, ...editedLesson });
        } else {
            // If adding a new lesson, call the onSave function
            onSave(editedLesson);
        }

        clearModal();
    };

    const clearModal = () => {
        setEditedLesson({
            name: '',
            description: '',
            url: '',
            status: '',
            estimateTime: '',
        });

        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {lesson ? 'Edit Lesson' : 'Add New Lesson'}
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Lesson Name"
                    autoFocus
                    margin="dense"
                    name="name"
                    value={editedLesson.name}
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
                    value={editedLesson.description}
                    onChange={(e) => handleInputChange(e, 'description')}
                    required
                />
                <TextField
                    fullWidth
                    label="URL"
                    autoFocus
                    margin="dense"
                    name="url"
                    value={editedLesson.url}
                    onChange={(e) => handleInputChange(e, 'url')}
                />
                {/* <TextField
                    fullWidth
                    label="Status"
                    autoFocus
                    margin="dense"
                    name="status"
                    value={editedLesson.status}
                    onChange={(e) => handleInputChange(e, 'status')}
                /> */}
                <Select
                    fullWidth
                    label="Status"
                    autoFocus
                    margin="dense"
                    value={editedLesson.status}
                    onChange={(e) => handleInputChange(e, 'status')}
                >
                    <MenuItem value="true">Hoạt động</MenuItem>
                    <MenuItem value="false">Ngưng hoạt động</MenuItem>
                </Select>
                <TextField
                    fullWidth
                    label="Duration (minutes)"
                    autoFocus
                    margin="dense"
                    name="estimateTime"
                    value={editedLesson.estimateTime}
                    onChange={(e) => handleInputChange(e, 'estimateTime')}
                />
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

export default LessonModal;
