import React, { useEffect, useState } from 'react';
import {
    Button,
    Typography,
    InputBase,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Select,
    MenuItem,
    InputLabel,
} from '@material-ui/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import LessonModal from '../../Lesson/LessonModal'; // Import the LessonModal component
import { courseQuestionBank } from '../../../mock/mock-data';
import QuestionModel from '../../ManageCourses/Quiz/ListCourseQuestion/QuestionModel';
import QuestionBankModal from '../../ManageCourses/Quiz/ListCourseQuestion/QuestionBankModal';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import { useCallback } from 'react';

export default function ListQuestionBank() {
    const [questions, setQuestions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBankModalOpen, setIsBankModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null); // Track the selected question for editing
    const [subjectItem, setSubjectItem] = useState(null);
    const [course, setCourse] = useState();
    const [courseItem, setCourseItem] = useState();
    const navigate = useNavigate();
    const [subject, setSubject] = useState();
    const [lesson, setLesson] = useState();
    const [lessonItem, setLessonItem] = useState()

    function sortAnswersById(questions) {
        for (const question of questions) {
            question.answers.sort((a, b) => a.id - b.id);
        }
    }

    useEffect(() => {
        // Replace this with your actual data fetching logic for questions

        const token = Cookies.get('token');
        if (token) {
            try {
                fetchData('/subject/subjects', token).then(resp => {
                    if (resp) {
                        setSubject(resp);
                        setSubjectItem(resp[0]?.id);
                        fetchData(`/course/bySubjectId?subject-id=${resp[0]?.id}`, token).then(resp => {
                            if (resp) {
                                setCourse(resp)
                                setCourseItem(resp[0]?.id)
                                fetchData(`/lesson/byCourseId?course_id=${resp[0]?.id}`, token).then(resp => {
                                    if (resp) {
                                        setLesson(resp)
                                        setLessonItem(resp[0]?.id)
                                        fetchData(`/question/byLessonId?lesson_id=${resp[0]?.id}`, token).then(resp => {
                                            if (resp) {
                                                sortAnswersById(resp)
                                                setQuestions(resp);
                                            }
                                        }).catch(err => {
                                            console.log(err)
                                        })
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
    }, []);

    const openModal = (question) => {
        setSelectedQuestion(question); // Set the selected question for editing
        setIsModalOpen(true);
    };

    const openBankModal = () => {
        setIsBankModalOpen(true);
    }

    const closeBankModal = () => {
        setIsBankModalOpen(false);
    }

    const closeModal = () => {
        setSelectedQuestion(null); // Clear the selected question
        setIsModalOpen(false);
    };

    const handleSave = (newQuestion) => {
        const token = Cookies.get('token')
        if (selectedQuestion) {
            // Editing an existing question
            const indexChange = newQuestion?.answers.findIndex((i) => i.id === newQuestion.correctAnswerId);
            if (indexChange !== -1) {
                // If the object with the specified ID is found in the answerBank
                const updatedAnswerBank = newQuestion.answers.map((item, index) => {
                    if (index == indexChange) {
                        // Create a new object for each item in the answerBank
                        return {
                            ...item,
                            isCorrect: true, // Set isCorrect to false for all items
                            // Add other updated properties here if needed
                        };
                    }
                    else {
                        return {
                            ...item,
                            isCorrect: false,
                        };
                    }
                });

                newQuestion.answers = updatedAnswerBank; // Update the answerBank in newQuestion
            }

            const body = {
                id: newQuestion.id,
                content: newQuestion.content,
                courseId: newQuestion.course.id,
                lessonId: newQuestion.lesson.id,
                answers: newQuestion.answers
            }
            postData('/question/save', body, token).then((resp) => {
                if (resp) {
                    window.location.reload()
                }
            }).catch(err => console.log(err))
            // setQuestions(updatedQuestions);
        } else {
            // Adding a new question
            // remove answer id to 0 for adding purpose
            const updatedItems = newQuestion.answers.map(item => ({ ...item, id: 0 }));
            const body = {
                id: 0,
                content: newQuestion.content,
                courseId: courseItem,
                lessonId: lessonItem,
                answers: updatedItems
            }
            postData('/question/save', body, token).then((resp) => {
                if (resp) {
                    window.location.reload()
                }
            }).catch(err => console.log(err))
        }
        closeModal();
    };

    const handleOnChangeSubject = useCallback((id) => {
        const token = Cookies.get('token');
        setSubjectItem(id)
        if (token) {
            fetchData(`/course/bySubjectId?subject-id=${id}`, token).then(resp => {
                if (resp && resp.length > 0) {
                    setCourse(resp)
                    setCourseItem(resp[0]?.id)
                } else {
                    setCourse(resp)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }, [])

    const handleOnChangeLesson = useCallback((id) => {
        const token = Cookies.get('token');
        setLessonItem(id)
        if (token) {
            fetchData(`/question/byLessonId?lesson_id=${id}`, token).then(resp => {
                if (resp) {
                    setQuestions(resp);
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }, [courseItem])

    const handleOnChangeCourse = useCallback((id) => {
        const token = Cookies.get('token');
        setCourseItem(id)
        if (token) {
            fetchData(`/lesson/byCourseId?course_id=${id}`, token).then(resp => {
                if (resp && resp.length > 0) {
                    setLesson(resp)
                    if (resp[0].id) {
                        setLessonItem(resp[0]?.id)
                        fetchData(`/question/byLessonId?lesson_id=${resp[0]?.id}`, token).then(resp => {
                            if (resp) {
                                setQuestions(resp);
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }

                } else {
                    setLesson(resp)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }, [subjectItem])

    return (
        subjectItem && (
            <div className="m-5">
                <div style={{ margin: '20px' }}>
                    <Paper style={{ padding: '20px' }}>
                        <Typography variant="body1">
                            Trang chủ {'>'} Ngân hàng câu hỏi
                        </Typography>
                        <div style={{ marginTop: '20px' }}>
                            <div className='d-flex align-items-center'>
                                <InputLabel htmlFor="subject">Môn học</InputLabel>
                                <Select
                                    id="subject"
                                    value={subjectItem}
                                    label="Môn học"
                                    onChange={(e) => handleOnChangeSubject(e.target.value)}
                                    className='col-6 mx-2'
                                >
                                    {subject?.length > 0 && subject.map((s) => (
                                        <MenuItem key={s.id} value={s.id}>
                                            {s.description}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        {course && course.length > 0 && (
                            <div style={{ marginTop: '20px' }}>
                                <div className='d-flex align-items-center'>
                                    <InputLabel htmlFor="course">Khoá học</InputLabel>
                                    <Select
                                        id="course"
                                        value={courseItem}
                                        label="Khóa học"
                                        onChange={(e) => handleOnChangeCourse(e.target.value)}
                                        className='col-6 mx-2'
                                    >
                                        {course.map((s) => (
                                            <MenuItem key={s.id} value={s.id}>
                                                {s.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        )}

                        {lesson && lesson.length > 0 ? (
                            <>
                                <div style={{ marginTop: '20px' }}>
                                    <div className='d-flex align-items-center'>
                                        <InputLabel htmlFor="lesson">Bài học</InputLabel>
                                        <Select
                                            id="lesson"
                                            value={lessonItem}
                                            label="Bài học"
                                            onChange={(e) => handleOnChangeLesson(e.target.value)}
                                            className='col-6 mx-2'
                                        >
                                            {lesson.map((s) => (
                                                <MenuItem key={s.id} value={s.id}>
                                                    {s.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <Button variant="outlined" onClick={() => openModal(null)}>
                                        Tạo mới
                                    </Button>
                                </div>
                            </>
                        ) : <div className=' mt-3'><h5>Không có bài học cho khóa học này</h5></div>}


                        {questions && questions.length > 0 ? <Table style={{ marginTop: '20px' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Nội dung câu hỏi</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questions.map((question, index) => (
                                    <TableRow key={question.id}>
                                        <TableCell>{++index}</TableCell>
                                        <TableCell>{question.content}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined" onClick={() => openModal(question)}>
                                                Chỉnh sửa
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table> : <div className='text-center mt-5'><h3>Không có bài kiểm tra cho bài học này</h3></div>}

                    </Paper>
                </div>

                {/* Question Model */}
                <QuestionModel
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSave={handleSave}
                    onUpdate={handleSave}
                    question={selectedQuestion} // Pass the selected question for editing
                    subject={subjectItem}
                    course={courseItem}
                    lesson={lessonItem}
                />

                {/* <QuestionBankModal
                    isOpen={isBankModalOpen}
                    onClose={closeBankModal}
                    onSave={handleBankSave}
                /> */}
            </div>

        ))
}
