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
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import SyllabusUpdateModal from '../SysllabusModal/SyllabusUpdateModal';
// import LessonModal from '../../Lesson/LessonModal'; // Import the LessonModal component
import { lessonSyllabus, lessonsData, syllabusData } from '../../../../mock/mock-data';
import LessonModal from '../../Lesson/LessonModal';
import { fetchData, postData } from './../../../../services/AppService.js'
import TextTruncate from '../../../../util/Text-Truncate/TextTruncate';
import Loading from '../../../Loading/Loading';
import Cookies from 'js-cookie';
import moment from 'moment/moment';

export default function SyllabusDetail() {
    const { courseId, syllabusId } = useParams();
    const [data, setData] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [syllabus, setSyllabus] = useState(null);
    const [isSyllabusEditModalOpen, setIsSyllabusEditModalOpen] = useState(false);
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [lessonToEdit, setLessonToEdit] = useState(null);
    const [loading, setLoading] = useState(false)
    const [searchData, setSearchData] = useState(null);

    const handleUpdateSyllabus = async (id, status) => {
        const token = Cookies.get('token')
        if (token) {
            // Close the syllabus edit modal
            const lessons = syllabus?.lessons
            const body = {
                ...syllabus,
                status: status,
                courseId: courseId,
                lessonIds: lessons
            }
            await postData('/syllabus/save', body, token).then(resp => {
                if (resp) {
                    window.location.reload()
                }
            })
        }
        setIsSyllabusEditModalOpen(false);
    };

    const handleEditSyllabusClick = () => {
        setIsSyllabusEditModalOpen(true);
    };

    const handleSyllabusEditModalClose = () => {
        setIsSyllabusEditModalOpen(false);
    };

    const handleAddLesson = () => {
        setLessonToEdit(null); // Clear any previous lesson data (for editing)
        setIsLessonModalOpen(true);
    };

    const handleEditLesson = (lessonData) => {
        console.log(lessonData);
        setLessonToEdit(lessonData); // Set the lesson data to edit
        setIsLessonModalOpen(true);
    };

    const handleLessonModalClose = () => {
        setIsLessonModalOpen(false);
    };

    const saveOrUpdateLesson = async (lessonData) => {
        const token = Cookies.get('token');
        if (token) {
            setLoading(true);

            if (lessonData) {
                // Check if lessonData is defined

                // If lessonData has an "id", it means you are updating an existing lesson.
                if (lessonData.id !== null && lessonData.id !== undefined) {
                    // Implement your update logic here.
                    console.log('Lesson data to update:', lessonData);
                    const body = {
                        ...lessonData,
                        dateTime: moment(new Date()),
                        courseId: parseInt(courseId) // Assuming courseId is defined
                    };

                    await postData('/lesson/save', body, token)
                        .then(resp => {
                            if (resp) {
                                window.location.reload();
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    // Implement your create logic here for new lessons.
                    // console.log('Lesson data to save', lessonData);
                    const body = {
                        ...lessonData,
                        dateTime: moment(new Date()),
                        courseId: parseInt(courseId) // Assuming courseId is defined
                    };

                    await postData('/lesson/save', body, token)
                        .then(resp => {
                            if (resp) {
                                data.push(resp);
                                const lessonIds = data.map(d => d.id)
                                const body = {
                                    id: syllabus.id,
                                    courseId: parseInt(courseId), // Assuming courseId is defined
                                    lessonIds: lessonIds,
                                    name: syllabus.name,
                                    status: syllabus.status
                                };
                                postData('/syllabus/save', body, token).then(resp => {
                                    if (resp) {
                                        window.location.reload()
                                    }
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }

                setIsLessonModalOpen(false); // Close the LessonModal
            }
        }
    };


    useEffect(() => {
        const token = Cookies.get('token')
        setLoading(true)
        if (token) {
            fetchData(`/syllabus/byId?id=${syllabusId}`, token).then(resp => {
                if (resp) {
                    setSyllabus(resp);
                    setData(resp.lessons)
                    setLoading(false)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }, [courseId, syllabusId]);

    const handleSearchChange = (event) => {
        const searchInput = event.target.value;
        setSearchValue(searchInput);
        // Refilter the data when search input changes
        filterData(searchInput);
    };

    const filterData = (searchInput) => {
        // Filter data based on both status and search input
        const filteredData = data.filter((item) => {
            const searchMatch =
                searchInput === '' ||
                item.name.toLowerCase().includes(searchInput.toLowerCase());
            return searchMatch;
        });

        setSearchData(filteredData);
    };

    return (
        loading ? <Loading /> :
            syllabus && (
                <div className="m-1">
                    <div style={{ margin: '20px' }}>
                        <Paper style={{ padding: '20px' }}>
                            <Typography variant="body1">
                                Trang chủ {'>'} Quản lý khóa học {'>'} Khóa học {courseId} {'>'} Khung chương trình {syllabusId}
                            </Typography>

                            <div style={{ marginTop: '20px' }}>
                                <TextField label="Ngày tạo:" value={syllabus.createDate} />
                                <TextField label="Trạng thái:" style={{ marginLeft: '20px' }} value={syllabus.status} />

                                <Button variant="outlined" style={{ marginLeft: '20px' }} onClick={handleEditSyllabusClick}>
                                    Chỉnh sửa
                                </Button>
                            </div>

                            <div
                                style={{ marginTop: '20px' }}
                                className="d-flex align-items-center"
                            >
                                <Typography variant="h6">Danh sách bài học</Typography>
                                <InputBase
                                    placeholder="Search name"
                                    style={{ marginLeft: '20px' }}
                                    startAdornment={<Search />}
                                    onChange={handleSearchChange}
                                />
                                <div className="text-end col-8">
                                    <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={handleAddLesson}>
                                        Tạo mới
                                    </Button>
                                </div>
                            </div>

                            <Table style={{ marginTop: '20px' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '5%' }}>STT</TableCell>
                                        <TableCell style={{ width: '15%' }}>Tên</TableCell>
                                        <TableCell style={{ width: '15%' }}>URL</TableCell>
                                        <TableCell style={{ width: '10%' }}>Ngày tạo</TableCell>
                                        <TableCell style={{ width: '8%' }}>Trạng thái</TableCell>
                                        <TableCell style={{ width: '15%' }}>Mô tả</TableCell>
                                        <TableCell style={{ width: '7%' }}>Thời lượng (phút)</TableCell>
                                        <TableCell style={{ width: '15%' }}>Bài Kiểm tra</TableCell>
                                        <TableCell style={{ width: '15%' }}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchData ? searchData.map((l, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell><TextTruncate text={l.name} /></TableCell>
                                                <TableCell><Link to={l.url}><TextTruncate text={l.url} /></Link></TableCell>
                                                <TableCell><TextTruncate text={l.createDate} /></TableCell>
                                                <TableCell><TextTruncate text={l.status === 'true' ? 'Hoạt động' : 'Không hoạt động'} /></TableCell>
                                                <TableCell><TextTruncate text={l.description} /></TableCell>
                                                <TableCell><TextTruncate text={l.estimateTime} /></TableCell>
                                                <TableCell>
                                                    <Link className="btn btn-outline-secondary" to={`/courses/${courseId}/syllabus/${syllabusId}/lessons/${l.id}`}>
                                                        Xem kết quả
                                                    </Link>
                                                    <Link className="btn btn-outline-secondary mx-1" to={`/courses/${courseId}/syllabus/${syllabusId}/lessons/${l.id}/create-quiz`}>
                                                        Tạo
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="outlined"
                                                        style={{ marginLeft: '10px' }}
                                                        onClick={() => handleEditLesson(l)}
                                                    >
                                                        Chỉnh sửa
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }) :
                                        data && data.length > 0 && data.map((l, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell><TextTruncate text={l.name} /></TableCell>
                                                    <TableCell><Link to={l.url}><TextTruncate text={l.url} /></Link></TableCell>
                                                    <TableCell><TextTruncate text={l.dateTime} /></TableCell>
                                                    <TableCell><TextTruncate text={l.status === 'true' ? 'Hoạt động' : 'Không hoạt động'} /></TableCell>
                                                    <TableCell><TextTruncate text={l.description} /></TableCell>
                                                    <TableCell><TextTruncate text={l.estimateTime} /></TableCell>
                                                    <TableCell>
                                                        <Link className="btn btn-outline-secondary" to={`/courses/${courseId}/syllabus/${syllabusId}/lessons/${l.id}`}>
                                                            Xem kết quả
                                                        </Link>
                                                        <Link className="btn btn-outline-secondary mx-1" to={`/courses/${courseId}/syllabus/${syllabusId}/lessons/${l.id}/create-quiz`}>
                                                            Tạo
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="outlined"
                                                            style={{ marginLeft: '10px' }}
                                                            onClick={() => handleEditLesson(l)}
                                                        >
                                                            Chỉnh sửa
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                </TableBody>
                            </Table>
                            {/* <div className="text-end">
                            <Button variant="outlined" style={{ marginTop: '20px' }}>
                                Hoàn thành
                            </Button>
                        </div> */}
                        </Paper>
                    </div>
                    <SyllabusUpdateModal
                        open={isSyllabusEditModalOpen}
                        onUpdate={handleUpdateSyllabus}
                        onClose={handleSyllabusEditModalClose}
                        syllabus={syllabus}
                    />
                    <LessonModal
                        isOpen={isLessonModalOpen}
                        onSave={saveOrUpdateLesson}
                        onUpdate={saveOrUpdateLesson}
                        onClose={handleLessonModalClose}
                        lesson={lessonToEdit !== null ? lessonToEdit : null}
                    />
                </div>
            )
    );
}
