// CourseTableComponent.js
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';

function CourseTableComponent({ courses, onApprove, onShowReason }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center">STT</TableCell>
                    <TableCell align="center">Tên</TableCell>
                    <TableCell align="center">Môn học</TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {courses.map((course, index) => (
                    <TableRow key={course.id}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{course.name}</TableCell>
                        <TableCell align="center">{course.subject.name}</TableCell>
                        <TableCell align="center">
                            {/* <a href='' className='btn btn-outline-primary'>Chi tiết</a> */}
                            <Link to={`/courses/${course.id}`} className='btn btn-outline-primary'>
                                Chi tiết
                            </Link>
                            {course.status === 'REJECT' && <button className='btn btn-outline-danger mx-2' onClick={onShowReason}>
                                Xem lý do
                            </button>}
                            {course.status === 'DRAFT' && <button className='btn btn-outline-info mx-2' onClick={() => onApprove(course)}>
                                Kiến nghị môn học
                            </button>}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default CourseTableComponent;
