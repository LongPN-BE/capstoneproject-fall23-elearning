import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import { Button } from 'reactstrap';
import CourseModal from '../../DetailCourse';

function CourseTableComponent({ courses }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const handleApproved = (course) => {
    alert('Xác nhận duyệt ' + course.name)
  };
  const handleReject = (course) => {
    alert('Xác nhận từ chối ' + course.name)
  };
  const handleViewCourse = (course) => {
    console.log(course)
    setCourse(course)
    setIsModalOpen(true)
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="m-5">
      <div style={{ margin: '20px' }}>
        <Paper style={{ padding: '20px' }}>
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
                    <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={() => handleViewCourse(course)}>
                      <VisibilityIcon />
                    </Button>
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
        </Paper>
      </div>
      <CourseModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        course={course}
      />
    </div>
  );
}

export default CourseTableComponent;
