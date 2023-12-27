import { Button, InputBase, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from '@material-ui/core';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { fetchData } from '../../../services/AppService';
import CustomBreadcrumbs from '../../Breadcrumbs';
import { Search } from '@material-ui/icons';

const EnrollStudentView = () => {
    const { courseId } = useParams();
    const [students, setStudents] = useState()
    const [course, setCourse] = useState();
    const [filterDataInfo, setFilterDataInfor] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('all'); // Default value
    const [searchValue, setSearchValue] = useState('');

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
        }, {
            url: `/enroll-student`,
            label: 'Số lượng sinh viên đang tham gia',
        },
    ];

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            fetchData(`/course/byId?id=${courseId}`, token).then(resp => {
                if (resp) {
                    setCourse(resp)
                }
            })
            fetchData(`/enroll/byCourseId?course_id=${courseId}`, token).then(resp => {
                if (resp && resp.length > 0) {
                    const enroll = resp.filter(r => (r.status === 'PROCESSING' || r.status === 'DONE'))
                    setStudents(enroll);
                }

            })
        }
    }, [])

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

    const emptyRows = filterDataInfo ? page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filterDataInfo.length) : 0 : page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

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
        const filteredData = students.filter((item) => {
            const statusMatch = status === 'all' || item.status === status;
            const searchMatch =
                searchInput === '' ||
                item.student.account.username.toLowerCase().includes(searchInput.toLowerCase());
            return statusMatch && searchMatch;
        });

        setFilterDataInfor(filteredData);
    };


    return (
        <Paper style={{ padding: '20px' }}>
            {/* <Typography variant="body1" style={{ color: 'darkblue' }}>
                <Link to={'/'}>Trang chủ </Link>{'>'} <Link to={'/manage-course'}>Quản lý khóa học </Link>{'>'} Khóa học {courseId} {'>'} Số lượng sinh viên đang enroll
            </Typography> */}
            <CustomBreadcrumbs items={breadcrumbItems} />
            <div
                style={{ marginTop: '20px' }}
                className="d-flex align-items-center"
            >
                <Typography variant="h6">Danh sách sinh viên đang tham gia</Typography>
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
                    <MenuItem value="PROCESSING">Đang học</MenuItem>
                    <MenuItem value="DONE">Hoàn thành</MenuItem>
                    {/* <MenuItem value="Deactive">Không hoạt động</MenuItem> */}
                    {/* Add other statuses as menu items */}
                </Select>
            </div>
            <Table style={{ marginTop: '20px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Khung chương trình</TableCell>
                        <TableCell>email</TableCell>
                        <TableCell>Trạng thái</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterDataInfo ? filterDataInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s, index) => {
                        return (
                            <>
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{s.student.account.username}</TableCell>
                                    <TableCell>{s.syllabus.name}</TableCell>
                                    <TableCell>{s.student.account.profile.email}</TableCell>
                                    <TableCell>{s.status === 'PROCESSING' ? 'Đang học' : 'Hoàn thành'}</TableCell>
                                </TableRow>

                            </>

                        );
                    }) : students && students?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s, index) => {

                        return (
                            <>
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{s.student.account.username}</TableCell>
                                    <TableCell>{s.syllabus.name}</TableCell>
                                    <TableCell>{s?.student.account.profile.email}</TableCell>
                                    <TableCell>{s.status === 'PROCESSING' ? 'Đang học' : 'Hoàn thành'}</TableCell>
                                </TableRow>

                            </>

                        );
                    })}
                    {/* {students && } */}
                </TableBody>
            </Table>
            {students && students.length > 0 && <TablePagination
                labelRowsPerPage="Số hàng trên trang :"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={students && students.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}
        </Paper>
    )
}

export default EnrollStudentView
