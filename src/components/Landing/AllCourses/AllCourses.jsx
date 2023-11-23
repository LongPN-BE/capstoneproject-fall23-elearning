import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CourseCard from './CourseCard';
import Styles from './Courses.module.scss';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';
import { fetchData } from '../../../services/AppService';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const AllCourses = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchData('/course/by-status-active').then((resp) => {
      setData(resp);
    });
  }, []);

  useEffect(() => {
    fetchData('/course/by-status-active').then((resp) => {
      setData(resp);
    });
  }, []);

  // Search
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  const filterData = data.filter((course) =>
    course.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  // State to keep track of the current page and the number of rows per page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);



  return (
    <section className="mt-5 d-flex justify-content-between align-items-center">
      <Container className="pt-5 pb-5">
        <Row>
          <div className="d-flex justify-content-between align-items-center" style={{ backgroundColor: 'white' }}>
            <div className={classNames(Styles.course__top)}>
              <div className="d-flex justify-content-center">
                <Paper
                  component="form"
                  sx={{
                    p: '2px 4px',
                    ml: 7,
                    display: 'flex',
                    alignItems: 'center',
                    width: '51rem',
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Bạn muốn tìm hiểu về nội dung gì?"
                    inputProps={{ 'aria-label': 'Bạn muốn tìm hiểu về nội dung gì?' }}
                    onChange={handleSearchChange}
                    startAdornment={<SearchIcon />}
                  />
                </Paper>
              </div>
            </div>
          </div>
        </Row>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="d-flex justify-content-between align-items-center p-5" style={{ backgroundColor: 'white' }}>
              <div className={classNames(Styles.course__top)}>
                <div className={classNames(Styles.course__top__left, 'w-70')}>
                  <div className="d-flex justify-content-center">
                    <Box className="border rounded mx-2" style={{ width: 400 }}>
                      <FormControl fullWidth>
                        <InputLabel id="subject-select-label">Môn học</InputLabel>
                        <Select labelId="subject-select-label" label="Môn học">
                          <MenuItem value="Java">Java</MenuItem>
                          <MenuItem value="C#">C#</MenuItem>
                          <MenuItem value="Javascript">Javascript</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box className="border rounded mx-2" style={{ width: 400 }}>
                      <FormControl fullWidth>
                        <InputLabel id="subject-select-label">Giá tiền</InputLabel>
                        <Select labelId="subject-select-label" label="Giá tiền">
                          <MenuItem value="Java">0 - 1,500,000 VNĐ</MenuItem>
                          <MenuItem value="C#">1,500,000 VNĐ - 5,000,000 VNĐ</MenuItem>
                          <MenuItem value="Javascript">5,000,000 VNĐ - Không giới hạn</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </div>
              </div>

              <div className={classNames('w-50 text-end')}>
                <button className={classNames('btn', Styles.course__btn)}>Tìm kiếm</button>
              </div>
            </div>
          </Col>
          <Divider style={{ color: 'black', height: 2 }} />
          {filterData?.slice(page * rowsPerPage, ((page * rowsPerPage) + rowsPerPage)).map((item, index) => (
            <>
              <Col key={item.id} lg="4" md="6" sm="6">
                <CourseCard item={item} />
              </Col>
            </>
          ))}
        </Row>

        <div className="mt-5 p-2">
          <div className="w-100 d-flex justify-content-center">
            <Stack spacing={2}>
              <Pagination
                onChange={(e, value) => setPage(value - 1)}
                count={Math.ceil(filterData.length / rowsPerPage)}
                page={page}
                size="large" />
            </Stack>
            <Box className="border rounded mx-2" style={{ width: 60 }}>
              <FormControl fullWidth>
                <Select
                  labelId="rows-per-page"
                  value={rowsPerPage}
                  label="RowsPerPage"
                  onChange={(e, value) => setRowsPerPage(value.props.value)}
                >

                  <MenuItem value={2}>2</MenuItem>

                  <MenuItem value={3}>3</MenuItem>

                  <MenuItem value={6}>6</MenuItem>

                  <MenuItem value={9}>9</MenuItem>

                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
      </Container>
    </section >
  );
};

export default AllCourses;