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
import { useRef } from 'react';
import ReactQuill from 'react-quill';
import './LessonModal.css'
import { validateInputDigits, validateInputString } from '../../../util/Utilities';
import Swal from 'sweetalert2';
import { invalidInput } from '../../../util/Constants';


const LessonModal = ({ isOpen, onClose, onSave, onUpdate, lesson }) => {
    const reactQuillRef = useRef();
    const [editedLesson, setEditedLesson] = useState({
        name: '',
        description: '',
        url: '',
        status: '',
        estimateTime: '',
        content: ''
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
                content: lesson.content
            });
        } else {
            // Clear the form fields if adding a new lesson
            setEditedLesson({
                name: '',
                description: '',
                url: '',
                status: 'true',
                estimateTime: '',
                content: ''
            });
        }
    }, [lesson]);

    const handleInputChange = (e, fieldName) => {
        let values = fieldName === 'content' ? String(e) : e.target.value
        setEditedLesson({ ...editedLesson, [fieldName]: values });
    };

    const handleSave = () => {
        const validString = validateInputString(editedLesson.name, editedLesson.description, editedLesson.content);
        const validDigits = validateInputDigits(editedLesson.estimateTime)
        if (!validString || !validDigits) {
            // Show an error message or handle the validation as needed
            clearModal();
            Swal.fire({
                title: "Warning",
                text: invalidInput,
                icon: "warning"
            });
            return;
        } else {
            if (lesson) {
                // If editing an existing lesson, call the onUpdate function
                onUpdate({ ...lesson, ...editedLesson });
            } else {
                // If adding a new lesson, call the onSave function
                onSave(editedLesson);
            }
            clearModal();
        }


    };

    const clearModal = () => {
        setEditedLesson({
            name: '',
            description: '',
            url: '',
            status: '',
            estimateTime: '',
            content: ''
        });

        onClose();
    };

    const modules = {
        toolbar: {
            container: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                ['video'],
                ["code-block"],
                ["clean"],
            ],
        },
        clipboard: {
            matchVisual: false,
        },
    }

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {lesson ? 'Edit Lesson' : 'Thêm bài học'}
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Tên bài học"
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
                    label="Mô tả"
                    autoFocus
                    margin="dense"
                    name="description"
                    value={editedLesson.description}
                    onChange={(e) => handleInputChange(e, 'description')}
                    required
                />
                <label className='my-2'>Nội dung bài học</label><br />
                <ReactQuill
                    name="Nội dung"
                    // style={{ height: '300px' }}
                    ref={reactQuillRef}
                    value={editedLesson.content}
                    onChange={(e) => handleInputChange(e, "content")}
                    modules={modules}
                />
                <Select
                    className='my-4'
                    fullWidth
                    label="Trạng thái"
                    autoFocus
                    margin="dense"
                    value={editedLesson.status}
                    onChange={(e) => handleInputChange(e, 'status')}
                >
                    <MenuItem value="true">Hoạt động</MenuItem>
                    {/* <MenuItem value="false">Ngưng hoạt động</MenuItem> */}
                </Select>
                <TextField
                    fullWidth
                    label="Thời gian học ( phút )"
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
