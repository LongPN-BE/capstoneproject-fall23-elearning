/* eslint-disable jsx-a11y/img-redundant-alt */
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
    TablePagination,
} from '@material-ui/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import LessonModal from '../../Lesson/LessonModal'; // Import the LessonModal component
import { courseQuestionBank } from '../../../mock/mock-data';
import QuestionModel from '../../ManageCourses/Quiz/ListCourseQuestion/QuestionModel';
import QuestionBankModal from '../../ManageCourses/Quiz/ListCourseQuestion/QuestionBankModal';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import { useCallback } from 'react';
import QuestionAlternativeModal from '../../ManageCourses/Quiz/ListCourseQuestion/QuestionAlternativeModal';
import './ListQuestionBank.css'

export default function ListQuestionBank() {
    const urlParams = new URLSearchParams(window.location.search);
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
            if (question.content.indexOf("https://") == 0) {
                question.type = 'image'
            }
        }
    }

    useEffect(() => {
        // Replace this with your actual data fetching logic for questions
        // Function to get the value of a specific query parameter from the URL
        const getQueryParamValue = (param) => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        };

        const token = Cookies.get('token');
        if (token) {
            try {
                fetchData('/subject/subjects', token).then(resp => {
                    if (resp) {
                        setSubject(resp);
                        // Get the value of the 'yourQueryParam' after the page reloads
                        const subjectId = getQueryParamValue('subjectId');
                        const courseId = getQueryParamValue('courseId');
                        const lessonId = getQueryParamValue('lessonId');
                        setSubjectItem(subjectId ? subjectId : resp[0]?.id);
                        fetchData(`/course/bySubjectId?subject-id=${subjectId ? subjectId : resp[0]?.id}`, token).then(resp => {
                            if (resp) {
                                setCourse(resp)
                                setCourseItem(courseId ? courseId : resp[0]?.id)
                                fetchData(`/lesson/byCourseId?course_id=${courseId ? courseId : resp[0]?.id}`, token).then(resp => {
                                    if (resp) {
                                        setLesson(resp)
                                        setLessonItem(lessonId ? lessonId : resp[0]?.id)
                                        fetchData(`/question/byLessonId?lesson_id=${lessonId ? lessonId : resp[0]?.id}`, token).then(resp => {
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
                courseId: courseItem,
                lessonId: lessonItem,
                answers: newQuestion.answers
            }
            // console.log(body);
            postData('/question/save', body, token).then((resp) => {
                if (resp) {
                    // Set or update the desired query parameter
                    urlParams.set('subjectId', subjectItem);
                    urlParams.set('courseId', courseItem);
                    urlParams.set('lessonId', lessonItem);

                    // Replace the current URL with the updated URL containing the new query parameter
                    const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
                    window.history.replaceState({}, '', newUrl);
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
            // console.log(body);
            postData('/question/save', body, token).then((resp) => {
                if (resp) {
                    // Set or update the desired query parameter
                    urlParams.set('subjectId', subjectItem);
                    urlParams.set('courseId', courseItem);
                    urlParams.set('lessonId', lessonItem);

                    // Replace the current URL with the updated URL containing the new query parameter
                    const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
                    window.history.replaceState({}, '', newUrl);
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
                                sortAnswersById(resp)
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

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Change page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Change the number of rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - questions.length) : 0;

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
                                            {s.name}
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
                                    <button className='btn btn-success' onClick={() => openModal(null)}>
                                        Tạo mới
                                    </button>
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
                                {questions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((question, index) => (
                                    <>
                                        <TableRow key={question.id} className='list-question-bank'>
                                            <TableCell>{++index}</TableCell>
                                            {question?.type ? <TableCell><img src={question.content} alt="img" width={200} height={200} /></TableCell>
                                                : <TableCell><div dangerouslySetInnerHTML={{ __html: question?.content }}></div></TableCell>}
                                            <TableCell>
                                                <Button variant="outlined" onClick={() => openModal(question)}>
                                                    Chỉnh sửa
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </>
                                ))}
                            </TableBody>
                        </Table> : <div className='text-center mt-5'><h3>Không có bài kiểm tra cho bài học này</h3></div>}
                        {questions && questions.length > 0 && <TablePagination
                            labelRowsPerPage="Số hàng trên trang :"
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={questions.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />}
                    </Paper>
                </div>

                {/* Question Model */}
                {/* <QuestionModel
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSave={handleSave}
                    onUpdate={handleSave}
                    question={selectedQuestion} // Pass the selected question for editing
                    subject={subjectItem}
                    course={courseItem}
                    lesson={lessonItem}
                /> */}
                <QuestionAlternativeModal
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
