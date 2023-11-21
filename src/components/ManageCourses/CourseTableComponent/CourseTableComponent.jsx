// CourseTableComponent.js
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { TablePagination } from '@mui/material';
import { Paper } from '@mui/material';

function CourseTableComponent({ courses, onApprove, onShowReason, onDisable }) {
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courses.length) : 0;

    return (
        <>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="center">Tên</TableCell>
                        <TableCell align="center">Số lượng sinh viên đang học</TableCell>
                        <TableCell align="center">Môn học</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((course, index) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={course.code}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{course.name}</TableCell>
                            <TableCell align="center">{course.enrolling}</TableCell>
                            <TableCell align="center">{course.subject.name}</TableCell>
                            <TableCell align="center">
                                {/* <a href='' className='btn btn-outline-primary'>Chi tiết</a> */}
                                <Link to={`/courses/${course.id}`} className='btn btn-outline-primary'>
                                    Chi tiết
                                </Link>
                                {course.status === 'ACTIVE' && course.enrolling < 1 && <button className='btn btn-outline-danger mx-2' onClick={() => onDisable(course)}>
                                    Tắt hoạt động
                                </button>}
                                {course.status === 'REJECT' && <button className='btn btn-outline-danger mx-2' onClick={onShowReason}>
                                    Xem lý do
                                </button>}
                                {course.status === 'DRAFT' && <button className='btn btn-outline-info mx-2' onClick={() => onApprove(course)}>
                                    Kiến nghị môn học
                                </button>}
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                component="div"
                count={courses.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}

export default CourseTableComponent;
