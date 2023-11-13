import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';

function CourseTableComponent({ courses }) {


  const handleApproved = (course) => {
    alert('Xác nhận duyệt ' + course.name)
  };
  const handleReject = (course) => {
    alert('Xác nhận từ chối ' + course.name)
  };
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="center">STT</TableCell>
          <TableCell align="center">Khoá học</TableCell>
          <TableCell align="center">Mô tả</TableCell>
          <TableCell align="center">Giá</TableCell>
          <TableCell align="center">Ngày tạo</TableCell>
          <TableCell align="center">Xem</TableCell>
          <TableCell align="center">Xét duyệt</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {courses.map((course, index) => (
          <TableRow key={course.id}>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell align="center">{course.name}</TableCell>
            <TableCell align="center">{course.description}</TableCell>
            <TableCell align="center">{course.price}</TableCell>
            <TableCell align="center">{moment(course.createDate).format("DD/MM/YYYY")}</TableCell>
            <TableCell align="center">
              <VisibilityIcon />
              {/* <a href='' className='btn btn-outline-primary'>Chi tiết</a> */}
              {/* <Link to={`/courses/${course.id}`} className="btn btn-outline-primary">
                Xem
              </Link> */}
            </TableCell>
            <TableCell align="center">
              <button type="submit" className="btn btn-success" onClick={() => handleApproved(course)}>
                Duyệt !!
              </button>
              <button type="submit" className="btn btn-danger" onClick={() => handleReject(course)}>
                Từ chối
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CourseTableComponent;
