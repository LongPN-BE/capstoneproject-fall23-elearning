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
              <CardContent className="text-center">
                <Typography variant="h4" component="div" style={{ fontWeight: 'bold' }}>
                  {subjectData.name}
                </Typography>
                <div className="d-flex justify-content-center">
                  <div className="w-50">
                    <Typography className="text-center" style={{ marginTop: 5, marginBottom: 10 }} color="textPrimary">
                      {subjectData.description}
                    </Typography>
                  </div>
                </div>

                <Divider style={{ color: 'black', height: 2 }} />
                <div className="d-flex align-items-center">
                  <div className="w-100">
                    <div className="d-inline-flex py-3 text-center">
                      <div className="px-5 text-center">
                        <Typography variant="caption">
                          <strong>GIÁ THẤP NHẤT</strong>
                        </Typography>
                        <br />
                        <Typography> {subjectData.minPrice?.toLocaleString()} VND</Typography>
                      </div>
                      <div className="px-5 text-center">
                        <Typography variant="caption">
                          <strong>NGÀY TẠO</strong>
                        </Typography>
                        <br />
                        <Typography>{moment(subjectData.createDate).format('DD/MM/YYYY')}</Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Box>
          <Box textAlign="center" mt={2}>
            <CourseTabComponent
              activeCourses={activeCourses}
              pendingCourses={pendingCourses}
              deActiveCourses={deActiveCourses}
            />
          </Box>
        </Container>
      </div>
    )
  );
};

export default CourseBySubject;
