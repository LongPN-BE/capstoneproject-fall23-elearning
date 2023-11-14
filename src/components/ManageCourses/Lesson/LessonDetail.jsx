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
    Select,
    MenuItem,
    TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import QuizModal from '../Quiz/QuizModal';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import CreateQuizModal from '../Quiz/CreateQuizModal';
import { sortByID } from '../../../util/Utilities';

export default function LessonDetail() {
    const { courseId, syllabusId, lessonId } = useParams();
    const [data, setData] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('all'); // Default value
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [totalQuiz, setTotalQuiz] = useState(0)
    const [openQuiz, setOpenQuiz] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            fetchData(`/quiz/byLesson?lesson_id=${lessonId}`, token).then(resp => {
                if (resp) {
                    const quizList = sortByID(resp)
                    setData(quizList)
                    setTotalQuiz(resp.length)
                }
            }).catch(err => console.log(err))
        }
    }, [courseId, syllabusId, lessonId]);

    useEffect(() => {
        filterData(selectedStatus, searchValue);
    }, [data, selectedStatus, searchValue]);

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const filterData = (status, searchInput) => {
        const filteredData = data && data.filter((quiz) => {
            const statusMatch = status === 'all' || quiz.status === status;
            const searchMatch =
                searchInput === '' || quiz.title.toLowerCase().includes(searchInput.toLowerCase());
            return statusMatch && searchMatch;
        });

        setFilteredData(filteredData);
    };


    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseQuiz = () => {
        setOpenQuiz(false);
    };

    const handleSaveQuiz = async (formData) => {
        const token = Cookies.get('token')
        if (token) {
            const body = {
                title: formData.title,
                passScore: parseInt(formData.passScore),
                status: formData.status,
                duration: parseInt(formData.duration),
                dateRange: 0,
                allowAttempt: parseInt(formData.allowAttempt),
                proportion: parseInt(formData.proportion),
                lessonId: parseInt(lessonId)
            }
            await postData('/quiz/save', body, token).then(resp => {
                if (resp) {
                    window.location.reload()
                }
            })
        }
    }

    return (
        data && (
            <div className="m-5">
                <div style={{ margin: '20px' }}>
                    <Paper style={{ padding: '20px' }}>
                        <Typography variant="body1" style={{ color: 'darkblue' }}>
                            <Link to={'/'}>Trang chủ </Link>{'>'} <Link to={'/manage-course'}>Quản lý khóa học </Link>{'>'} <Link to={`/courses/${courseId}`}>Khóa học {courseId} </Link>
                            {'>'} <Link to={`/courses/${courseId}/syllabus/${syllabusId}`}>Khung chương trình {syllabusId} </Link>{'>'} Bài học {lessonId} {'>'} Danh sách bài kiểm tra
                        </Typography>
                        <div style={{ marginTop: '20px' }} className='d-flex align-items-center'>
                            <TextField
                                label="Tổng số bài kiểm tra"
                                autoFocus
                                margin="dense"
                                value={totalQuiz}
                            />

                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <Button variant="outlined" onClick={() => setOpenQuiz(true)}>
                                Tạo bài kiểm tra
                            </Button>
                            {/* <Button variant="outlined" className='mx-3' onClick={openBankModal}>
                                Thêm từ ngân hàng câu hỏi
                            </Button> */}
                        </div>


                        <div
                            style={{ marginTop: '20px' }}
                            className="d-flex align-items-center"
                        >
                            <Typography variant="h6">Danh sách bài kiểm tra</Typography>
                            <InputBase
                                placeholder="Search"
                                style={{ marginLeft: '20px' }}
                                startAdornment={<Search />}
                                onChange={handleSearchChange}
                            />
                            <Select
                                value={selectedStatus}
                                onChange={handleStatusChange}
                                style={{ marginLeft: '20px' }}
                            >
                                <MenuItem value="all">Tất cả</MenuItem>
                                <MenuItem value="Active">Hoạt động</MenuItem>
                                <MenuItem value="Deactive">Không hoạt động</MenuItem>
                                {/* Add other statuses as menu items */}
                            </Select>

                        </div>

                        <Table style={{ marginTop: '20px' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Tên bài kiểm tra</TableCell>
                                    <TableCell>Điểm qua môn</TableCell>
                                    <TableCell>Thời gian làm bài</TableCell>
                                    <TableCell>Thời gian có thể làm</TableCell>
                                    <TableCell>Số lần làm lại</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData && filteredData.length > 0 && filteredData.map((s, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{s.title}</TableCell>
                                            <TableCell>{s.passScore}</TableCell>
                                            <TableCell>{s.duration}</TableCell>
                                            <TableCell>{s.dateRange}</TableCell>
                                            <TableCell>{s.allowAttempt}</TableCell>
                                            <TableCell>{s.status}</TableCell>
                                            <TableCell>
                                                <Link className="btn btn-outline-secondary" to={`/courses/${courseId}/syllabus/${syllabusId}/lessons/${lessonId}/quiz/${s.id}`}>
                                                    Chi tiết
                                                </Link>
                                                {'Deactive' === s.status && <Link className="btn btn-outline-secondary mx-2" to={`/courses/${courseId}/syllabus/${syllabusId}/lessons/${lessonId}/quiz/${s.id}/questions`}>
                                                    Thêm câu hỏi
                                                </Link>}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>

                    </Paper>
                </div>
                <QuizModal isOpen={open} onClose={handleClose} />
                <CreateQuizModal open={openQuiz} onClose={handleCloseQuiz} onSave={handleSaveQuiz} />
            </div>
        )
    );
}
