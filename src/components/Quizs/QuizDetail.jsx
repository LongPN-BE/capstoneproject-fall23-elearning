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
import Cookies from 'js-cookie';
import { fetchData } from '../../services/AppService';
import QuizModal from '../ManageCourses/Quiz/QuizModal';

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

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
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

    return (
        data && (
            <div className="m-5">
                <div style={{ margin: '20px' }}>
                    <Paper style={{ padding: '20px' }}>
                        <Typography variant="body1">
                            Trang chủ {'>'} Quản lý khóa học {'>'} Khóa học {courseId} {'>'} Khung chương trình {syllabusId} {'>'} Bài học {lessonId} {'>'} Bài kiểm tra {quizId}
                        </Typography>

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
                            <TextField
                                label="Tỷ trọng:"
                                style={{ marginLeft: '20px' }}
                                autoFocus
                                value={proportion + "%"}
                                margin="dense"
                            />

                        </div>

                        <div
                            style={{ marginTop: '20px' }}
                            className="d-flex align-items-center"
                        >
                            <Typography variant="h6">Danh sách sinh viên đã làm bài kiểm tra</Typography>
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
                                <MenuItem value="failed">Rớt</MenuItem>
                                <MenuItem value="pass">Qua môn</MenuItem>
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
                                {filteredData && filteredData.length > 0 && filteredData.map((s, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{s?.student?.account?.username}</TableCell>
                                            <TableCell>{s?.lastPoint}</TableCell>
                                            <TableCell>{s?.resultStatus}</TableCell>
                                            <TableCell>{s?.startTime}</TableCell>
                                            <TableCell>
                                                <button className='btn btn-outline-secondary' onClick={() => handleOpen(s)}>Chi tiết</button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>


                    </Paper>
                </div>
                <QuizModal isOpen={open} onClose={handleClose} quizDetail={selectedQuiz} onSave={handleClose} />
            </div>
        )
    );
}
