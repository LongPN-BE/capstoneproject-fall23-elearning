import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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
// import ViewSyllabus from './ViewSyllabus';

export default function SyllabusByCourse() {
  const { courseId } = useParams();
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
  const [isViewSyllabusModalOpen, setIsViewSyllabusModalOpen] = useState(false);
  const [syllabusToView, setSyllabusToView] = useState(null);
  const [syllabusData, setSyllabusData] = useState(null);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchData('/course/byId?id=' + courseId, token).then((resp) => {
        if (resp) {
          setCourseData(resp);
          fetchData('/syllabus/byCourseId?course_id=' + resp.id, token).then((resp1) => {
            if (resp1) {
              setData(resp1);
            }
          });
        }
      });
    }
  }, []);

  const handleAddSyllabus = () => {
    setSyllabusToView(null); // Clear any previous syllabus data (for editing)
    setIsSyllabusModalOpen(true);
  };

  const handleViewSyllabus = (syllabusData) => {
    console.log(syllabusData);
    setSyllabusToView(syllabusData); // Set the syllabus data to edit
    setIsViewSyllabusModalOpen(true);
  };

  const handleSyllabusModalClose = () => {
    setIsSyllabusModalOpen(false);
  };

  const handleViewSyllabusModalClose = () => {
    setIsViewSyllabusModalOpen(false);
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
            <Typography variant="body1">
              Trang chủ {'>'} Quản lý môn học {'>'} Môn học{'>'} Khoá học {courseId} {'>'} Khung chương trình
              {'>'}
            </Typography>

            <div className="d-flex justify-content-center mt-1">
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                Danh sách khung chương trình
              </Typography>
            </div>

            <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
              <InputBase
                placeholder="Tìm kiếm"
                style={{ marginLeft: '20px' }}
                startAdornment={<Search />}
                onChange={handleSearchChange}
              />
            </div>

            <Table style={{ marginTop: '20px' }}>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Preview</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((s, index) => {
                  return (
                    <TableRow hover={true} key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.status}</TableCell>
                      <TableCell>{s.dateCreate}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleViewSyllabus(s.id)}
                          className="btn btn-secondary m-1"
                        >
                          <VisibilityIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
        {/* <ViewSyllabus
          isOpen={isViewSyllabusModalOpen}
          onClose={handleViewSyllabusModalClose}
          syllabus={syllabusToView}
        /> */}
      </div>
    )
  );
}
