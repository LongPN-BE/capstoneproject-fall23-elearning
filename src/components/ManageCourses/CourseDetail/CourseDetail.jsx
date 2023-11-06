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
import { courseData, syllabusData } from '../../../mock/mock-data';
import CourseEditModal from './CourseEditModal';
import SyllabusCreateModal from '../Syllabus/SyllabusCreateModal';
import { fetchData, postData } from '../../../services/AppService';
import Loading from '../../Loading/Loading';
import Cookies from 'js-cookie';

export default function CourseDetail() {
    const { courseId } = useParams();
    const [data, setData] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('all'); // Default value
    const [searchValue, setSearchValue] = useState('');
    const [course, setCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSyllabusCreateModalOpen, setIsSyllabusCreateModalOpen] = useState(false);
    const [syllabusCopy, setSyllabusCopy] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filterDataInfo, setFilterDataInfor] = useState(null);

    const handleCreateSyllabusClick = () => {
        setIsSyllabusCreateModalOpen(true);
    };

    const handleSyllabusModalClose = () => {
        setIsSyllabusCreateModalOpen(false);
        setSyllabusCopy(null)
    };

    const handleCreateSyllabus = (syllabusName) => {
        const token = Cookies.get('token')

        const syllabusBody = {
            name: syllabusName,
            courseId: courseId,
            lessonIds: [],
            status: 'Deactive'
        }
        postData('/syllabus/save', syllabusBody, token).then(resp => {
            if (resp) {
                window.location.reload()
            }
        })

        // Close the modal
        handleSyllabusModalClose();
    };


    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        setLoading(true)
        const token = Cookies.get('token')
        const user = JSON.parse(Cookies.get('user'))
        if (token && user) {
            fetchData(`/course/byId?id=${courseId}`, token).then(resp => {
                if (resp) {
                    setCourse(resp);
                    fetchData(`/syllabus/byCourseId?course_id=${courseId}`, token).then(resp => {
                        if (resp) {
                            setData(resp);
                            setLoading(false)
                        }
                    })
                }
            }).catch(err => {
                console.log(err)
            })


        }

    }, [courseId]);

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        // Refilter the data when status changes
        filterData(event.target.value, searchValue);
    };

    const handleSearchChange = (event) => {
        const searchInput = event.target.value;
        setSearchValue(searchInput);
        // Refilter the data when search input changes
        filterData(selectedStatus, searchInput);
    };

    const filterData = (status, searchInput) => {
        // Filter data based on both status and search input
        const filteredData = data.filter((item) => {
            const statusMatch = status === 'all' || item.status === status;
            const searchMatch =
                searchInput === '' ||
                item.name.toLowerCase().includes(searchInput.toLowerCase());
            return statusMatch && searchMatch;
        });

        setFilterDataInfor(filteredData);
    };

    const handleSaveCourseDetails = async (newPrice, newDescription) => {
        setLoading(true)
        // Update the course details in your state
        const token = Cookies.get('token')
        const body = {
            ...course,
            price: newPrice,
            description: newDescription,
            teacherId: course?.teacher.id,
            subjectId: course?.subject.id
        }
        postData('/course/save', body, token).then(resp => {
            if (resp) {
                window.location.reload()
            }
        }).catch(err => {
            console.log(err)
        })

        // Close the modal
        handleModalClose();
    };

    const handleOpenSyllabusCopy = (syllabusId) => {
        const syllabusCopy = data.find((c) => c.id === syllabusId);
        if (syllabusCopy) {
            // Clone the syllabusCopy to ensure it's a new object
            const newSyllabusCopy = { ...syllabusCopy };

            // Generate a new unique ID for the syllabus copy
            newSyllabusCopy.id = data.length + 1; // Replace with your unique ID generation logic
            setIsSyllabusCreateModalOpen(true)
            setSyllabusCopy(newSyllabusCopy)
        }

    };

    const handleCreateSyllabusCopy = (syllabusName) => {
        const token = Cookies.get('token')
        setLoading(true);
        if (token) {
            const lessonIds = syllabusCopy?.lessons.map(item => item.id);
            const body = {
                name: syllabusName,
                courseId: parseInt(courseId),
                lessonIds: lessonIds,
                status: 'Deactive'
            }
            postData('/syllabus/save', body, token).then(resp => {
                if (resp) {
                    setLoading(false)
                    window.location.reload()
                }
            }).catch(err => {
                console.log(err)
            })

            // Close the modal
            handleSyllabusModalClose();
        }
    }

    return (
        loading ? <Loading /> :
            data && course && (
                <div className="m-5">
                    <div style={{ margin: '20px' }}>
                        <Paper style={{ padding: '20px' }}>
                            <Typography variant="body1">
                                Trang chủ {'>'} Quản lý khóa học {'>'} Khóa học {courseId}
                            </Typography>

                            <div style={{ marginTop: '20px' }}>
                                <TextField label="Ngày tạo:" value={course.createDate} />
                                <TextField label="Giá:" style={{ marginLeft: '20px' }} value={course.price} />
                                <TextField
                                    label="Thời gian học:"
                                    style={{ marginLeft: '20px' }}
                                    value={course.limitTime}
                                />
                                <TextField label="Mô tả:" style={{ marginLeft: '20px' }} value={course.description} />
                                <TextField label="Trạng thái:" style={{ marginLeft: '20px' }} value={course.status} InputProps={{ readOnly: true }} />
                                <Button variant="outlined" style={{ marginLeft: '20px' }} onClick={handleEditClick}>
                                    Chỉnh sửa
                                </Button>
                            </div>

                            <div
                                style={{ marginTop: '20px' }}
                                className="d-flex align-items-center"
                            >
                                <Typography variant="h6">Danh sách khung chương trình</Typography>
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
                                <Link className='btn btn-outline-info' style={{ marginLeft: '20px' }} to={`/courses/${courseId}/evaluate`}>
                                    Xem đánh giá
                                </Link>
                                <Button variant="outlined" style={{ marginLeft: '20px' }} onClick={handleCreateSyllabusClick}>
                                    Tạo mới
                                </Button>
                            </div>

                            <Table style={{ marginTop: '20px' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Tên</TableCell>
                                        <TableCell>Trạng thái</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filterDataInfo ? filterDataInfo.map((s, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{s.name}</TableCell>
                                                <TableCell>{s.status}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="outlined"
                                                        style={{ marginRight: '10px' }}
                                                        onClick={() => handleOpenSyllabusCopy(s.id)}
                                                    >
                                                        Tạo bản sao
                                                    </Button>
                                                    <Link className='btn btn-outline-secondary' to={`/courses/${courseId}/syllabus/${s.id}`}>Chi tiết</Link>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                        : data.map((s, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{s.name}</TableCell>
                                                    <TableCell>{s.status}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="outlined"
                                                            style={{ marginRight: '10px' }}
                                                            onClick={() => handleOpenSyllabusCopy(s.id)}
                                                        >
                                                            Tạo bản sao
                                                        </Button>
                                                        <Link className='btn btn-outline-secondary' to={`/courses/${courseId}/syllabus/${s.id}`}>Chi tiết</Link>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                            {/* <Button variant="outlined" style={{ marginTop: '20px' }}>
                                Đăng kí khóa học
                            </Button> */}
                        </Paper>
                    </div>
                    <CourseEditModal
                        open={isModalOpen}
                        onClose={handleModalClose}
                        onSave={handleSaveCourseDetails}
                        course={course}
                    />
                    <SyllabusCreateModal
                        open={isSyllabusCreateModalOpen}
                        onClose={handleSyllabusModalClose}
                        onCreate={handleCreateSyllabus}
                        isCopied={syllabusCopy}
                        onCopy={handleCreateSyllabusCopy}
                    />
                </div>
            )
    );
}