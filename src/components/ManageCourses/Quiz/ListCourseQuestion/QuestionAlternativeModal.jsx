import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { fetchData } from '../../../../services/AppService';
import Swal from 'sweetalert2';
import { isValidEditSize, removeEmptyPTagsWithBr } from '../../../../util/Utilities';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Radio, TextField, Typography } from '@material-ui/core';
import Loading from '../../../Loading/Loading';
import { Form } from 'react-hook-form';
import { handleImageUpload } from '../../../../util/firebase';
import ReactQuill from 'react-quill';

const QuestionAlternativeModal = ({ isOpen, onClose, onSave, onUpdate, question, subject, course, lesson }) => {
    const [editedQuestion, setEditedQuestion] = useState({
        content: "",
        answers: [
            { id: 0, content: "", isCorrect: false },
            { id: 1, content: "", isCorrect: false },
            { id: 2, content: "", isCorrect: false },
            { id: 3, content: "", isCorrect: false },
        ],
        correctAnswerId: null,
    });
    const [subjectItem, setSubjectItem] = useState(null)
    const [courseItem, setCourseItem] = useState(null)
    const [lessonItem, setLessonItem] = useState(null)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token && subject && course && lesson) {
            try {
                fetchData(`/subject/byId?subject-id=${subject}`, token).then(resp => {
                    if (resp) {
                        setSubjectItem(resp);
                        fetchData(`/course/byId?id=${course}`, token).then(resp => {
                            if (resp) {
                                setCourseItem(resp)
                                fetchData(`/lesson/byId?id=${lesson}`, token).then(resp => {
                                    if (resp) {
                                        setLessonItem(resp)
                                    }
                                }).catch(err => {
                                    console.log(err)
                                })
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    }, [subject, course, lesson])

    useEffect(() => {
        if (question) {
            // If a question is provided for editing
            setEditedQuestion({
                id: question.id,
                content: question.content,
                answers: question.answers.map((answer) => ({ ...answer })), // Create a new array of answers to avoid modifying the original question
                correctAnswerId: question.answers.find((answer) => answer.isCorrect)?.id || null,
            });
        } else {
            // If adding a new question
            setEditedQuestion({
                content: "",
                answers: [
                    { id: 0, content: "", isCorrect: false },
                    { id: 1, content: "", isCorrect: false },
                    { id: 2, content: "", isCorrect: false },
                    { id: 3, content: "", isCorrect: false },
                ],
                correctAnswerId: null,
            });
        }
    }, [question]);

    const handleInputChange = async (fieldName, e, answerId) => {
        if (fieldName === "content") {
            if (editedQuestion.content.length <= 250) {
                // Update question content
                setEditedQuestion({ ...editedQuestion, content: String(e) });
            }
        } else {
            // Update answer content
            const updatedAnswers = editedQuestion.answers.map((answer) => {
                if (answer.id === answerId) {
                    if (answer.content.length <= 250) {
                        return { ...answer, content: String(e) };
                    }
                }
                return answer;
            });
            setEditedQuestion({ ...editedQuestion, answers: updatedAnswers });
        }
    };


    const handleSave = async () => {
        if (!editedQuestion.content
            || removeEmptyPTagsWithBr(editedQuestion.answers[0].content) === ''
            || removeEmptyPTagsWithBr(editedQuestion.answers[1].content) === ''
            || removeEmptyPTagsWithBr(editedQuestion.answers[2].content) === ''
            || removeEmptyPTagsWithBr(editedQuestion.answers[3].content) === ''
            || editedQuestion.correctAnswerId === null) {
            // Show an error message or handle the validation as needed
            clearModal();
            Swal.fire({
                title: "Warning",
                text: "Điền tất cả các trường",
                icon: "warning"
            });
            return;
        }
        const updatedAnswers = editedQuestion.answers.map((answer, index) => {
            if (answer.id === editedQuestion.correctAnswerId) {
                return { ...answer, isCorrect: true };
            }
            return { ...answer, isCorrect: false };
        });
        // if (question) {
        onSave({
            ...editedQuestion,
            answers: updatedAnswers
        });

        clearModal();
    };

    const handleAnswerChange = (e) => {
        setEditedQuestion((prevQuestion) => ({
            ...prevQuestion,
            correctAnswerId: parseInt(e.target.value),
        }));
    };

    // const [form,] = Form.useForm();
    const reactQuillRef = useRef();
    const reactQuillAnswer1Ref = useRef();
    const reactQuillAnswer2Ref = useRef();
    const reactQuillAnswer3Ref = useRef();
    const reactQuillAnswer4Ref = useRef();



    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const fileSizeInMB = file.size / (1024 * 1024); // Convert to megabytes
                const maxFileSize = 2; // Maximum allowed file size in megabytes
                if (fileSizeInMB > maxFileSize) {
                    alert('Hình không được quá 2MB');
                    // Clear the file input to prevent uploading the large file
                    input.value = '';
                } else {
                    // Proceed with the image upload logic
                    // uploadImage(file);
                    handleImageUpload(file)
                        .then((url) => {
                            const quill = reactQuillRef.current;
                            if (quill) {
                                const range = quill.getEditorSelection();
                                range && quill.getEditor().insertEmbed(range.index, "image", url);
                            }
                        })
                        .catch((error) => {
                            console.error('Image upload failed:', error);
                        });
                }

            }
        };
    }, []);

    const imageHandler1 = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const fileSizeInMB = file.size / (1024 * 1024); // Convert to megabytes
                const maxFileSize = 2; // Maximum allowed file size in megabytes
                if (fileSizeInMB > maxFileSize) {
                    alert('Hình không được quá 2MB');
                    // Clear the file input to prevent uploading the large file
                    input.value = '';
                } else {
                    // Proceed with the image upload logic
                    // uploadImage(file);
                    handleImageUpload(file)
                        .then((url) => {
                            const quill = reactQuillAnswer1Ref.current;
                            if (quill) {
                                const range = quill.getEditorSelection();
                                range && quill.getEditor().insertEmbed(range.index, "image", url);
                            }
                        })
                        .catch((error) => {
                            console.error('Image upload failed:', error);
                        });
                }

            }
        };
    }, []);

    const imageHandler2 = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const fileSizeInMB = file.size / (1024 * 1024); // Convert to megabytes
                const maxFileSize = 2; // Maximum allowed file size in megabytes
                if (fileSizeInMB > maxFileSize) {
                    alert('Hình không được quá 2MB');
                    // Clear the file input to prevent uploading the large file
                    input.value = '';
                } else {
                    // Proceed with the image upload logic
                    // uploadImage(file);
                    handleImageUpload(file)
                        .then((url) => {
                            const quill = reactQuillAnswer2Ref.current;
                            if (quill) {
                                const range = quill.getEditorSelection();
                                range && quill.getEditor().insertEmbed(range.index, "image", url);
                            }
                        })
                        .catch((error) => {
                            console.error('Image upload failed:', error);
                        });
                }

            }
        };
    }, []);

    const imageHandler3 = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const fileSizeInMB = file.size / (1024 * 1024); // Convert to megabytes
                const maxFileSize = 2; // Maximum allowed file size in megabytes
                if (fileSizeInMB > maxFileSize) {
                    alert('Hình không được quá 2MB');
                    // Clear the file input to prevent uploading the large file
                    input.value = '';
                } else {
                    // Proceed with the image upload logic
                    // uploadImage(file);
                    handleImageUpload(file)
                        .then((url) => {
                            const quill = reactQuillAnswer3Ref.current;
                            if (quill) {
                                const range = quill.getEditorSelection();
                                range && quill.getEditor().insertEmbed(range.index, "image", url);
                            }
                        })
                        .catch((error) => {
                            console.error('Image upload failed:', error);
                        });
                }

            }
        };
    }, []);

    const imageHandler4 = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const fileSizeInMB = file.size / (1024 * 1024); // Convert to megabytes
                const maxFileSize = 2; // Maximum allowed file size in megabytes
                if (fileSizeInMB > maxFileSize) {
                    alert('Hình không được quá 2MB');
                    // Clear the file input to prevent uploading the large file
                    input.value = '';
                } else {
                    // Proceed with the image upload logic
                    // uploadImage(file);
                    handleImageUpload(file)
                        .then((url) => {
                            console.log(url);
                            const quill = reactQuillAnswer4Ref.current;
                            if (quill) {
                                const range = quill.getEditorSelection();
                                range && quill.getEditor().insertEmbed(range.index, "image", url);
                            }
                        })
                        .catch((error) => {
                            console.error('Image upload failed:', error);
                        });
                }

            }
        };
    }, []);

    const createCustomImageHandler = (index) => {
        return () => imageHandler(index);
    };

    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['image'],
                ['clean'],
                [{ 'color': [] }]
            ],
            handlers: {
                image: imageHandler // Pass your desired index here
            }
        },
    };

    const mapIndexAndRef = [
        // {
        //     index: 0,
        //     ref: reactQuillRef,
        // },
        {
            index: 0,
            ref: reactQuillAnswer1Ref,
            handler: imageHandler1
        },
        {
            index: 1,
            ref: reactQuillAnswer2Ref,
            handler: imageHandler2
        },
        {
            index: 2,
            ref: reactQuillAnswer3Ref,
            handler: imageHandler3
        },
        {
            index: 3,
            ref: reactQuillAnswer4Ref,
            handler: imageHandler4
        }
    ]

    const handleOnClose = () => {
        clearModal()
        onClose()
    }


    const clearModal = () => {
        reactQuillRef.current.value = ''
        reactQuillAnswer1Ref.current.value = ''
        reactQuillAnswer2Ref.current.value = ''
        reactQuillAnswer3Ref.current.value = ''
        reactQuillAnswer4Ref.current.value = ''

        setEditedQuestion({
            content: "",
            answers: [
                { id: 0, content: "", isCorrect: false },
                { id: 1, content: "", isCorrect: false },
                { id: 2, content: "", isCorrect: false },
                { id: 3, content: "", isCorrect: false },
            ],
            correctAnswerId: null,
        });
        onClose();
    };

    return (
        loading ? <Loading /> : <Dialog open={isOpen} onClose={handleOnClose} fullWidth>
            <DialogTitle>
                <Typography variant="h5" gutterBottom>
                    {question ? 'Chi tiết câu hỏi' : 'Thêm mới câu hỏi'}
                </Typography>
            </DialogTitle>
            <DialogContent>
                {subjectItem && courseItem && lessonItem && <>
                    <Typography variant="subtitle1" gutterBottom>
                        Tên môn học: {subjectItem?.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Tên khóa học: {courseItem?.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Tên bài học: {lessonItem?.name}
                    </Typography>
                </>}
                <Typography variant="subtitle1" gutterBottom color='primary'>
                    Câu hỏi:
                </Typography>
                <ReactQuill
                    name="content"
                    ref={reactQuillRef}
                    value={editedQuestion.content}
                    onChange={(e) => handleInputChange('content', e)}
                    modules={modules}
                />

                <Typography variant="subtitle1" gutterBottom color='primary'>
                    Câu trả lời:
                </Typography>
                {editedQuestion && editedQuestion.answers.length > 0 && editedQuestion.answers.map((answer, index) => {
                    return (
                        <div key={answer.id}>
                            <ReactQuill
                                ref={mapIndexAndRef[index].ref}
                                name={`answer_${answer.id}`}
                                value={answer.content}
                                onChange={(e) => handleInputChange('', e, answer.id)}
                                modules={{
                                    toolbar: {
                                        container: [
                                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                            ['bold', 'italic', 'underline'],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                            [{ 'align': [] }],
                                            ['image'],
                                            ['clean'],
                                            [{ 'color': [] }]
                                        ],
                                        handlers: {
                                            image: mapIndexAndRef[index].handler // Pass your desired index here
                                        }
                                    },
                                }}
                            />
                            <div className='my-3 d-flex align-items-center'>
                                <Radio
                                    name="correctAnswer"
                                    value={answer.id.toString()}
                                    checked={editedQuestion.correctAnswerId === answer.id}
                                    onChange={handleAnswerChange}
                                />
                                <label className=''>Chọn cho câu trả lời đúng</label>
                            </div>
                        </div>
                    )
                })}
            </DialogContent>
            <DialogActions>
                <button className='btn btn-outline-secondary' onClick={handleOnClose}>
                    Hủy
                </button>
                <button className='btn btn-success' onClick={handleSave}>
                    Lưu
                </button>
            </DialogActions>
        </Dialog>
    )
}

export default QuestionAlternativeModal;
