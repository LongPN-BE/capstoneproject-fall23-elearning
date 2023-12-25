import React from 'react';
import CourseTabComponent from './CourseTabComponent/CourseTabComponent';
import { Container } from 'reactstrap';
import { Paper, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import moment from 'moment';
import { fetchData } from '../../../services/AppService';
import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';

const ManageAllCourse = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [activeCourses, setActiveCourses] = useState([]);
  const [deActiveCourses, setDeActiveCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const breadcrumbItems = [
    {
      url: '/',
      label: 'Trang chủ',
    },
    {
      url: `/courses`,
      label: `Danh sách khoá học`,
    },
    // {
    //   url: `/course/subject/` + subjectId,
    //   label: `Chủ đề: ${subjectData.name}`,
    // },
  ];

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchData('/course/courses', token).then((resp) => {
        if (resp) {
          // Filter courses based on their status
          const active = resp.filter((course) => course.status === 'ACTIVE');
          const deactive = resp.filter((course) => course.status === 'DEACTIVE');
          const pending = resp.filter((course) => course.status === 'PENDING');

          setActiveCourses(active);
          setDeActiveCourses(deactive);
          setPendingCourses(pending);
        }
      });
    }
  }, []);

  return (
    subjectData && (
      <div className="px-5 py-3" style={{ overflow: 'auto', height: 850 }}>
        <div className="row">
          <h4 style={{ fontWeight: 'bold' }}>Danh sách khoá học</h4>
          <CustomBreadcrumbs items={breadcrumbItems} />

          <div className=" mt-3">
            <CourseTabComponent
              activeCourses={activeCourses}
              pendingCourses={pendingCourses}
              deActiveCourses={deActiveCourses}
            />
          </div>
          {/* <Box
            sx={{
              padding: '20px',
              borderRadius: '20px',
              maxHeight: 'max-content',
              boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
              backgroundColor: '#f4f6f8',
            }}
            className="col-3 mt-3"
          >
            <h5 sx={{ fontWeight: 700 }}>Chủ đề: {subjectData.name}</h5>
            <Typography variant="title" sx={{ fontWeight: 'bold', fontSize: 13, color: '#75797d' }}>
              Ngày tạo: {moment(subjectData.createDate).format('DD-MM-YYYY')}
            </Typography>

            <Paper
              style={{
                padding: '20px',
                borderRadius: '20px',
                maxHeight: 'max-content',
                minHeight: 200,
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
                margin: ' 20px 0 ',
              }}
            >
              <Typography variant="title" sx={{ fontWeight: 'bold', fontSize: 15, color: '#515961' }}>
                Mô tả
              </Typography>
              <br />
              <Typography variant="caption" sx={{ fontSize: 15, color: '#515961' }}>
                {subjectData.description}
              </Typography>
            </Paper>
            <Paper
              style={{
                padding: '20px',
                borderRadius: '20px',
                maxHeight: 'max-content',
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;',
                margin: ' 20px 0 ',
              }}
            >
              <Typography variant="title" sx={{ fontWeight: 'bold', fontSize: 15, color: '#515961' }}>
                Giá thấp nhất
              </Typography>
              <br />
              <Typography variant="caption" sx={{ fontSize: 15, color: '#515961' }}>
                {subjectData.minPrice?.toLocaleString()} VNĐ
              </Typography>
            </Paper>
          </Box> */}
        </div>
      </div>
    )
  );
};

export default ManageAllCourse;
