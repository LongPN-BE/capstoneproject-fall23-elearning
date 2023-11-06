import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField, Typography, Button, Radio } from "@material-ui/core";
import { fetchData } from '../../../../services/AppService';
import Cookies from 'js-cookie';

const QuestionModel = ({ isOpen, onClose, onSave, onUpdate, question, subject, course, lesson }) => {
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

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
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

    const handleInputChange = (e, answerId) => {
        const { name, value, checked } = e.target;
        if (name === "content") {
            // Update question content
            setEditedQuestion({ ...editedQuestion, content: value });
        } else {
            // Update answer content
            const updatedAnswers = editedQuestion.answers.map((answer) => {
                if (answer.id === answerId) {
                    return { ...answer, content: value };
                }
                return answer;
            });
            setEditedQuestion({ ...editedQuestion, answers: updatedAnswers });
        }
    };

    const handleSave = () => {
        if (!editedQuestion.content || editedQuestion.answers.length < 2 || editedQuestion.correctAnswerId === null) {
            // Show an error message or handle the validation as needed
            alert("Please fill in all required fields.");
            return;
        }

        if (question) {
            // If editing an existing question, call the onUpdate function
            onUpdate({ ...question, ...editedQuestion });
        } else {
            // If adding a new question, call the onSave function
            // Set isCorrect: true for the correct answer
            const updatedAnswers = editedQuestion.answers.map((answer) => {
                if (answer.id === editedQuestion.correctAnswerId) {
                    return { ...answer, isCorrect: true };
                }
                return answer;
            });

            onSave({
                ...editedQuestion,
                answers: updatedAnswers,
            });
        }

        clearModal();
    };

    const clearModal = () => {
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

    const handleAnswerChange = (e) => {
        setEditedQuestion((prevQuestion) => ({
            ...prevQuestion,
            correctAnswerId: parseInt(e.target.value),
        }));
    };

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth>
            <DialogTitle>
                <Typography variant="h5" gutterBottom>
                    {question ? 'Chi tiết câu hỏi' : 'Thêm mới câu hỏi'}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" gutterBottom>
                    Tên môn học: {subjectItem?.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Tên khóa học: {courseItem?.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Tên bài học: {lessonItem?.name}
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Question Content"
                    autoFocus
                    margin="normal"
                    name="content"
                    value={editedQuestion.content}
                    onChange={handleInputChange}
                    required
                />
                <Typography variant="subtitle1" gutterBottom>
                    Answers:
                </Typography>
                {editedQuestion && editedQuestion.answers.length > 0 && editedQuestion.answers.map((answer, index) => (
                    <div key={answer.id}>
                        <TextField
                            fullWidth
                            // style={{ height: '2.2em !important' }}
                            label={`Answer ${index + 1}`}
                            autoFocus
                            margin="dense"
                            name={`answer_${answer.id}`}
                            value={answer.content}
                            onChange={(e) => handleInputChange(e, answer.id)}
                            required

                        />
                        <div className='my-3 d-flex align-items-center'>
                            <Radio
                                name="correctAnswer"
                                value={answer.id.toString()}
                                checked={editedQuestion.correctAnswerId === answer.id}
                                onChange={handleAnswerChange}
                            />
                            <label className=''>check for correct answer</label>
                        </div>
                    </div>
                ))}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default QuestionModel;
