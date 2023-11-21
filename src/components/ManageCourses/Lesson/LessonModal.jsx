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
import { isInteger, isValidSize, validateInputDigits, validateInputString } from '../../../util/Utilities';
import Swal from 'sweetalert2';
import { invalidInput } from '../../../util/Constants';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import storage from '../../../util/firebase';
import Loading from '../../Loading/Loading';


const LessonModal = ({ isOpen, onClose, onSave, onUpdate, lesson }) => {
    const [loading, setLoading] = useState(false);
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
        let values = fieldName === 'content' ? String(e) : fieldName === 'url' ? e.target.files[0] : e.target.value
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
        }

        if (!isInteger(editedLesson?.estimateTime)) {
            clearModal();
            Swal.fire({
                title: "Warning",
                text: "Thời gian học phải là số nguyên",
                icon: "warning"
            });
            return;
        }

        const isValidFileSize = isValidSize(25, editedLesson.url);
        if (!isValidFileSize) {
            clearModal();
            Swal.fire({
                title: "Warning",
                text: "Video không được quá 25MB",
                icon: "warning"
            });
            return;
        }

        if (lesson) {
            // If editing an existing lesson, call the onUpdate function
            onUpdate({ ...lesson, ...editedLesson });
        } else {
            setLoading(true);
            // Creating a reference to the file in Firebase Storage
            const storageRef = ref(storage, `/elearning/text/${editedLesson.url.name}`);

            // Starting the upload task
            const uploadTask = uploadBytesResumable(storageRef, editedLesson.url);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Calculating and updating the progress
                    // const percent = Math.round(
                    //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    // );
                    // setPercent(percent);
                },
                (err) => {
                    console.log(err);
                    setLoading(false);
                },
                () => {
                    // Getting the download URL after successful upload
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        // handleInputChange(url, 'url');
                        const lessonSave = { ...editedLesson, url: url }
                        onSave(lessonSave);
                        setLoading(false);
                    });
                }
            );

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
                ["code-block"],
                ["clean"],
            ],
        },
        clipboard: {
            matchVisual: false,
        },
    }

    return (
        loading ? <Loading /> : <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
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
                    onChange={(e) => {
                        console.log(e);
                        const inputValue = String(e);
                        // Set a character limit, for example, 200 characters
                        if (inputValue.length <= 4000) {
                            handleInputChange(e, 'content')
                        }
                    }}
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
                    type='number'
                    fullWidth
                    label="Thời gian học ( phút )"
                    autoFocus
                    margin="dense"
                    name="estimateTime"
                    value={editedLesson.estimateTime}
                    onChange={(e) => handleInputChange(e, 'estimateTime')}
                />
                <label className='my-3'>Video file {'( 25MB )'}</label>
                <input
                    type='file'
                    className='mx-2'
                    autoFocus
                    margin="dense"
                    name="url"
                    accept=".mov, .gif, .mp4, .mpeg, .mkv"
                    // value={editedLesson.url}
                    onChange={(e) => handleInputChange(e, 'url')}
                    required
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
