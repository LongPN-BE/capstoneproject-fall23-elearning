import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Link } from 'react-router-dom';

function CourseTableComponent({ courses }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="center">STT</TableCell>
          <TableCell align="center">Khoá học</TableCell>
          <TableCell align="center">Mô tả</TableCell>
          <TableCell align="center">Giá</TableCell>
          <TableCell align="center">Ngày tạo</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {courses.map((course, index) => (
          <TableRow key={course.id}>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell align="center">{course.name}</TableCell>
            <TableCell align="center">{course.description}</TableCell>
            <TableCell align="center">{course.price}</TableCell>
            <TableCell align="center">{course.createDate}</TableCell>
            <TableCell align="center">
              {/* <a href='' className='btn btn-outline-primary'>Chi tiết</a> */}
              <Link to={`/courses/${course.id}`} className="btn btn-outline-primary">
                Xem
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CourseTableComponent;
