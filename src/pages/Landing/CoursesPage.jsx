/* eslint-disable default-case */
import React, { Fragment, createContext, useEffect, useState } from 'react';
import Header from '../../components/Landing/Header/Header';
import ContactUs from '../../components/Landing/ContactUs/ContactUs';
import Footer from '../../components/Landing/Footer/Footer';
import { Typography, Paper, InputBase, Select } from '@material-ui/core';
import { CourseControllerApi } from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';
import Cookies from 'js-cookie';
import SearchIcon from '@mui/icons-material/Search';
import CoursesPaginate from './CoursesPaginate';
import { Container, Row, Col } from 'reactstrap';
import { Button } from '@mui/material';
import { fetchData } from '../../services/AppService';

const FilterCourseContext = createContext();

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const CoursesPage = () => {
  const userStr = Cookies.get('user');
  const [courses, setCourses] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [coursesSearch, setCoursesSearch] = useState([]);
  const [subject, setSubject] = useState('');
  const [money, setMoney] = useState('');
  const [subjectData, setSubjectData] = useState([]);

  useEffect(() => {
    if (userStr) {
      const user = JSON.parse(userStr);
      courseApi.findAllCourseUnEnrolledByStudent(user?.studentId, 'ACTIVE', { value: searchValue }, (err, res) => {
        if (res) {
          if (!searchValue && !searchValue.trim()) {
            setCourses(res);
          }
          setCoursesSearch(res);
        }
      });
    } else {
      courseApi.getAllByStatus((err, res) => {
        if (res) {
          if (!searchValue && !searchValue.trim()) {
            setCourses(res);
          }
          setCoursesSearch(res);
        }
      });
    }
    fetchData('/subject/subjects').then((resp) => {
      setSubjectData(resp);
    });
    setSubject('None')
    setMoney('0')
  }, [searchValue]);

  const handleSearch = () => {
    if (money !== '0' && money !== '' && subject !== 'None' && subject !== '') {
      //chọn đủ các field
      switch (money) {
        case '0':
          setCoursesSearch(courses);
          break;
        case '1':
          setCoursesSearch(courses.filter((course) => course.price <= 1500000 && course.subject.name === subject));
          break;
        case '2':
          setCoursesSearch(
            courses?.filter(
              (course) => course.price >= 1500000 && course.price <= 5000000 && course.subject.name === subject,
            ),
          );
          break;
        case '3':
          setCoursesSearch(
            courses?.filter(
              (course) => course.price >= 5000000 && course.price <= 1000000 && course.subject.name === subject,
            ),
          );
          break;
        case '4':
          setCoursesSearch(courses?.filter((course) => course.price >= 1000000 && course.subject.name === subject));
          break;
      }
    } else {
      if (money !== '0' && money !== '') {
        //chỉ chọn tiền
        switch (money) {
          case '0':
            setCoursesSearch(courses);
            break;
          case '1':
            setCoursesSearch(courses?.filter((course) => course.price <= 1500000));
            break;
          case '2':
            setCoursesSearch(courses?.filter((course) => course.price >= 1500000 && course.price <= 5000000));
            break;
          case '3':
            setCoursesSearch(courses?.filter((course) => course.price >= 5000000 && course.price <= 10000000));
            break;
          case '4':
            setCoursesSearch(courses?.filter((course) => course.price >= 10000000));
            break;
        }
      } else {
        if (subject !== 'None' && subject !== '') {
          //chỉ chọn môn học
          setCoursesSearch(courses?.filter((course) => course.subject.name === subject));
        } else {
          //không chọn gì
          setCoursesSearch(courses);
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  return (
    <Fragment>
      <Header />
      <div
        className="mt-2 p-5 d-flex justify-content-between align-items-center "
        style={{ backgroundColor: '#535CE8', height: 200 }}
      >
        <div className="w-100">
          <Typography className="text-center" style={{ color: 'white' }} variant="h4">
            <strong>DANH SÁCH KHÓA HỌC</strong>
          </Typography>
        </div>
      </div>
      {/* <AllCourses /> */}
      <Container className="mt-5">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ width: '100%', padding: '0 12px' }}>
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
                style={{ minHeight: '48px', minWidth: '100%' }}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Bạn muốn tìm hiểu về nội dung gì?"
                inputProps={{ 'aria-label': 'Bạn muốn tìm hiểu về nội dung gì?' }}
                onChange={(e) => setSearchValue(e.target.value)}
                startAdornment={<SearchIcon />}
                onKeyDown={handleKeyDown}
              />
            </Paper>
          </div>
          <div style={{ display: 'flex' }}>
            <div class="container">
              <div
                class="form-group"
                style={{
                  border: '1px solid #ced4da',
                  borderRadius: '8px',
                  padding: '0.375rem 0.75rem',
                }}
              >
                <label for="exampleSelectOutlined">Môn học</label>
                <select
                  value={subject}
                  class="form-control"
                  id="exampleSelectOutlined"
                  onChange={(e, value) => {
                    setSubject(e.target.value);
                  }}
                >
                  <option value="None">--</option>
                  {subjectData?.map((subject) => (
                    <option value={subject.name}>{subject.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div class="container">
              <div
                class="form-group"
                style={{
                  border: '1px solid #ced4da',
                  borderRadius: '8px',
                  padding: '0.375rem 0.75rem',
                }}
              >
                <label for="exampleSelectOutlined">Giá tiền</label>
                <select
                  class="form-control"
                  id="exampleSelectOutlined"
                  onChange={(e, value) => {
                    setMoney(e.target.value);
                  }}
                  value={money}
                >
                  <option value="0">--</option>
                  <option value="1">0 - 1,500,000 VNĐ</option>
                  <option value="2">1,500,000 VNĐ - 5,000,000 VNĐ</option>
                  <option value="3">5,000,000 VNĐ - 10,000,000 VNĐ</option>
                  <option value="4">10,000,000 VNĐ - Không giới hạn</option>
                </select>
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: 'rgb(25, 118, 210)', width: '100px' }}
              onClick={() => handleSearch()}
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
      </Container>
      <CoursesPaginate items={coursesSearch} itemsPerPage={6} />
      <ContactUs />
      <Footer />
    </Fragment>
  );
};

export default CoursesPage;
