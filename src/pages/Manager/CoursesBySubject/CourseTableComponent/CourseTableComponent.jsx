import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import { useState } from 'react';
import { Button } from 'reactstrap';

function CourseTableComponent({ courses }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const handleApproved = (course) => {
    alert('Xác nhận duyệt ' + course.name);
  };
  const handleReject = (course) => {
    alert('Xác nhận từ chối ' + course.name);
  };
  const handleViewCourse = (course) => {
    console.log(course);
    setCourse(course);
    setIsModalOpen(true);
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
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course, index) => (
                <TableRow key={course.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{course.name}</TableCell>
                  <TableCell align="center">{course.description}</TableCell>
                  <TableCell align="center">{course.price}</TableCell>
                  <TableCell align="center">{moment(course.createDate).format('DD/MM/YYYY')}</TableCell>
                  <TableCell align="center">
                    <Link to={`/subject/course/syllabus/${course.id}`} title="Xem" className="btn btn-secondary m-1">
                      <VisibilityIcon />
                    </Link>
                  </TableCell>
                  {course?.status === 'PENDING' ? (
                    <>
                      <TableCell align="center">
                        <div className="d-flex justify-content-center">
                          <button
                            type="submit"
                            title="Approve"
                            className="btn btn-success m-1"
                            onClick={() => handleApproved(course)}
                          >
                            <CheckCircleOutlineIcon />
                          </button>
                          <button
                            button
                            type="submit"
                            title="Deny"
                            className="btn btn-danger m-1"
                            onClick={() => handleReject(course)}
                          >
                            <DoNotDisturbAltIcon />
                          </button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <></>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
}

export default CourseTableComponent;
