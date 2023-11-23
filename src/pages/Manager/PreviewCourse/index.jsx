import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Divider } from '@mui/material';
import NavBarLesson from './components/NavBarLesson';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';
import { CourseControllerApi, SubjectControllerApi } from '../../../api/generated/generate-api';
import ApiClientSingleton from '../../../api/apiClientImpl';
import { Paper, Typography } from '@material-ui/core';

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const subjectApi = new SubjectControllerApi(ApiClientSingleton.getInstance());
function PreviewCourse() {
  const [course, setCourse] = useState();
  const { courseId, subjectId } = useParams();
  const [subjectData, setSubject] = useState();
  const breadcrumbItems = [
    {
      url: '/dashboard',
      label: 'Trang chủ',
    },
    {
      url: '/subjects',
      label: 'Danh sách môn học',
    },
    {
      url: `/subject/${subjectId}/course/`,
      label: `Môn ${subjectData?.name}`,
    },
    {
      url: `/subject/${subjectId}/course/${courseId}/syllabus/`,
      label: `Khoá học ${course?.name}`,
    },
    {
      url: `/subject/course/${courseId}/syllabus/`,
      label: `Xem tổng quan`,
    },
  ];

  const getCourseById = () => {
    courseApi.getCourseById(courseId, (err, res) => {
      if (res) {
        setCourse(res);
      }
    });
  };
  const getSubjectById = () => {
    subjectApi.findSubjectById(subjectId, (err, res) => {
      if (res) {
        setSubject(res);
        console.log(res);
      }
    });
  };
  useEffect(() => {
    getCourseById();
    getSubjectById();
  }, [courseId]);

  return (
    <>
      <CustomBreadcrumbs items={breadcrumbItems} />
      <Container className="mt-4 vh-100" style={{ maxHeight: 800 }}>
        <div className="mt-4 d-flex justify-content-center">
          <Typography variant="h4" style={{ color: '#616161' }}>
            <strong>TỔNG QUAN KHOÁ HỌC</strong>
          </Typography>
        </div>
        <Divider className="my-4" />
        <div className="row" style={{ height: 700, overflow: 'auto' }}>
          <div className="col-3 p-1 " style={{ backgroundColor: '#b9b9b9' }}>
            <div className="d-flex flex-column gap-3">
              <div>
                <NavBarLesson courseId={courseId} />
              </div>
            </div>
          </div>
          <div className="col-9 p-2" style={{ backgroundColor: '#f0f0f078' }}>
            <Outlet />
          </div>
        </div>
      </Container>
    </>
  );
}

export default PreviewCourse;
