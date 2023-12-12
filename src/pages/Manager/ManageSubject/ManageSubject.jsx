import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SubjectModal from './SubjectModal';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Typography,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Popover,
  MenuItem,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import { Search } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import moment from 'moment/moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';
import Swal from 'sweetalert2';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

export default function ListSubject() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [subjectToEdit, setSubjectToEdit] = useState(null);
  const [user, setUser] = useState(null);
  const [openPop, setOpenPop] = useState(null);
  const breadcrumbItems = [
    {
      url: '/',
      label: 'Trang chủ',
    },
    {
      url: `/subjects`,
      label: `Danh sách sách môn học`,
    },
  ];

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      setUser(JSON.parse(user));
    }
    const token = Cookies.get('token');
    if (token) {
      try {
        fetchData('/subject/subjects', token).then((resp) => {
          if (resp) {
            setData(resp);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const handleOpenPop = (event) => {
    setOpenPop(event.currentTarget);
  };

  const handleClosePop = () => {
    setOpenPop(null);
  };


  const handleAddSubject = () => {
    setSubjectToEdit(null); // Clear any previous subject data (for editing)
    setIsSubjectModalOpen(true);
  };

  const handleEditSubject = (subjectData) => {
    console.log(subjectData);
    setSubjectToEdit(subjectData); // Set the subject data to edit
    setIsSubjectModalOpen(true);
  };

  const handleSubjectModalClose = () => {
    setIsSubjectModalOpen(false);
  };

  const saveOrUpdateSubject = async (subjectData) => {
    const token = Cookies.get('token');
    // console.log('Subject data to save or update:', subjectData);
    const body = {
      ...subjectData,
      createDate: new Date(),
      staffId: user?.id,
    };
    // If subjectData has an "id", it means you are updating an existing subject.
    if (subjectData.id) {
      // Implement your update logic here.
      console.log('Subject data to update:', subjectData);

      const body = {
        ...subjectData,
        createDate: new Date(),
        staffId: user?.id,
      };
      console.log('Subject data to update:', await body);
      await postData('/subject/save', body, token)
        .then((resp) => {
          if (resp) {
            Swal.fire({
              title: 'Tuyệt vời!',
              text: 'Bạn đã cập nhật thành công môn' + subjectData.name + ' !',
              icon: 'success',
            });
            window.location.reload();
          }
        })
        .catch((err) => {
          Swal.fire({
            title: 'Opss..',
            text: err,
            icon: 'warning',
          });
          console.log(err);
        });
    } else {
      // Implement your create logic here for new subject.
      console.log('Subject data to create:', subjectData);

      await postData('/subject/save', body, token)
        .then((resp) => {
          if (resp) {
            Swal.fire({
              title: 'Tạo môn học',
              text: 'Bạn đã tạo thành công môn' + subjectData.name + ' !',
              icon: 'success',
            });
            window.location.reload();
          }
        })
        .catch((err) => {
          Swal.fire({
            title: 'Opss..',
            text: "Vui lòng nhập đúng thông tin",
            icon: 'warning',
          });
          console.log(err);
        });
    }

    setIsSubjectModalOpen(false); // Close the SubjectModal
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filterData = data.filter((subject) => subject.name.toLowerCase().includes(searchValue.toLowerCase()));

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



  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    data && (
      <div className="p-5" style={{ overflow: 'auto' }}>
        <div className='row mb-3'>
          <div className='col-8' >
            <h4>Danh sách môn học</h4>
            <CustomBreadcrumbs items={breadcrumbItems} />
          </div>
          <div className='text-end col-4'>
            <Button variant="outlined" style={{ border: 0, backgroundColor: '#212b36', color: 'white', fontWeight: 700 }} onClick={handleAddSubject}>
              Tạo mới
            </Button>
          </div>
        </div>


        <Paper style={{
          padding: '20px',
          borderRadius: '20px',
          maxHeight: 'max-content',
          boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
        }}>
          <div className="d-flex" style={{ marginTop: '20px' }}>
            <div className='border rounded p-1'
              style={{ backgroundColor: "gray" }}
            >
              <InputBase
                placeholder="Tìm kiếm"
                style={{ marginInline: '10px' }}
                startAdornment={<Search />}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <Table style={{ marginTop: '20px' }}>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Giá thấp nhất</TableCell>
                <TableCell>Ngày tạo</TableCell>
                {/* <TableCell>Staff ID</TableCell> */}
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((s, index) => {
                return (
                  <TableRow hover={true} key={index}>
                    <TableCell>{index + (page * rowsPerPage, page * rowsPerPage) + 1}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell width="30%">{s.description}</TableCell>
                    <TableCell>{s.minPrice}</TableCell>
                    <TableCell>{moment(s.createDate).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{s.status ? 'Đang hoạt động' : 'Chưa kích hoạt'} </TableCell>
                    <TableCell width="15%">
                      {/* <Link className="btn btn-outline-secondary" to={`/subjects/courseBySubject`}> */}
                      <div className="d-flex justify-content-center">
                        <Link to={`/subject/${s.id}/course`} title="Xem" className="btn btn-secondary m-1">
                          <VisibilityIcon />
                        </Link>

                        <Button
                          variant="contained"
                          color="primary"
                          title="Chỉnh sửa"
                          onClick={() => handleEditSubject(s)}
                          className="m-1"
                        >
                          <EditIcon />
                        </Button>


                        <button className='rounded-circle btn' onClick={handleOpenPop}>
                          <MoreVertRoundedIcon />
                        </button>


                        <Popover
                          open={!!openPop}
                          anchorEl={openPop}
                          onClose={handleClosePop}
                          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                          PaperProps={{
                            sx: { width: 140 },
                          }}
                        >
                          <MenuItem onClick={handleClosePop}>
                            <VisibilityIcon />
                            View
                          </MenuItem>

                          <MenuItem onClick={handleClosePop} sx={{ color: 'error.main' }}>
                            <EditIcon />
                            Edit
                          </MenuItem>
                        </Popover>





                        {s.status ? (
                          <>
                            <button
                              type="submit"
                              title="Vô hiệu hóa"
                              className="btn btn-danger m-1"
                              onClick={() => {
                                const token = Cookies.get('token');
                                if (token) {
                                  fetchData('/course/bySubjectId?subject-id=' + s.id, token).then((resp) => {
                                    if (resp) {
                                      if (resp.length > 0) {
                                        Swal.fire(
                                          'Không đủ điều kiện vô hiệu hóa!',
                                          'Hiện tại đang có ' + resp.length + ' khóa học thuộc môn này đang hoạt động.',
                                          'warning',
                                        );
                                      } else {
                                        Swal.fire({
                                          title: 'Bạn chắc rằng muốn vô hiệu hóa môn học này?',
                                          text: 'Sau khi vô hiệu hóa, khóa học này sẽ không còn hoạt động nữa.',
                                          showDenyButton: true,
                                          showCancelButton: true,
                                          confirmButtonText: 'Xác nhận',
                                          denyButtonText: `Không xác nhận`,
                                          cancelButtonText: `Hủy`,
                                        }).then((result) => {
                                          if (result.isConfirmed) {
                                            if (token) {
                                              postData(
                                                '/subject/update-status',
                                                {
                                                  subjectId: s.id,
                                                  status: false,
                                                },
                                                token,
                                              )
                                                .then((resp) => {
                                                  if (resp) {
                                                    Swal.fire(
                                                      'Đã vô hiệu hóa thành công!',
                                                      'Khóa học ' + s.name + ' đã được vô hiệu hóa.',
                                                      'success',
                                                    );
                                                    window.location.reload();
                                                  }
                                                })
                                                .catch((err) => {
                                                  console.log(err);
                                                });
                                            }
                                          } else if (result.isDenied) {
                                            Swal.fire(
                                              'Không có gì thay đổi.',
                                              'Khóa học ' + s.name + ' không có gì thay đổi.',
                                              'info',
                                            );
                                          }
                                        });
                                      }
                                    }
                                  });
                                }
                              }}
                            >
                              <DoNotDisturbAltIcon />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="submit"
                              title="Kích hoạt"
                              className="btn btn-success m-1"
                              onClick={() => {
                                const token = Cookies.get('token');
                                Swal.fire({
                                  title: 'Bạn chắc rằng muốn kích hoạt môn học này?',
                                  text: 'Sau khi kích hoạt, khóa học này sẽ hoạt động ngay sau đó.',
                                  showDenyButton: true,
                                  showCancelButton: true,
                                  confirmButtonText: 'Xác nhận',
                                  denyButtonText: `Không xác nhận`,
                                  cancelButtonText: `Hủy`,
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    if (token) {
                                      postData(
                                        '/subject/update-status',
                                        {
                                          subjectId: s.id,
                                          status: true,
                                        },
                                        token,
                                      )
                                        .then((resp) => {
                                          if (resp) {
                                            Swal.fire(
                                              'Đã vô kích hoạt thành công!',
                                              'Khóa học ' + s.name + ' đã được kích hoạt.',
                                              'success',
                                            );
                                            window.location.reload();
                                          }
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });
                                    }
                                  } else if (result.isDenied) {
                                    Swal.fire(
                                      'Không có gì thay đổi.',
                                      'Khóa học ' + s.name + ' không có gì thay đổi.',
                                      'info',
                                    );
                                  }
                                });
                              }}
                            >
                              <CheckCircleOutlineIcon />
                            </button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
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
            count={filterData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Số hàng trên trang :"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <SubjectModal
          isOpen={isSubjectModalOpen}
          onSave={saveOrUpdateSubject}
          onUpdate={saveOrUpdateSubject}
          onClose={handleSubjectModalClose}
          subject={subjectToEdit !== null ? subjectToEdit : null}
        />
      </div>
    )
  );
}
