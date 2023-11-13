import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SubjectModal from './SubjectModal';
import SubjectCourseModal from '../CoursesBySubject/CoursesBySubject';
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
  TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { fetchData, postData } from '../../../services/AppService';
import moment from 'moment/moment';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ListSubject() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [subjectToEdit, setSubjectToEdit] = useState(null);


  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        fetchData('/subject/subjects', token).then(resp => {
          if (resp) {
            setData(resp);
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }, []);

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
    // Here you should implement logic to either save a new subject or update an existing one.
    // You may need to call an API or update your local data.
    // After saving or updating, you can close the SubjectModal.
    // For this example, we'll just log the subject data.
    const token = Cookies.get('token');
    console.log('Subject data to save or update:', subjectData);

    // If subjectData has an "id", it means you are updating an existing subject.
    if (subjectData.id) {
      // Implement your update logic here.
      console.log('Subject data to update:', subjectData);

      const body = {
        ...subjectData,
        dateTime: moment(new Date())
      };
      console.log('Subject data to update:', await body)
      await postData('/subject/save', body, token)
        .then(resp => {
          if (resp) {
            window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // Implement your create logic here for new subject.

      console.log('Subject data to create:', subjectData);
      const body = {
        ...subjectData,
        dateTime: moment(new Date())
      };
      console.log('Subject data to update:', await body)
      await postData('/subject/save', body, token)
        .then(resp => {
          if (resp) {
            window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    setIsSubjectModalOpen(false); // Close the SubjectModal
  };

  const handleSearchChange = (event) => {
    const searchInput = event.target.value;
    setSearchValue(searchInput);
    // Refilter the data when search input changes
    filterData(searchInput);
  };

  const filterData = (searchInput) => {
    // Filter data based on both status and search input
    const filteredData = data.filter((item) => {
      const searchMatch = searchInput === '' || item.name.toLowerCase().includes(searchInput.toLowerCase());
      return searchMatch;
    });

    setData(filteredData);
  };

  return (
    data && (
      <div className="m-5">
        <div style={{ margin: '20px' }}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="body1">Trang chủ {'>'} Quản lý môn học</Typography>

            <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
              <Typography variant="subtitle1">Danh sách môn học</Typography>

              <InputBase
                placeholder="Search name"
                style={{ marginLeft: '20px' }}
                startAdornment={<Search />}
                onChange={handleSearchChange}
              />
              <div className="text-end col-8">
                <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={handleAddSubject}>
                  Tạo mới
                </Button>
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
                {data.map((s, index) => {
                  return (
                    <TableRow hover={true} key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.description}</TableCell>
                      <TableCell>{s.minPrice}</TableCell>
                      <TableCell>{moment(s.createDate).format("DD/MM/YYYY")}</TableCell>
                      {/* <TableCell>{s.staff_id}</TableCell> */}
                      <TableCell>{s.status ? "Đang hoạt động" : "Chưa kích hoạt"} </TableCell>
                      <TableCell>
                        {/* <Link className="btn btn-outline-secondary" to={`/subjects/courseBySubject`}> */}
                        <Link to={`/course/subject/${s.id}`} className='btn btn-outline-primary'>
                          Chi tiết <VisibilityIcon />
                        </Link>
                        {/* <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={() => handleViewDetail(s)}>
                          Chi tiết
                        </Button> */}
                        <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={() => handleEditSubject(s)}>
                          Chỉnh sửa
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>

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
