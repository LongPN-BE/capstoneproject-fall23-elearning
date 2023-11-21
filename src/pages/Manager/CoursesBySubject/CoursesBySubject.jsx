import React from 'react';
import CourseTabComponent from './CourseTabComponent/CourseTabComponent';
import { Container } from 'reactstrap';
import { Box } from '@mui/system';
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import moment from 'moment';
import { fetchData } from '../../../services/AppService';
import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';

const CourseBySubject = () => {
  const { subjectId } = useParams();
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
      url: `/subjects`,
      label: `Danh sách sách môn học`,
    },
    {
      url: `/course/subject/` + subjectId,
      label: `Chi tiết môn ` + subjectData.name,
    },
  ];


  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchData('/subject/byId?subject-id=' + subjectId, token).then((resp) => {
        if (resp) {
          setSubjectData(resp);
          fetchData('/course/bySubjectId?subject-id=' + resp.id, token).then((resp1) => {
            if (resp1) {
              // Filter courses based on their status
              const active = resp1.filter((course) => course.status === 'ACTIVE');
              const deactive = resp1.filter((course) => course.status === 'DEACTIVE');
              const pending = resp1.filter((course) => course.status === 'PENDING');

              setActiveCourses(active);
              setDeActiveCourses(deactive);
              setPendingCourses(pending);
            }
          });
        }
      });
    }
  }, [subjectId]);


  return (
    subjectData && (
      <div className="m-5">
        <Container>
          <Box>
            <CustomBreadcrumbs items={breadcrumbItems} />
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h3" component="div" style={{ fontWeight: 'bold' }}>
                  {subjectData.name}
                </Typography>
                <Typography style={{ marginTop: 5, marginBottom: 10 }} color="textPrimary">
                  {subjectData.description}
                </Typography>
                <Divider style={{ color: 'black', height: 2 }} />
                <div className='d-flex'>
                  <Typography sx={{ mb: 1.5 }} color="textPrimary" variant='caption'>
                    Giá thấp nhất : {subjectData.minPrice}<br />
                    Tạo ngày: {moment(subjectData.createDate).format('DD/MM/YYYY')}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Box>
          <Box textAlign="center" mt={2}>
            <CourseTabComponent activeCourses={activeCourses} pendingCourses={pendingCourses} deActiveCourses={deActiveCourses} />
          </Box>
        </Container>
      </div >
    )
  );
};

export default CourseBySubject;
