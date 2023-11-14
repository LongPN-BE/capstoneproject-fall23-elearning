import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CourseTableComponent from '../CourseTableComponent/CourseTableComponent';
import { InputBase, Modal, FormControl, InputLabel, Select, MenuItem, Button, TextField, Typography, Box, Divider } from '@mui/material';
import { fetchData, postData } from '../../../services/AppService';
import moment from 'moment';
import Cookies from 'js-cookie';
import Loading from '../../Loading/Loading';
import { validateInputDigits, validateInputString } from '../../../util/Utilities';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import storage from '../../../util/firebase';
// import firebase from 'firebase/compat/app';

function CourseTabsComponent({ activeCourses, inactiveCourses, pendingCourses, draftCourses, rejectCourses, size }) {
    const [tabValue, setTabValue] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [subject, setSubject] = useState('');
    const [frameProgram, setframeProgram] = useState('');
    const [status, setStatus] = useState('DRAFT');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [passingScore, setPassingScore] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [newSubjectName, setNewSubjectName] = useState('');
    const [isNewSubjectModalOpen, setNewSubjectModalOpen] = useState(false);
    const [subjectList, setSubjectList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();
    // const navigate = useNavigate()

    const handleNewSubjectModalOpen = () => {
        setNewSubjectModalOpen(true);
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                fetchData('/subject/subjects', token).then(resp => {
                    if (resp) {
                        setSubjectList(resp)
                        setTabValue(2)
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    }, [])

    const handleNewSubjectModalClose = () => {
        setNewSubjectModalOpen(false);
        setNewSubjectName(''); // Reset the subject name input
    };

    const handleCreateNewSubject = () => {
        setNewSubjectModalOpen(false);
        setNewSubjectName('');
    };


    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    // const handleOnSave = (file) => {
    //     // setLoading(true);


    // };

    const handleCreateCourse = async () => {
        const user = JSON.parse(Cookies.get('user'))
        const token = Cookies.get('token');
        if (token && user) {
            try {
                const isValidString = validateInputString(courseName, status, description);
                const isValidDigit = validateInputDigits(price, duration, passingScore);
                if (!isValidString || !isValidDigit) {
                    alert('pls fill all fields and digit should be positive');
                    return
                }

                // handleOnSave(coverImage);
                if (!coverImage) {
                    alert("Please choose a file first!");
                    setLoading(false);
                    return;
                }

                // Creating a reference to the file in Firebase Storage
                const storageRef = ref(storage, `/elearning/text/${coverImage.name}`);

                // Starting the upload task
                const uploadTask = uploadBytesResumable(storageRef, coverImage);

                await uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Calculating and updating the progress
                        // const percent = Math.round(
                        //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        // );
                        // setPercent(percent);
                    },
                    (err) => {
                        console.log(err);
                        // setLoading(false);
                    },
                    () => {
                        // Getting the download URL after successful upload
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            const body = {
                                id: 0,
                                name: courseName,
                                status: status,
                                image: url,
                                description: description,
                                createDate: moment().toDate(),
                                price: parseFloat(price),
                                limitTime: parseFloat(duration),
                                averagePoint: parseFloat(passingScore),
                                teacherId: user.teacherId,
                                subjectId: parseInt(subject)
                            }
                            console.log(body);
                            postData('/course/save', body, token).then(resp => {

                                if (resp) {
                                    if (frameProgram) {
                                        const syllabusBody = {
                                            name: frameProgram,
                                            courseId: resp.id,
                                            lessonIds: []
                                        }
                                        postData('/syllabus/save', syllabusBody, token)
                                    }
                                }
                            })
                        });
                    }
                );


            } catch (error) {
                console.log(error)
            }
        }
        // console.log(coverImage)

        setModalOpen(false);
        setCourseName('');
        setSubject('');
        setPrice('');
        setDuration('');
        setPassingScore('');
        setDescription('');
        setCoverImage(null);
        setframeProgram('')

        window.location.reload()
    };

    // Determine the course array based on the selected tab
    let selectedCourses;
    switch (tabValue) {
        case 0:
            selectedCourses = activeCourses;
            break;
        case 1:
            selectedCourses = inactiveCourses;
            break;
        case 2:
            selectedCourses = pendingCourses;
            break;
        case 3:
            selectedCourses = draftCourses;
            break;
        case 4:
            selectedCourses = rejectCourses;
            break;
        default:
            selectedCourses = activeCourses;
    }

    const handleApproveCourse = async (course) => {
        const token = Cookies.get('token');
        if (token) {
            setLoading(true);
            try {
                const body = {
                    ...course,
                    teacherId: course.teacher.id,
                    subjectId: course.subject.id,
                    status: 'PENDING',
                };

                const resp = await postData('/course/save', body, token);

                if (resp) {
                    const teacherData = await fetchData(`/auth/byRoleId?role_id=STAFF`, token);
                    if (teacherData) {
                        const idList = teacherData.map(r => r.id);
                        const deviceTokenPromises = [];

                        idList.forEach(id => {
                            const promise = fetchData(`/device/byAccountId?accountId=${id}`, token)
                                .then(response => {
                                    if (response) {
                                        return response.map(item => item.token);
                                    }
                                    return [];
                                });

                            deviceTokenPromises.push(promise);
                        });

                        const deviceTokensArray = await Promise.all(deviceTokenPromises);
                        const deviceTokens = [].concat(...deviceTokensArray);

                        if (deviceTokens.length > 0) {
                            const notificationBody = {
                                title: "Kiến nghị",
                                message: "Một khóa học đang chờ để xét duyệt",
                                token: deviceTokens,
                            };

                            const notificationResp = await postData('/notification/send-notification', notificationBody, token);

                            if (notificationResp) {
                                window.location.reload();
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    };


    // Filter courses based on the search text
    const filteredCourses = selectedCourses.filter((course) =>
        course.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return (
        loading ? <Loading /> :
            <div>
                <Tabs value={tabValue} onChange={handleTabChange} centered className='mb-5'>
                    <Tab label="Hoạt động" />
                    < Tab label="Không hoạt động" />
                    <Tab label="Chờ xét duyệt" />
                    <Tab label="Đang soạn" />
                    <Tab label="Khóa học bị từ chối" />
                </Tabs >
                <div className="search-box d-flex justify-content-between">
                    <div className='d-flex'>
                        <InputBase
                            placeholder="Search..."
                            className="search-input"
                            value={searchText}
                            onChange={handleSearchChange}
                        />

                    </div>
                    <button className='btn btn-outline-info' onClick={handleModalOpen}>Tạo mới</button>
                </div>
                <CourseTableComponent courses={filteredCourses} onApprove={handleApproveCourse} />

                {/* Modal for creating a new course */}
                <Modal open={isModalOpen} onClose={handleModalClose}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                        <Typography variant="h5">Tạo khóa học</Typography>
                        <FormControl fullWidth sx={{ my: 1 }} >
                            <div className='d-flex '>
                                <InputLabel htmlFor="subject">Môn học</InputLabel>
                                <Select id="subject" value={subject} label="Môn học" onChange={(e) => setSubject(e.target.value)} className='col-6 mx-1'>
                                    {subjectList?.length > 0 && subjectList.map((s) => {
                                        return <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                                    })}
                                </Select>
                                <Button variant="outlined" color="primary" sx={{ my: 1 }} className='col-3 mx-1' onClick={handleNewSubjectModalOpen}>Tạo môn học mới</Button>
                            </div>
                        </FormControl>
                        <div className='d-flex justify-content-between'>
                            <TextField className='col-6 mx-1' label="Tên khóa học" value={courseName} onChange={(e) => setCourseName(e.target.value)} sx={{ my: 1 }} />
                            <TextField className='col-6 mx-1' label="Giá" value={price} onChange={(e) => setPrice(e.target.value)} sx={{ my: 1 }} type='number' />
                        </div>
                        <div className='d-flex justify-content-between'>
                            <TextField className='col-6 mx-1' label="Thời lượng" value={duration} onChange={(e) => setDuration(e.target.value)} sx={{ my: 1 }} type='number' />
                            <TextField className='col-6 mx-1' label="Điểm qua môn" value={passingScore} onChange={(e) => setPassingScore(e.target.value)} sx={{ my: 1 }} type='number' />
                        </div>


                        <TextField fullWidth label="Mô tả" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={4} sx={{ my: 1 }} />
                        <Divider sx={{ my: 2 }} />
                        <div className='d-flex'>
                            <label>Ảnh bìa: </label>
                            <input type="file" accept=".png,.jpg" onChange={(e) => setCoverImage(e.target.files[0])} className='mx-4' />
                        </div>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h5">Chi tiết khóa học</Typography>

                        <FormControl fullWidth sx={{ my: 1 }} >
                            <div className='d-flex justify-content-between'>
                                <InputLabel htmlFor="status">Trạng thái</InputLabel>
                                <Select id="status" value={status} label="Trạng thái" onChange={(e) => setStatus(e.target.value)} className='col-6 mx-1'>
                                    {/* <MenuItem value="Active">Active</MenuItem> */}
                                    <MenuItem value="DRAFT">Đang soạn</MenuItem>
                                </Select>
                                <TextField className='col-6 mx-1' label="Khung chương trình" value={frameProgram} onChange={(e) => setframeProgram(e.target.value)} placeholder='Nhập tên khung chương trình' />
                            </div>
                        </FormControl>

                        <Divider sx={{ my: 2 }} />
                        <Button variant="contained" color="primary" onClick={handleCreateCourse}>Tạo khóa học</Button>
                    </Box>
                </Modal>
                <Modal open={isNewSubjectModalOpen} onClose={handleNewSubjectModalClose}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                        <Typography variant="h5">Tạo môn học mới</Typography>
                        <TextField fullWidth label="Tên môn học" value={newSubjectName} onChange={(e) => setNewSubjectName(e.target.value)} sx={{ my: 1 }} />
                        <div className='d-flex justify-content-end'>
                            <Button variant="contained" color="primary" onClick={handleCreateNewSubject} className='mx-2'>Tạo</Button>
                            <Button variant="outlined" color="secondary" onClick={handleNewSubjectModalClose}>Hủy</Button>
                        </div>
                    </Box>
                </Modal>
            </div >
    );
}

export default CourseTabsComponent;
