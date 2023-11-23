import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import courseImg1 from '../../../assets/images/web-design.png';
import courseImg2 from '../../../assets/images/graphics-design.png';
import courseImg3 from '../../../assets/images/ui-ux.png';
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

const AllCourses = () => {
  const [dataCourse, setDataCourse] = useState([]);

  useEffect(() => {
    fetchData('/course/by-status-active').then((resp) => {
      setDataCourse(resp);
    });
  }, []);

  return (
    <section className="mt-5 mb-5 d-flex justify-content-between align-items-center">
      <Container className="pt-5 pb-5">
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
                        <Select labelId="subject-select-label" label="Môn học">
                          <MenuItem value="Java">1,000,000 VNĐ - 1,500,000 VNĐ</MenuItem>
                          <MenuItem value="C#">1,500,000 VNĐ - 2,000,000 VNĐ</MenuItem>
                          <MenuItem value="Javascript">2,000,000 VNĐ - 2,500,000 VNĐ</MenuItem>
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
          {dataCourse?.map((item, index) => (
            <>
              {index + 1 < 7 ? (
                <Col key={item.id} lg="4" md="6" sm="6">
                  <CourseCard item={item} />
                </Col>
              ) : (
                <></>
              )}
            </>
          ))}
        </Row>

        <div className="mt-5 p-2">
          <div className="w-100 d-flex justify-content-center">
            <Stack spacing={2}>
              <Pagination count={5} size="large" />
            </Stack>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AllCourses;
