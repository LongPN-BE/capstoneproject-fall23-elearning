import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../../services/AppService';
import Swal from 'sweetalert2';

function CourseTableComponent({ courses }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(null);

  const handleClickOpen = (course) => {
    setCourse(course);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function showSuccess(course) {
    Swal.fire({
      title: 'Duyệt thành công!',
      text: 'Khóa học : ' + course.name + ' đã được duyệt.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(function () {
      window.location.reload();
    });
  }

  function showDenySuccess(course) {
    Swal.fire({
      title: 'Đã từ chối khoá học!',
      text: 'Khóa học : ' + course.name + ' đã bị từ chối.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(function () {
      window.location.reload();
    });
  }

  function showError(text) {
    Swal.fire({
      title: 'Oops...',
      text: text,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  const handleApproved = (course) => {
    // alert('Xác nhận duyệt ' + course.name + " - ID : " + course.id);
    const token = Cookies.get('token');
    if (token) {
      fetchData('/course/approve?course_id=' + course.id, token)
        .then((resp) => {
          if (resp) {
            showSuccess(resp);
          }
        })
        .catch((err) => {
          console.log(err);
          showError(err);
        });
      showSuccess(course);
    }
  };

  const handleReject = (course) => {
    alert('Xác nhận từ chối ' + course.name + ' - ID : ' + course.id + ' - reason : ' + reason);
    const token = Cookies.get('token');
    if (token) {
      postData(
        '/course/reject',
        {
          courseId: course.id,
          reason: reason,
        },
        token,
      )
        .then((resp) => {
          if (resp) {
            showDenySuccess(resp);
          }
        })
        .catch((err) => {
          console.log(err);
          showError(err);
        });
      handleClose();
    }
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Từ chối</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Sau khi từ chối, khóa học này sẽ không thể hoạt động và giáo viên cần cập nhật hoặc tạo mới để có thể được
              yêu cầu xét duyệt lại.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Lý do từ chối"
              placeholder="VD: Khóa học này chưa đảm bảo nội dung phù hợp với tiêu chuẩn cộng đồng."
              onChange={(e) => setReason(e.target.value)}
              fullWidth
              variant="standard"
              required
            />
          </DialogContent>
          <DialogActions>
            <button
              type="submit"
              title="Approve"
              className="btn btn-success m-1"
              onClick={() => handleClose}
              // onClick={() => handleApproved(course)}
            >
              Hủy
            </button>
            <button
              type="submit"
              title="Approve"
              className="btn btn-danger m-1"
              // onClick={handleClose}
              onClick={() => handleReject(course)}
            >
              Xác nhận từ chối
            </button>
          </DialogActions>
        </Dialog>
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
                            type="submit"
                            title="Deny"
                            className="btn btn-danger m-1"
                            onClick={() => handleClickOpen(course)}
                            //onClick={() => handleReject(course)}
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
