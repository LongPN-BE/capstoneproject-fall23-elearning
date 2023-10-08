import React, { useState, useEffect } from 'react';
import { Modal, TextField, Typography, Box, Button, Grid } from "@mui/material";

const LessonModal = ({ isOpen, onClose, onSave, onUpdate, lesson }) => {
    const [editedLesson, setEditedLesson] = useState({
        name: "",
        description: "",
        url: "",
        status: "",
        asset: "",
        date_time: "",
        time: "",
    });

    useEffect(() => {
        if (lesson) {
            // Populate the form fields if a lesson is provided for editing
            setEditedLesson({
                name: lesson.name,
                description: lesson.description,
                url: lesson.url,
                status: lesson.status,
                asset: lesson.asset,
                date_time: lesson.date_time,
                time: lesson.time,
            });
        } else {
            // Clear the form fields if adding a new lesson
            setEditedLesson({
                name: "",
                description: "",
                url: "",
                status: "",
                asset: "",
                date_time: "",
                time: "",
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
            alert("Please fill in all required fields.");
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
            name: "",
            description: "",
            url: "",
            status: "",
            asset: "",
            date_time: "",
            time: "",
        });

        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    {lesson ? 'Edit Lesson' : 'Add New Lesson'}
                </Typography>
                <TextField
                    fullWidth
                    label="Lesson Name"
                    variant="outlined"
                    margin="normal"
                    name="name"
                    value={editedLesson.name}
                    onChange={(e) => handleInputChange(e, "name")}
                    required
                />
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    variant="outlined"
                    margin="normal"
                    name="description"
                    value={editedLesson.description}
                    onChange={(e) => handleInputChange(e, "description")}
                    required
                />
                <TextField
                    fullWidth
                    label="URL"
                    variant="outlined"
                    margin="normal"
                    name="url"
                    value={editedLesson.url}
                    onChange={(e) => handleInputChange(e, "url")}
                />
                <TextField
                    fullWidth
                    label="Status"
                    variant="outlined"
                    margin="normal"
                    name="status"
                    value={editedLesson.status}
                    onChange={(e) => handleInputChange(e, "status")}
                />
                <TextField
                    fullWidth
                    label="Asset"
                    variant="outlined"
                    margin="normal"
                    name="asset"
                    value={editedLesson.asset}
                    onChange={(e) => handleInputChange(e, "asset")}
                />
                <TextField
                    fullWidth
                    label="Date/Time"
                    variant="outlined"
                    margin="normal"
                    name="date_time"
                    value={editedLesson.date_time}
                    onChange={(e) => handleInputChange(e, "date_time")}
                />
                <TextField
                    fullWidth
                    label="Duration (minutes)"
                    variant="outlined"
                    margin="normal"
                    name="time"
                    value={editedLesson.time}
                    onChange={(e) => handleInputChange(e, "time")}
                />
                <Grid container spacing={2}>
                    <Grid item>
                        <Button variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={handleSave}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default LessonModal;
