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
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { fetchData } from '../../services/AppService';
import QuizModal from '../ManageCourses/Quiz/QuizModal';
import CustomBreadcrumbs from '../Breadcrumbs';
import { PATTERN_DATE, formatDate } from '../../constant';
import ColorLabel, { dangerColor, primaryColor } from '../../util/ColorLabel/ColorLabel';

export default function QuizDetail() {
    const { courseId, syllabusId, lessonId, quizId } = useParams();
    const [data, setData] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('all'); // Default value
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [totalStudentJoin, setTotalStudentJoin] = useState(0)
    const [averagePoint, setTotalAveragePoint] = useState(0)
    const [proportion, setProportion] = useState(0)
    const [selectedQuiz, setSelectedQuiz] = useState(null)
    const [course, setCourse] = useState()
    const [syllabus, setSyllabus] = useState()
    const [lesson, setLesson] = useState();

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
            fetchData(`/lesson/byId?id=${lessonId}`, token).then(resp => {
                if (resp) {
                    setLesson(resp)
                }
            })
            fetchData(`/result-quiz/by-quiz?quiz_id=${quizId}`, token).then(resp => {
                if (resp) {
                    setData(resp)
                    if (resp.length > 0) {
                        setTotalStudentJoin(resp.length)
                        setTotalAveragePoint(calculateAveragePoint(resp))
                        setProportion(calculateProportion(resp))
                    }
                }
            }).catch(err => console.log(err))
        }
    }, [courseId, syllabusId, lessonId, quizId]);

    const calculateAveragePoint = (obj) => {
        // Calculate the average point from the lastPoint
        const totalPoints = obj.reduce((total, item) => total + item.lastPoint, 0);
        return (totalPoints / obj.length).toFixed(2);
    }

    const calculateProportion = (obj) => {
        // Count how many students have a resultStatus of "pass"
        const studentPassList = obj.filter(item => item.resultStatus.toLowerCase() === "pass").length;
        return (studentPassList / obj.length * 100).toFixed(2);
    }

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
        const filteredData = data && data.filter((resultQuiz) => {
            const statusMatch = status === 'all' || resultQuiz.resultStatus.toLowerCase() === status;
            const searchMatch =
                searchInput === '' || resultQuiz?.student?.account?.username.toLowerCase().includes(searchInput.toLowerCase());
            return statusMatch && searchMatch;
        });

        setFilteredData(filteredData); // Update filteredData, not data
    };


    const [open, setOpen] = useState(false);

    const handleOpen = (s) => {
        setSelectedQuiz(s)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData?.length) : 0;


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
            label: lesson?.name,
        },
        {
            url: `/courses/` + courseId + `/syllabus/` + syllabusId + `/lessons/` + lessonId + `/quiz/` + quizId,
            label: 'Kết quả bài kiểm tra của sinh viên',
        }
    ];

    return (
        data && (
            <div className="m-5">
                <div style={{ margin: '20px' }}>
                    <Paper style={{ padding: '20px' }}>
                        {/* <Typography variant="body1">
                            <Link to={'/'}>Trang chủ </Link>{'>'} <Link to={'/manage-course'}>Quản lý khóa học </Link>{'>'} <Link to={`/courses/${courseId}`}>Khóa học {courseId} </Link>
                            {'>'} <Link to={`/courses/${courseId}/syllabus/${syllabusId}`}>Khung chương trình {syllabusId} </Link>{'>'} <Link to={`/courses/${courseId}/syllabus/${syllabusId}/lessons/${lessonId}`}> Bài học {lessonId} </Link>{'>'}
                            Bài kiểm tra {quizId}
                        </Typography> */}
                        <CustomBreadcrumbs items={breadcrumbItems} />
                        <div style={{ marginTop: '20px' }} className='d-flex align-items-center'>
                            <TextField
                                label="Số sinh viên đã làm"
                                autoFocus
                                value={totalStudentJoin}
                                margin="dense" />
                            <TextField
                                label="Điểm trung bình:"
                                style={{ marginLeft: '20px' }}
                                autoFocus
                                value={averagePoint}
                                margin="dense" />
                            {/* <TextField
                                label="Tỷ trọng:"
                                style={{ marginLeft: '20px' }}
                                autoFocus
                                value={proportion + "%"}
                                margin="dense"
                            /> */}

                        </div>

                        <div
                            style={{ marginTop: '20px' }}
                            className="d-flex align-items-center"
                        >
                            <Typography variant="h6">Danh sách sinh viên đã làm bài kiểm tra</Typography>
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
                                <MenuItem value="fail">Không đạt</MenuItem>
                                <MenuItem value="pass">Đạt</MenuItem>
                                {/* Add other statuses as menu items */}
                            </Select>

                        </div>

                        <Table style={{ marginTop: '20px' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Tên sinh viên</TableCell>
                                    <TableCell>Điểm</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                    <TableCell>Ngày làm</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData && filteredData.length > 0 && filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s, index) => {
                                    return (
                                        <>
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{s?.student?.account?.username}</TableCell>
                                                <TableCell>{s?.lastPoint}</TableCell>
                                                <TableCell>{s?.resultStatus === 'FAIL' ? <ColorLabel text={'Không đạt'} color={dangerColor} /> : <ColorLabel text={'Đạt'} color={primaryColor} />}</TableCell>
                                                {/* <TableCell>{  ? '' : ''}</TableCell> */}
                                                <TableCell>{formatDate(s?.startTime, PATTERN_DATE.HH_MM_SS_DD_MM_YYYY)}</TableCell>
                                                <TableCell>
                                                    <button className='btn btn-outline-secondary' onClick={() => handleOpen(s)}>Chi tiết</button>
                                                </TableCell>
                                            </TableRow>
                                            {/* {emptyRows > 0 && (
                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )} */}
                                        </>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        {
                            filteredData && <TablePagination
                                labelRowsPerPage="Số hàng trên trang :"
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={filteredData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        }

                    </Paper>
                </div>
                <QuizModal isOpen={open} onClose={handleClose} quizDetail={selectedQuiz} onSave={handleClose} />
            </div>
        )
    );
}
