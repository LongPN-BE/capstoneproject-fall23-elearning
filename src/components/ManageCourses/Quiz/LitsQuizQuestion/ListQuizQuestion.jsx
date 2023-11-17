import Cookies from 'js-cookie'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { fetchData, postData } from '../../../../services/AppService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core'
import QuestionModel from '../ListCourseQuestion/QuestionModel'
import QuestionQuizModal from './QuestionQuizModal'
import QuestionBankModal from '../ListCourseQuestion/QuestionBankModal'
import Swal from 'sweetalert2'

const ListQuizQuestion = () => {
    const { courseId, syllabusId, lessonId, quizId } = useParams();
    const [questions, setQuestions] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBankModalOpen, setIsBankModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null); // Track the selected question for editing
    const [data, setData] = useState()
    const navigate = useNavigate()

    function sortUsedAnswersById(data) {
        return data.map(item => ({
            ...item,
            usedAnswers: item.usedAnswers.slice().sort((a, b) => a.id - b.id)
        }));
    }

    useEffect(() => {
        const token = Cookies.get('token')
        if (token) {
            fetchData(`/quiz/byId?quiz_id=${quizId}`, token).then(resp => {
                if (resp && resp.status === "Active") {
                    navigate(-1)
                } else {
                    fetchData(`/used-question/by-quiz?quiz_id=${quizId}`, token).then((resp) => {
                        if (resp) {
                            const sortedData = sortUsedAnswersById(resp);
                            setQuestions(sortedData)
                        }
                    })
                }
            })

        }
    }, [quizId])

    const openModal = (question) => {
        setSelectedQuestion(question); // Set the selected question for editing
        setIsModalOpen(true);
    };

    const openBankModal = async () => {
        const token = Cookies.get('token')
        await fetchData(`/lesson/byCourseId?course_id=${courseId}`, token).then(resp => {
            if (resp) {
                setData(resp)
            }
        })
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
        const token = Cookies.get('token');
        if (token) {
            if (selectedQuestion) {
                // Editing an existing question
                const indexChange = newQuestion?.usedAnswers.findIndex((i) => i.id === newQuestion.correctAnswerId);
                if (indexChange !== -1) {
                    // If the object with the specified ID is found in the answerBank
                    const updatedAnswerBank = newQuestion.usedAnswers.map((item, index) => {
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

                    newQuestion.usedAnswers = updatedAnswerBank; // Update the answerBank in newQuestion
                }


                const updatedQuestions = questions.map((question) =>
                    question.id === selectedQuestion.id ? newQuestion : null
                );
                const questionBody = updatedQuestions.find(tmp => tmp && tmp)
                postData(`/used-answer/saveAll`, questionBody.usedAnswers, token).then(resp => {
                    if (resp) {
                        const idList = resp.map(item => item.id);
                        const body = {
                            id: questionBody.id,
                            content: newQuestion?.content,
                            quizId: quizId,
                            usedAnswers: idList
                        }
                        postData(`/used-question/save`, body, token).then(resp => {
                            if (resp) {
                                window.location.reload()
                            }
                        })
                    }
                })
            } else {
                const newAnswers = newQuestion?.answers.map(({ id, ...rest }) => rest);
                postData(`/used-answer/saveAll`, newAnswers, token).then(resp => {
                    if (resp) {
                        const idList = resp.map(item => item.id);
                        const body = {
                            content: newQuestion?.content,
                            quizId: quizId,
                            usedAnswers: idList
                        }
                        postData(`/used-question/save`, body, token).then(resp => {
                            if (resp) {
                                window.location.reload()
                            }
                        })
                    }
                })
            }
        }
        closeModal();
    };

    const handleBankSave = async (items) => {
        console.log(items)
        const token = Cookies.get('token')
        if (token) {
            await items.forEach(element => {
                const usedAnswers = element?.answers.map(i => i.id)
                const body = {
                    content: element?.content,
                    quizId: quizId,
                    usedAnswers: usedAnswers
                }
                postData('/used-question/save', body, token).then(resp => {
                    if (resp) {
                        window.location.reload()
                    }
                })
            });
        }
        closeBankModal()
    }

    const handleComplete = async () => {
        const token = Cookies.get('token')
        if (token) {
            fetchData(`/quiz/byId?quiz_id=${quizId}`, token).then(resp => {
                if (resp) {
                    const body = {
                        ...resp,
                        lessonId: resp.lesson.id,
                        status: 'Active'
                    }
                    postData('/quiz/save', body, token).then(resp => {
                        if (resp) {
                            navigate(-1)
                        }
                    })
                }
            })
        }
    };


    const showConfirmationDialog = () => {
        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Bạn sẽ không thể thay đổi nếu bạn đồng ý',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Tôi đồng ý',
        }).then((result) => {
            if (result.isConfirmed) {
                // If the user clicks "Yes, complete it!"
                handleComplete(); // Call the function to handle completion
            }
        });
    };

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
        questions && (
            <div className="m-5">
                <div style={{ margin: '20px' }}>
                    <Paper style={{ padding: '20px' }}>
                        <Typography variant="body1">
                            <Link to={'/'}>Trang chủ </Link>{'>'} <Link to={'/manage-course'}>Quản lý khóa học </Link>{'>'} <Link to={`/courses/${courseId}`}>Khóa học {courseId} </Link>
                            {'>'} <Link to={`/courses/${courseId}/syllabus/${syllabusId}`}>Khung chương trình {syllabusId} </Link>{'>'}
                            <Link to={`/courses/${courseId}/syllabus/${syllabusId}/lessons/${lessonId}`}>Bài học {lessonId}</Link> {'>'} Thêm câu hỏi
                        </Typography>
                        <div style={{ marginTop: '20px' }}>
                            <Button variant="outlined" onClick={() => openModal(null)}>
                                Tạo mới
                            </Button>
                            <Button variant="outlined" className='mx-3' onClick={openBankModal}>
                                Thêm từ ngân hàng câu hỏi
                            </Button>
                        </div>

                        <Table style={{ marginTop: '20px' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell >Nội dung câu hỏi</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {questions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((question, index) => (
                                    <>
                                        <TableRow key={question.id}>
                                            <TableCell>{++index}</TableCell>
                                            <TableCell>{question.content}</TableCell>
                                            <TableCell>
                                                <Button variant="outlined" onClick={() => openModal(question)}>Chi tiết</Button>
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
                        </Table>
                        {
                            questions && questions.length > 0 && <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                component="div"
                                count={questions.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        }
                        {questions && questions.length > 0 && <div className='text-end '>
                            <button style={{ marginTop: '20px' }} className='btn btn-outline-primary' onClick={showConfirmationDialog}>
                                Hoàn thành
                            </button>

                        </div>}

                    </Paper>
                </div>

                {/* Question Model */}
                <QuestionQuizModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSave={handleSave}
                    onUpdate={handleSave}
                    question={selectedQuestion}
                />

                <QuestionBankModal
                    isOpen={isBankModalOpen}
                    onClose={closeBankModal}
                    onSave={handleBankSave}
                    data={data}
                />
            </div>
        )
    );
}

export default ListQuizQuestion
