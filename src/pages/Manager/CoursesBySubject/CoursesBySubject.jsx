import React from 'react';
import CourseTabComponent from './CourseTabComponent/CourseTabComponent';
import { Container } from 'reactstrap';
import { Box } from '@mui/system';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import moment from 'moment';
import { fetchData, postData } from '../../../services/AppService';
import { useParams } from 'react-router-dom';



const CourseBySubject = () => {
  const { subjectId } = useParams();
  const [courseData, setcourseData] = useState([]);
  const [subjectData, setsubjectData] = useState([]);
  const [activeCourses, setActiveCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchData('/subject/byId?subject-id=' + subjectId, token).then(resp => {
        if (resp) {
          setsubjectData(resp);
          fetchData('/course/bySubjectId?subject-id=' + resp.id, token).then(resp1 => {
            if (resp1) {
              setcourseData(resp1);
              // Filter courses based on their status
              const active = resp1.filter((course) => course.status === 'ACTIVE');
              const pending = resp1.filter((course) => course.status === 'PENDING');

              setActiveCourses(active);
              setPendingCourses(pending);
            }
          })
        }
      })
    }
  }, []);

  return (
    <Container>
      <Box textAlign="center" mt={2}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="textSecondary" gutterBottom>
              Chi tiết môn {subjectId} - {subjectData.name}.
            </Typography>
            <Typography variant="h5" component="div">
              {subjectData.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="textPrimary">
              {subjectData.description}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="textPrimary">
              Giá thấp nhất : {subjectData.minPrice} <br />Tạo ngày: {moment(subjectData.createDate).format("DD/MM/YYYY")}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box textAlign="center" mt={2}>
        <CourseTabComponent activeCourses={activeCourses} pendingCourses={pendingCourses} />
      </Box>
    </Container>
  );
}

export default CourseBySubject;
