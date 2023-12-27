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
    TablePagination,
    Tooltip,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import QuizModal from '../Quiz/QuizModal';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import CreateQuizModal from '../Quiz/CreateQuizModal';
import { sortByID, validateInputDigits, validateInputString } from '../../../util/Utilities';
import Swal from 'sweetalert2';
import { invalidInput } from '../../../util/Constants';
import QuizDetailModal from '../Quiz/QuizDetailModal';
import CustomBreadcrumbs from '../../Breadcrumbs';
import ColorLabel, { dangerColor, primaryColor } from '../../../util/ColorLabel/ColorLabel';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { StickyNote2Outlined } from '@mui/icons-material';

export default function LessonDetail() {
    const { courseId, syllabusId, lessonId } = useParams();
    const [data, setData] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('all'); // Default value
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [totalQuiz, setTotalQuiz] = useState(0)
    const [openQuiz, setOpenQuiz] = useState(false);
    const [openQuizDetail, setOpenQuizDetail] = useState(false);
    const [quizId, setQuizId] = useState();
    const [course, setCourse] = useState()
    const [syllabus, setSyllabus] = useState()
    const [quiz, setQuiz] = useState();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            fetchData(`/course/byId?id=${courseId}`, token).then(resp => {
                if (resp) {
                    setCourse(resp)
                }
            })
            fetchData(`/syllabus/byId?id=${syllabusId}`, token).then(resp => {
                if (resp) {
                    setSyllabus(resp)
                }
            })
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

    const handleUpdateQuiz = (quiz) => {
        setOpenQuiz(true);
        setQuiz(quiz)
    }

    const handleSaveQuiz = async (formData) => {
        const token = Cookies.get('token')
        if (token) {
            const validString = validateInputString(formData.title);
            const validDigit = validateInputDigits(formData.passScore, formData.duration, formData.allowAttempt, formData.proportion)
            if (validDigit && validString) {
                const body = {
                    ...formData,
                    title: formData.title,
                    passScore: parseInt(formData.passScore),
                    status: formData.status,
                    duration: parseInt(formData.duration),
                    dateRange: parseInt(formData.dateRange),
                    allowAttempt: parseInt(formData.allowAttempt),
                    proportion: parseInt(formData.proportion),
                    lessonId: parseInt(lessonId)
                }
                await postData('/quiz/save', body, token).then(resp => {
                    if (resp) {
                        window.location.reload()
                    }
                })
            } else {
                handleCloseQuiz()
                Swal.fire({
                    title: "Cảnh báo",
                    text: invalidInput,
                    icon: "warning"
                });
            }
        }
    }

    // State to keep track of the current page and the number of rows per page
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filterData.length) : 0

    const breadcrumbItems = [
        {
            url: '/',
            label: 'Trang chủ',
        },
        {
            url: `/manage-course`,
            label: `Quản lý khóa học`,
        },
        {
            url: `/courses/` + courseId,
            label: course?.name,
        },
        {
            url: `/courses/` + courseId + `/syllabus/` + syllabusId,
            label: syllabus?.name,
        },
        {
            url: `/courses/` + courseId + `/syllabus/` + syllabusId + `/lessons/` + lessonId,
            label: 'Danh sách bài kiểm tra',
        },
    ];

    const navigate = useNavigate()

    return (
        data && (
            <div className="m-5">
                <div style={{ margin: '20px' }}>
                    <Paper style={{ padding: '20px' }}>
                        {/* <Typography variant="body1" style={{ color: 'darkblue' }}>
                            <Link to={'/'}>Trang chủ </Link>{'>'} <Link to={'/manage-course'}>Quản lý khóa học </Link>{'>'} <Link to={`/courses/${courseId}`}>Khóa học {courseId} </Link>
                            {'>'} <Link to={`/courses/${courseId}/syllabus/${syllabusId}`}>Khung chương trình {syllabusId} </Link>{'>'} Bài học {lessonId} {'>'} Danh sách bài kiểm tra
                        </Typography> */}
                        <CustomBreadcrumbs items={breadcrumbItems} />
                        <div style={{ marginTop: '20px' }} className='d-flex align-items-center'>
                            <TextField
                                label="Tổng số bài kiểm tra"
                                autoFocus
                                margin="dense"
                                value={totalQuiz}
                            />

                        </div>

                        {(course?.status !== 'ACTIVE' && course?.status !== 'PENDING') && <div style={{ marginTop: '20px' }}>
                            <button className='btn btn-success' onClick={() => {
                                setOpenQuiz(true)
                                setQuiz(null)
                            }}>
                                Tạo bài kiểm tra
                            </button>
                        </div>}


                        <div
                            style={{ marginTop: '20px' }}
                            className="d-flex align-items-center"
                        >
                            <Typography variant="h6">Danh sách bài kiểm tra</Typography>
                            <InputBase
                                placeholder="Tìm kiếm bằng tên"
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
                                    {/* <TableCell>Thời gian có thể làm</TableCell> */}
                                    <TableCell>Số lần làm lại</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData && filteredData.length > 0 && filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s, index) => {
                                    return (
                                        <>
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{s.title}</TableCell>
                                                <TableCell>{s.passScore}</TableCell>
                                                <TableCell>{s.duration}</TableCell>
                                                {/* <TableCell>{s.dateRange}</TableCell> */}
                                                <TableCell>{s.allowAttempt}</TableCell>
                                                <TableCell>{s.status === 'Active' ? <ColorLabel text={'Hoạt động'} color={primaryColor} /> : <ColorLabel text={'Không hoạt động'} color={dangerColor} />}</TableCell>
                                                <TableCell>
                                                    <Tooltip title="Chi tiết">
                                                        <button className='mx-2'
                                                            style={{ border: 'none', background: 'none' }}
                                                            onClick={() => {
                                                                setOpenQuizDetail(true)
                                                                setQuizId(s.id)
                                                            }}>
                                                            <VisibilityIcon color='disabled' />
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip title=" Kết quả làm bài của sinh viên">
                                                        <button className='mx-2' style={{ border: 'none', background: 'none' }} onClick={() => navigate(`/courses/${courseId}/syllabus/${syllabusId}/lessons/${lessonId}/quiz/${s.id}`)}>
                                                            <QuestionAnswerIcon color='primary' />
                                                        </button>
                                                    </Tooltip>
                                                    {'Deactive' === s.status &&
                                                        <>
                                                            <Tooltip title=" Thêm câu hỏi">
                                                                <button style={{ border: 'none', background: 'none' }} className='mx-2' onClick={() => navigate(`/courses/${courseId}/syllabus/${syllabusId}/lessons/${lessonId}/quiz/${s.id}/questions`)}>
                                                                    <StickyNote2Icon color='success' />
                                                                </button>
                                                            </Tooltip>
                                                            <Tooltip title="Chỉnh sửa">
                                                                <button style={{ border: 'none', background: 'none' }} className='mx-2' onClick={() => handleUpdateQuiz(s)}>
                                                                    <EditIcon color='disabled' />
                                                                </button>
                                                            </Tooltip>
                                                        </>}
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        <TablePagination
                            labelRowsPerPage="Số hàng trên trang :"
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredData?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
                <QuizModal isOpen={open} onClose={handleClose} />
                <CreateQuizModal open={openQuiz} onClose={handleCloseQuiz} onSave={handleSaveQuiz} data={quiz} />
                <QuizDetailModal isOpen={openQuizDetail} onClose={() => setOpenQuizDetail(false)} quizId={quizId} />
            </div>
        )
    );
}
