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
  TablePagination,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FeedbackIcon from '@mui/icons-material/Feedback';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../../services/AppService';
import Swal from 'sweetalert2';

function CourseTableComponent({ courses }) {
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
            showSuccess(course);
          }
        })
        .catch((err) => {
          console.log(err);
          showError(err);
        });
      // showSuccess(course);
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
          <button type="submit" title="Approve" className="btn btn-danger m-1" onClick={() => handleReject(course)}>
            Xác nhận từ chối
          </button>
        </DialogActions>
      </Dialog>

      <div className="mt-2">
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
              {courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((course, index) => (
                <TableRow key={course.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{course.name}</TableCell>
                  <TableCell align="center">{course.description}</TableCell>
                  <TableCell align="center">{course.price}</TableCell>
                  <TableCell align="center">{moment(course.createDate).format('DD/MM/YYYY')}</TableCell>
                  <TableCell align="center">
                    <Link
                      to={`/subject/${course.subject.id}/course/${course.id}/syllabus`}
                      title="Xem"
                      className="btn btn-secondary m-1"
                    >
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
                          >
                            <DoNotDisturbAltIcon />
                          </button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <></>
                  )}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'Tất cả', value: -1 }]}
            component="div"
            count={courses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Số hàng trên trang :"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
}

export default CourseTableComponent;
