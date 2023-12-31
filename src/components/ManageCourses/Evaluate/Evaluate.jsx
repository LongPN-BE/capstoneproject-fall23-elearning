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
    Tooltip,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import FeedbackModal from './Feedback/FeedbackModal';
import Cookies from 'js-cookie';
import { fetchData } from '../../../services/AppService';
import CustomBreadcrumbs from '../../Breadcrumbs';
import VisibilityIcon from '@mui/icons-material/Visibility';


const Evaluate = () => {
    const { courseId } = useParams();
    const [searchValue, setSearchValue] = useState('');
    // const [data, setData] = useState();
    const [evaluate, setEvaluate] = useState();
    const [totalRate, setTotalRate] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null)
    const [rating, setRating] = useState(0)
    const [course, setCourse] = useState()

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            fetchData(`/course/byId?id=${courseId}`, token).then(resp => {
                if (resp) {
                    setCourse(resp)
                }
            })
            fetchData(`/feedback/ByCourse?course_id=${courseId}`, token).then((resp) => {
                if (resp) {
                    setEvaluate(resp)
                    setTotalRate(resp.length)
                    const averageRating = calculateAverageRating(resp);
                    setRating(averageRating)
                }
            }).catch(err => console.log(err))
        }
    }, [])

    function calculateAverageRating(data) {
        let sum = 0;
        let count = 0;

        for (const item of data) {
            for (const feedback of item.feedbackDetails) {
                if (feedback.rate !== undefined) {
                    sum += feedback.rate;
                    count++;
                }
            }
        }

        const averageRating = count > 0 ? (sum / count).toFixed(2) : 0.00;
        return averageRating;
    }

    function calculateSingleAverageRating(feedbackDetails) {
        let sum = 0;
        let count = 0;

        for (const item of feedbackDetails) {
            if (item.rate !== undefined) {
                sum += item.rate;
                count++;
            }
        }

        const averageRating = count > 0 ? (sum / count).toFixed(2) : 0.00;
        return averageRating;
    }

    const handleOpenModal = (feedback) => {
        feedback?.feedbackDetails.sort((a, b) => {
            if (a.type === "text") return -1;
            if (b.type === "radio") return 1;
            return 0;
        });
        setSelectedFeedback(feedback)
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSearchChange = (event) => {
        const searchInput = event.target.value;
        setSearchValue(searchInput);
    };

    // Filter the evaluate array based on the search input value and username
    const filteredEvaluate = evaluate && evaluate.filter((s) =>
        s.enroll.student.account.username.toLowerCase().includes(searchValue.toLowerCase())
    );

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
            url: `/courses/` + courseId + `/evaluate/`,
            label: 'Đánh giá',
        },
    ];

    return (
        evaluate && <div className="m-5">
            <div style={{ margin: '20px' }}>
                <Paper style={{ padding: '20px' }}>
                    <CustomBreadcrumbs items={breadcrumbItems} />

                    <div style={{ marginTop: '20px' }}>
                        <TextField label="Tổng đánh giá:" value={totalRate} />
                        <TextField label="Độ uy tín:" style={{ marginLeft: '20px' }} value={rating} />
                    </div>

                    <div
                        style={{ marginTop: '20px' }}
                        className="d-flex align-items-center"
                    >
                        <Typography variant="h6">Danh sách nhận xét</Typography>
                        <InputBase
                            placeholder="Search"
                            style={{ marginLeft: '20px' }}
                            startAdornment={<Search />}
                            onChange={handleSearchChange}
                        />


                    </div>

                    <Table style={{ marginTop: '20px' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Tên sinh viên</TableCell>
                                <TableCell>Điểm đánh giá</TableCell>
                                <TableCell>Ngày Tạo</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEvaluate && filteredEvaluate.length > 0 && filteredEvaluate.map((s, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{s.enroll.student.account.username}</TableCell>
                                        <TableCell>
                                            {calculateSingleAverageRating(s?.feedbackDetails)} / 5
                                        </TableCell>
                                        <TableCell>{s.createDate}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Chi tiết">
                                                <button style={{ border: 'none', background: 'none' }} onClick={() => handleOpenModal(s)}>
                                                    <VisibilityIcon color='disabled' enableBackground={false} />
                                                </button>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
            <FeedbackModal open={isModalOpen} onClose={handleCloseModal} data={selectedFeedback} />
        </div>
    )
}

export default Evaluate
